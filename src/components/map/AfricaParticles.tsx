"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { africaPoint, countryPoints } from "./africa-map";

/**
 * Carte de l'Afrique en particules (même animation que Keur Cook), aux couleurs du design « Nuit » :
 * particules ivoire, quelques éclats ocre. Les particules s'écartent sous la souris ou le doigt.
 * Avec `country` (code ISO, ex. « SN »), le nuage se transforme en la forme de ce pays.
 * Le canevas remplit son parent (carré) : la carte mesure 3,7 unités = 100 % de sa hauteur.
 */

const VERT = /* glsl */ `
attribute vec3 tA; attribute vec3 tB; attribute float aRand;
uniform float uTime, uExplode, uPR, uForce, uMorph, uSize; uniform vec3 uMouse; varying vec3 vCol; varying float vA;
void main(){
  float d = aRand * .35;
  vec3 p = mix(tA, tB, smoothstep(d * .8, .72 + d * .8, uMorph));
  p += .03 * sin(uTime * 1.3 + aRand * 6.283 + p.yzx * 3.);
  p += normalize(p + vec3(.001)) * uExplode * (0.6 + aRand * 3.5);
  vec3 dm = p - uMouse; float f = smoothstep(.9, 0., length(dm.xy)); p += normalize(dm + vec3(.001)) * f * .4 * uForce;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.6 + aRand * 2.4) * uPR * uSize * (9. / -mv.z);
  // Ivoire (texte du site) vers un sable plus doux en bas ; 6 % d'éclats ocre (couleur d'accent).
  vec3 ivory = vec3(.94, .91, .87), sand = vec3(.78, .72, .63), ocre = vec3(.84, .64, .29);
  vCol = mix(sand, ivory, smoothstep(-1.6, 1.6, p.y + sin(p.x * 1.5) * .3));
  vCol = mix(vCol, ocre, step(.94, aRand));
  vA = .45 + .55 * aRand;
}`;

const FRAG = /* glsl */ `
uniform float uAlpha; varying vec3 vCol; varying float vA;
void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d); gl_FragColor = vec4(vCol, a * vA * uAlpha * .95); }`;

function africaTargets(N: number) {
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const [x, y] = africaPoint();
    out.set([x, y, (Math.random() - 0.5) * 0.12], i * 3);
  }
  return out;
}

export function AfricaParticles({ country }: { country?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<{ setCountry: (code?: string) => void } | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // Sans WebGL : la carte reste avec ses seuls points de pays.
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PR = Math.min(2, window.devicePixelRatio);
    renderer.setPixelRatio(PR);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 9;
    // Demi-hauteur visible à la distance de la carte : la carte (3,7 unités) remplit la hauteur du canevas.
    const halfH = Math.tan((35 * Math.PI) / 360) * 9;

    const N = el.clientWidth < 500 ? 6000 : 11000;
    const africa = africaTargets(N);
    const rand = new Float32Array(N).map(() => Math.random());
    const geo = new THREE.BufferGeometry();
    const shapeA = new THREE.BufferAttribute(africa.slice(), 3);
    const shapeB = new THREE.BufferAttribute(africa.slice(), 3);
    geo.setAttribute("position", new THREE.BufferAttribute(africa.slice(), 3));
    geo.setAttribute("tA", shapeA);
    geo.setAttribute("tB", shapeB);
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const uni = {
      uTime: { value: 0 }, uExplode: { value: reduced ? 0 : 1 }, uPR: { value: PR }, uForce: { value: 0 }, uMorph: { value: 1 },
      uSize: { value: 1 }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uAlpha: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const cloud = new THREE.Points(geo, mat);
    cloud.scale.setScalar(halfH / 1.85);
    scene.add(cloud);

    // Forme affichée : l'Afrique, ou un pays (transformation animée de l'une à l'autre).
    const shapes = new Map<string, Float32Array>();
    let shown: string | undefined;
    const setCountry = (code?: string) => {
      if (code === shown) return;
      let target: Float32Array = africa;
      if (code) {
        let pts = shapes.get(code);
        if (!pts) {
          pts = countryPoints(code, N) ?? undefined;
          if (pts) shapes.set(code, pts);
        }
        if (!pts) return;
        target = pts;
      }
      (shapeA.array as Float32Array).set(shapeB.array as Float32Array);
      (shapeB.array as Float32Array).set(target);
      shapeA.needsUpdate = shapeB.needsUpdate = true;
      uni.uMorph.value = 0;
      shown = code;
    };
    api.current = { setCountry };

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uni.uSize.value = Math.max(0.6, Math.min(1.2, h / 640));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Souris ou doigt : les particules fuient le point de contact, puis reviennent en douceur.
    let px = 99, py = 99, active = false, force = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2 * halfH * camera.aspect;
      py = -((e.clientY - r.top) / r.height - 0.5) * 2 * halfH;
      active = e.type !== "pointerleave" && e.type !== "pointerup" && e.type !== "pointercancel";
    };
    const events = ["pointermove", "pointerdown", "pointerleave", "pointerup", "pointercancel"] as const;
    for (const t of events) el.addEventListener(t, onMove, { passive: true });

    // On ne dessine que lorsque la carte est visible à l'écran.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = reduced ? 0 : clock.getElapsedTime();
      uni.uTime.value = t;
      uni.uExplode.value += (0 - uni.uExplode.value) * 0.05;
      uni.uMorph.value += (1 - uni.uMorph.value) * 0.04;
      force += ((active ? 1 : 0) - force) * (active ? 0.2 : 0.06);
      uni.uForce.value = force;
      const s = cloud.scale.x;
      if (active && !reduced) uni.uMouse.value.set(px / s, py / s, 0);
      // Léger balancement, la carte reste de face.
      cloud.rotation.set(Math.sin(t * 0.3) * 0.06, Math.sin(t * 0.25) * 0.12, 0);
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      for (const t of events) el.removeEventListener(t, onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    api.current?.setCountry(country);
  }, [country]);

  return <div ref={host} aria-hidden className="absolute inset-0 touch-pan-y" />;
}

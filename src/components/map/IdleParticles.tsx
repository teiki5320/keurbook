"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js (~600 Ko) n'est téléchargé que sur les pages qui affichent la carte.
const AfricaParticles = dynamic(() => import("./AfricaParticles").then((m) => m.AfricaParticles), { ssr: false });

/**
 * Carte en particules, lancée seulement une fois la page chargée et le navigateur au repos :
 * le texte et les images s'affichent d'abord (téléphone), l'animation arrive juste après.
 */
export function IdleParticles(props: { country?: string; colorful?: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      else timer = setTimeout(() => setReady(true), 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);
  return ready ? <AfricaParticles {...props} /> : null;
}

"use client";

import { useRef } from "react";


/**
 * Glissement horizontal (doigt ou souris) pour les carrousels.
 * `touch-action: pan-y` laisse le défilement vertical de la page au navigateur.
 * Un clic qui suit un glissement est ignoré (pas d'ouverture de carte par erreur).
 */
export function useSwipe(onNext: () => void, onPrev: () => void, threshold = 40) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    style: { touchAction: "pan-y" } as React.CSSProperties,
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
      swiped.current = false;
    },
    onPointerUp: (e: React.PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
      swiped.current = true;
      if (dx < 0) onNext();
      else onPrev();
    },
    onPointerCancel: () => {
      start.current = null;
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (swiped.current) {
        e.preventDefault();
        e.stopPropagation();
        swiped.current = false;
      }
    },
  };
}

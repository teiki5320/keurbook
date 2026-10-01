"use client";

/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { initials } from "@/lib/book-utils";
import { withBase } from "@/lib/config";
import { useSwipe } from "./useSwipe";

export interface CoverflowItem {
  key: string;
  title: string;
  /** Petite ligne au-dessus du titre (années, nombre de titres…). */
  eyebrow?: string;
  image: string | null;
  href: string;
}

/**
 * Carrousel de cartes (repris de Keur Cook) : carte centrale en avant, voisines sur les côtés.
 * Glisser, flèches du clavier ou toucher une voisine pour changer ; toucher la carte centrale l'ouvre.
 */
export function Coverflow({ items, hint = "Glissez pour parcourir · touchez le portrait pour ouvrir la fiche" }: { items: CoverflowItem[]; hint?: string }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const loop = n >= 3;
  const go = (d: number) => setActive((a) => (loop ? (((a + d) % n) + n) % n : Math.min(n - 1, Math.max(0, a + d))));
  const swipe = useSwipe(() => go(1), () => go(-1));
  const router = useRouter();
  const onArrows = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };
  if (n === 0) return null;

  return (
    <div onKeyDown={onArrows}>
      <div
        {...swipe}
        onDragStart={(e) => e.preventDefault()}
        className="relative cursor-grab overflow-hidden select-none [perspective:1600px] active:cursor-grabbing"
        style={{ ...swipe.style, height: "clamp(380px,58vh,520px)" }}
      >
        {items.map((it, i) => {
          let o = i - active;
          if (loop) {
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
          }
          const ao = Math.abs(o);
          const isActive = o === 0;
          return (
            // Vrai lien <a href> : les moteurs de recherche suivent toutes les cartes.
            <a
              key={it.key}
              href={withBase(it.href)}
              draggable={false}
              onClick={(e) => {
                // Ctrl/Cmd/Maj-clic : ouverture dans un nouvel onglet, comme un lien normal.
                if (isActive && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) return;
                e.preventDefault();
                if (isActive) router.push(it.href);
                else setActive(i);
              }}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={ao > 1}
              aria-label={isActive ? `Ouvrir la fiche de ${it.title}` : `Afficher ${it.title}`}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                width: "min(280px,66vw)",
                aspectRatio: "3 / 4.2",
                transform: `translate(-50%,-50%) translateX(${o * 64}%) translateZ(${-ao * 240}px) rotateY(${-o * 26}deg)`,
                opacity: ao > 2 ? 0 : ao === 0 ? 1 : ao === 1 ? 0.55 : 0.2,
                zIndex: 10 - ao,
                pointerEvents: ao > 1 ? "none" : "auto",
                transition: "transform .8s cubic-bezier(.16,1,.3,1), opacity .5s",
              }}
            >
              <div className={`relative size-full overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] ring-1 ${isActive ? "ring-accent" : "ring-line-strong"}`}>
                {it.image ? (
                  <img
                    src={withBase(it.image)}
                    alt=""
                    draggable={false}
                    loading={ao <= 1 ? "eager" : "lazy"}
                    className={`pointer-events-none absolute inset-0 size-full object-cover object-top transition duration-700 ${isActive ? "brightness-95 grayscale-0" : "brightness-75 grayscale"}`}
                  />
                ) : (
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center pb-16 font-serif text-7xl text-faint">
                    {initials(it.title)}
                  </span>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-paper/95 p-5 pt-24">
                  {it.eyebrow && <div className="eyebrow mb-1.5">{it.eyebrow}</div>}
                  <div className="font-serif text-[34px] leading-[0.95]">{it.title}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {n > 1 && (
        <div className="mt-3 flex flex-wrap justify-center" aria-label="Choisir un portrait">
          {items.map((it, i) => (
            <button key={it.key} type="button" aria-pressed={i === active} aria-label={it.title} onClick={() => setActive(i)} className="flex h-6 items-center px-1">
              <span aria-hidden className={`block h-1.5 rounded-md transition-[width] duration-300 ${i === active ? "w-8 bg-accent" : "w-2.5 bg-ink/30"}`} />
            </button>
          ))}
        </div>
      )}
      <p className="mt-2 text-center text-xs text-muted">{hint}</p>
    </div>
  );
}

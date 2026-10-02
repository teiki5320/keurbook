"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { countryPath } from "../map/africa-map";
import { useSwipe } from "./useSwipe";

// Three.js n'est téléchargé que sur la page qui affiche le carrousel.
const AfricaParticles = dynamic(() => import("../map/AfricaParticles").then((m) => m.AfricaParticles), { ssr: false });

export interface CarouselCountry {
  code: string;
  slug: string;
  name: string;
  of: string;
  description: string;
  authors: number;
  books: number;
  bd: number;
}

/**
 * Carrousel des pays (repris de Keur Cook) : au centre, les particules prennent la forme du pays
 * et se transforment d'un pays à l'autre, aux couleurs du tissu ; les voisins restent en contour gris.
 */
export function CountryCarousel({ countries, start = 0 }: { countries: CarouselCountry[]; start?: number }) {
  const n = countries.length;
  const [active, setActive] = useState(start);
  const go = (d: number) => setActive((i) => (((i + d) % n) + n) % n);
  const swipe = useSwipe(() => go(1), () => go(-1));
  if (n === 0) return null;
  const cur = countries[active];
  const titles = cur.books + cur.bd;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div {...swipe} className="relative overflow-hidden select-none" style={{ ...swipe.style, height: "min(clamp(300px,54vh,500px), 86vw)" }}>
        {/* Un seul nuage, au centre : il se transforme d'un pays à l'autre. */}
        <div className="absolute top-1/2 left-1/2 aspect-square h-full -translate-x-1/2 -translate-y-1/2">
          <AfricaParticles country={cur.code} colorful />
        </div>
        {countries.map((c, i) => {
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const ao = Math.abs(o);
          if (ao > 2) return null;
          const isActive = o === 0;
          return (
            <div
              key={c.code}
              aria-hidden={!isActive}
              onClick={() => !isActive && setActive(i)}
              className={`absolute top-1/2 left-1/2 aspect-square ${isActive ? "pointer-events-none" : "cursor-pointer"}`}
              style={{
                height: isActive ? "100%" : "46%",
                transform: `translate(-50%,-50%) translateX(${o * 108}%)`,
                opacity: isActive ? 1 : ao === 1 ? 0.6 : 0.22,
                transition: "transform .7s cubic-bezier(.16,1,.3,1), opacity .5s, height .7s cubic-bezier(.16,1,.3,1)",
              }}
            >
              <svg viewBox="-1.85 -1.85 3.7 3.7" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <path
                  d={countryPath(c.code)}
                  fill={isActive ? "none" : "rgba(239,233,221,.04)"}
                  stroke={isActive ? "rgba(239,233,221,.16)" : "rgba(239,233,221,.55)"}
                  strokeWidth={isActive ? 0.8 : 1.2}
                  strokeDasharray={isActive ? "2 4" : undefined}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {!isActive && <span className="absolute inset-x-0 -bottom-7 hidden text-center font-serif text-lg text-ink/75 sm:block">{c.name}</span>}
            </div>
          );
        })}
        <button type="button" onClick={() => go(-1)} aria-label="Pays précédent" className="absolute top-1/2 left-0 z-[4] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper/70 backdrop-blur hover:border-accent hover:text-accent">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Pays suivant" className="absolute top-1/2 right-0 z-[4] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper/70 backdrop-blur hover:border-accent hover:text-accent">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-2 text-center" aria-live="polite">
        <p className="eyebrow">
          {cur.authors} {cur.authors > 1 ? "écrivains" : "écrivain"} · {titles} {titles > 1 ? "titres" : "titre"}
        </p>
        <h2 className="mt-2 font-serif text-[52px] leading-none sm:text-7xl">
          <Link href={`/pays/${cur.slug}`} className="transition-colors hover:text-accent">
            {cur.name}
          </Link>
        </h2>
        <p className="mx-auto mt-3 line-clamp-4 max-w-2xl font-serif text-xl leading-snug text-ink/75">{cur.description}</p>
        <Link href={`/pays/${cur.slug}`} className="btn-primary mt-6">
          Les écrivains {cur.of} →
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap justify-center" aria-label="Choisir un pays">
        {countries.map((c, i) => (
          <button key={c.code} type="button" aria-current={i === active ? "true" : undefined} aria-label={c.name} onClick={() => setActive(i)} className="flex h-6 items-center px-1">
            <span aria-hidden className={`block h-1.5 rounded-md transition-[width] duration-300 ${i === active ? "w-7 bg-accent" : "w-2 bg-ink/25"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { mapPercent } from "./africa-map";

// Three.js (~600 Ko) n'est téléchargé que sur les pages qui affichent la carte.
const AfricaParticles = dynamic(() => import("./AfricaParticles").then((m) => m.AfricaParticles), { ssr: false });

interface MapCountry {
  code: string;
  slug: string;
  name: string;
  lon: number;
  lat: number;
  books: number;
  bd: number;
}

const shortName = (name: string) => name.replace("République démocratique du Congo", "RD Congo").replace("République centrafricaine", "Centrafrique");

/**
 * Carte de l'Afrique en particules (animation de Keur Cook, couleurs du design Nuit),
 * avec un point cliquable par pays qui a du contenu.
 * Sur la page d'un pays (`highlight`), les particules prennent la forme de ce pays.
 */
export function CountryMap({ countries, highlight }: { countries: MapCountry[]; highlight?: string }) {
  const current = countries.find((c) => c.slug === highlight);
  return (
    <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl bg-white" role="group" aria-label="Carte des pays d'Afrique subsaharienne présents sur Keurbook">
      <AfricaParticles country={current?.code} />
      {current ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-serif text-2xl italic">{current.name}</p>
      ) : (
        countries.map((c) => {
          const { left, top } = mapPercent(c.lon, c.lat);
          const n = c.books + c.bd;
          const size = 8 + Math.min(10, n);
          return (
            <Link
              key={c.slug}
              href={`/pays/${c.slug}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 p-2 focus-visible:outline-none"
              style={{ left: `${left}%`, top: `${top}%` }}
              aria-label={`${c.name}, ${n} titre${n > 1 ? "s" : ""}`}
            >
              <span
                className="block rounded-full bg-ink shadow-[0_0_12px_rgba(239,233,221,.6)] ring-accent transition group-hover:scale-125 group-hover:bg-accent group-focus-visible:ring-2"
                style={{ width: size, height: size }}
              />
              <span className="pointer-events-none absolute top-full left-1/2 mt-0.5 -translate-x-1/2 rounded bg-paper/90 px-1.5 py-0.5 text-[11px] whitespace-nowrap text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {shortName(c.name)}
              </span>
            </Link>
          );
        })
      )}
    </div>
  );
}

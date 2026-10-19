"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Onglets de la page « Top 10 » : un lien par sujet (chaque onglet est une vraie page).
 * Sur téléphone et tablette, la bande défile de côté, seule ; l'onglet actif est ramené en vue à l'ouverture.
 * Sur grand écran, les onglets passent à la ligne : tous restent visibles.
 */
export function Top10Tabs({ tabs, active }: { tabs: Array<{ slug: string; tab: string }>; active: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, []);
  return (
    <nav aria-label="Sujets du top 10" className="sticky top-16 z-30 border-y border-line bg-paper/95 backdrop-blur">
      <ul className="container-page flex snap-x gap-2 overflow-x-auto py-3 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => {
          const isActive = t.slug === active;
          return (
            <li key={t.slug} className="shrink-0 snap-start">
              <Link
                ref={isActive ? ref : undefined}
                href={`/top-10/${t.slug}`}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
                className={`inline-block rounded-full border px-4 py-2 text-[13px] whitespace-nowrap transition ${
                  isActive ? "border-accent bg-accent font-semibold text-paper" : "border-line-strong text-ink/85 hover:border-ink hover:text-ink"
                }`}
              >
                {t.tab}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

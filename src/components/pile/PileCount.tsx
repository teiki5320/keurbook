"use client";

import { usePile } from "@/lib/pile";

/** Nombre de livres dans la pile à lire (en-tête). */
export function PileCount() {
  const { slugs } = usePile();
  if (slugs.length === 0) return null;
  return <span className="ml-2 rounded-full bg-accent px-2.5 py-0.5 font-sans text-xs font-semibold text-paper not-italic">{slugs.length}</span>;
}

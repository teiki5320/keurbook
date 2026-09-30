"use client";

import { usePile } from "@/lib/pile";

/** Nombre de livres dans la pile à lire (en-tête). */
export function PileCount() {
  const { slugs } = usePile();
  if (slugs.length === 0) return null;
  return <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs text-white">{slugs.length}</span>;
}

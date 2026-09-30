"use client";

import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { usePile } from "@/lib/pile";

/** « Ajouter à ma pile à lire » / « Dans ma pile à lire ». */
export function PileButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { has, toggle } = usePile();
  const inPile = has(slug);
  const label = inPile ? "Dans ma pile à lire" : "Ajouter à ma pile à lire";
  const Icon = inPile ? BookmarkCheck : BookmarkPlus;
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={inPile}
      aria-label={compact ? label : undefined}
      title={compact ? label : undefined}
      className={compact ? "rounded-full border border-line bg-white p-2 hover:border-ink" : "btn-secondary"}
    >
      <Icon className="size-4" aria-hidden />
      {!compact && label}
    </button>
  );
}

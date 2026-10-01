"use client";

import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { usePile } from "@/lib/pile";

/** « Ajouter à ma pile à lire » / « Dans ma pile à lire ». */
export function PileButton({ slug, compact = false, className = "" }: { slug: string; compact?: boolean; className?: string }) {
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
      className={
        compact
          ? `rounded-full bg-paper/70 p-2 backdrop-blur transition hover:text-accent ${inPile ? "text-accent" : "text-ink"} ${className}`
          : `btn-secondary ${inPile ? "border-accent text-accent" : ""} ${className}`
      }
    >
      <Icon className="size-4" aria-hidden />
      {!compact && label}
    </button>
  );
}

import Link from "next/link";
import { Fragment } from "react";

/**
 * Texte avec liens internes écrits « [texte](/chemin) » (données des sélections).
 * Seuls les chemins internes sont acceptés : tout le reste est affiché tel quel.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
            {m[1]}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}

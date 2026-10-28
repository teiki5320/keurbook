import Link from "next/link";
import type { BookCardData } from "@/lib/data/books";

/**
 * Liste complète en liens texte (titre et auteur), de A à Z, repliée par défaut :
 * la grille n'affiche que les premiers livres, mais chaque fiche reste reliée depuis la page (lecteurs et moteurs de recherche).
 */
export function AllTitles({ books, label }: { books: BookCardData[]; label: string }) {
  const sorted = [...books].sort((a, b) => a.title.localeCompare(b.title, "fr"));
  return (
    <details className="container-page mt-12 border-t border-line pt-6">
      <summary className="cursor-pointer font-serif text-2xl hover:text-accent">
        {label} ({books.length})
      </summary>
      <ul className="mt-5 columns-1 gap-8 text-sm sm:columns-2 lg:columns-3">
        {sorted.map((b) => (
          <li key={b.slug} className="break-inside-avoid py-1">
            <Link href={b.path} prefetch={false} className="hover:text-accent">
              {b.title}
            </Link>{" "}
            <span className="text-faint">· {b.creators}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

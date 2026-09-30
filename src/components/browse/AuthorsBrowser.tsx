"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { initials, normalize } from "@/lib/book-utils";

export interface AuthorListItem {
  slug: string;
  name: string;
  countryCode: string;
  countryName: string;
  years: string;
  count: number;
}

/** Liste des auteurs : ordre alphabétique, filtre pays, recherche par nom. */
export function AuthorsBrowser({ authors, countries }: { authors: AuthorListItem[]; countries: Array<{ code: string; name: string }> }) {
  const [q, setQ] = useState("");
  const [pays, setPays] = useState("");
  const list = useMemo(() => {
    const n = normalize(q.trim());
    return authors.filter((a) => (!n || normalize(a.name).includes(n)) && (!pays || a.countryCode === pays));
  }, [authors, q, pays]);

  return (
    <div className="container-page">
      <div className="grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-3">
        <label className="sm:col-span-2">
          <span className="sr-only">Rechercher un auteur</span>
          <input type="search" className="input" placeholder="Nom de l'auteur…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Pays</span>
          <select className="input" value={pays} onChange={(e) => setPays(e.target.value)}>
            <option value="">Tous les pays</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-4 mb-6 text-sm text-muted" aria-live="polite">
        {list.length} {list.length > 1 ? "auteurs" : "auteur"}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <li key={a.slug}>
            <Link href={`/auteur/${a.slug}`} className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 hover:border-ink">
              <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif font-bold">
                {initials(a.name)}
              </span>
              <span>
                <span className="block font-semibold">{a.name}</span>
                <span className="block text-sm text-muted">
                  {a.countryName}
                  {a.years ? ` · ${a.years}` : ""} · {a.count} {a.count > 1 ? "titres" : "titre"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

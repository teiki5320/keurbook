"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { normalize } from "@/lib/book-utils";
import { AuthorAvatar } from "../book/AuthorAvatar";

export interface AuthorListItem {
  slug: string;
  name: string;
  countryCode: string;
  countryName: string;
  years: string;
  photo: string | null;
  count: number;
}

/** Lettre de classement : initiale du nom de famille (dernier mot), comme le tri des auteurs. */
const letterOf = (name: string) => normalize(name.split(" ").at(-1) ?? name).charAt(0).toUpperCase() || "#";

/** Liste des auteurs : ordre alphabétique groupé par lettre, filtre pays, recherche par nom. */
export function AuthorsBrowser({ authors, countries }: { authors: AuthorListItem[]; countries: Array<{ code: string; name: string }> }) {
  const [q, setQ] = useState("");
  const [pays, setPays] = useState("");
  const list = useMemo(() => {
    const n = normalize(q.trim());
    return authors.filter((a) => (!n || normalize(a.name).includes(n)) && (!pays || a.countryCode === pays));
  }, [authors, q, pays]);
  const groups = useMemo(() => {
    const m = new Map<string, AuthorListItem[]>();
    for (const a of list) {
      const l = letterOf(a.name);
      m.set(l, [...(m.get(l) ?? []), a]);
    }
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b, "fr"));
  }, [list]);

  return (
    <div className="container-page">
      <div className="grid grid-cols-[1fr_auto] items-end gap-3">
        <label>
          <span className="sr-only">Rechercher un auteur</span>
          <input type="search" className="input-line" placeholder="Un nom…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Pays</span>
          <select className="rounded-full border border-line-strong bg-paper px-3.5 py-2 text-[13px] text-ink focus:border-accent focus:outline-none" value={pays} onChange={(e) => setPays(e.target.value)}>
            <option value="">Tous les pays</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-[13px] text-faint" aria-live="polite">
          {list.length} {list.length > 1 ? "auteurs" : "auteur"}
        </p>
        <nav aria-label="Lettres" className="flex flex-wrap justify-end gap-x-2 gap-y-1 text-[12px]">
          {groups.map(([l]) => (
            <a key={l} href={`#lettre-${l}`} className="text-accent hover:text-ink">
              {l}
            </a>
          ))}
        </nav>
      </div>

      {groups.map(([l, items]) => (
        <section key={l} id={`lettre-${l}`} className="mt-8 scroll-mt-20">
          <h2 className="border-b border-line pb-1.5 font-serif text-[40px] leading-none text-accent italic">{l}</h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/auteur/${a.slug}`} className="group grid grid-cols-[52px_1fr] items-center gap-4 py-3">
                  <AuthorAvatar name={a.name} photo={a.photo} className="size-[52px] text-base" />
                  <span>
                    <span className="block font-serif text-[22px] leading-[1.05] group-hover:text-accent">{a.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {a.countryName}
                      {a.years ? ` · ${a.years}` : ""} · {a.count} {a.count > 1 ? "titres" : "titre"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

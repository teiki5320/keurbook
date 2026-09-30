"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { BookCardData } from "@/lib/data/books";
import { normalize } from "@/lib/book-utils";
import { AUDIENCES, GENRES, PERIODS, THEMES } from "@/lib/themes";
import { BookGrid } from "../book/BookCard";

type Sort = "nouveautes" | "titre" | "annee";

interface Props {
  books: BookCardData[];
  countries: Array<{ code: string; name: string }>;
  /** BD : pas de filtre genre, thème ni époque. */
  simple?: boolean;
}

/**
 * Liste filtrable des livres ou des BD. Les filtres sont repris de l'adresse
 * (?q=, ?pays=, ?genre=, ?public=, ?theme=, ?epoque=, ?tri=) et y sont recopiés, pour partager une recherche.
 */
export function BooksBrowser({ books, countries, simple = false }: Props) {
  const params = useSearchParams();
  const [state, setState] = useState(() => ({
    q: params.get("q") ?? "",
    pays: params.get("pays") ?? "",
    genre: params.get("genre") ?? "",
    public: params.get("public") ?? "",
    theme: params.get("theme") ?? "",
    epoque: params.get("epoque") ?? "",
    tri: (params.get("tri") as Sort) || "nouveautes",
  }));

  function update(patch: Partial<typeof state>) {
    const next = { ...state, ...patch };
    setState(next);
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v && !(k === "tri" && v === "nouveautes")) qs.set(k, v);
    const s = qs.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }

  const results = useMemo(() => {
    const words = normalize(state.q).split(/\s+/).filter(Boolean);
    const list = books.filter(
      (b) =>
        words.every((w) => b.search.includes(w)) &&
        (!state.pays || b.countryCode === state.pays) &&
        (!state.genre || b.genre === state.genre) &&
        (!state.public || b.audience === state.public) &&
        (!state.theme || b.themes.includes(state.theme as BookCardData["themes"][number])) &&
        (!state.epoque || b.period === state.epoque),
    );
    if (state.tri === "titre") return [...list].sort((a, b) => a.title.localeCompare(b.title, "fr"));
    if (state.tri === "annee") return [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [books, state]);

  const usedGenres = Object.entries(GENRES).filter(([k]) => books.some((b) => b.genre === k));
  const usedThemes = Object.entries(THEMES).filter(([k]) => books.some((b) => b.themes.includes(k as BookCardData["themes"][number])));
  const active = [state.q, state.pays, state.genre, state.public, state.theme, state.epoque].some(Boolean);

  return (
    <div className="container-page">
      <div className="grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2">
          <span className="sr-only">Rechercher</span>
          <input
            type="search"
            className="input"
            placeholder={simple ? "Titre, auteur, pays…" : "Titre, auteur, pays, thème…"}
            value={state.q}
            onChange={(e) => update({ q: e.target.value })}
          />
        </label>
        <Select label="Pays" value={state.pays} onChange={(pays) => update({ pays })} options={countries.map((c) => [c.code, c.name])} />
        <Select label="Public" value={state.public} onChange={(v) => update({ public: v })} options={Object.entries(AUDIENCES)} />
        {!simple && (
          <>
            <Select label="Genre" value={state.genre} onChange={(genre) => update({ genre })} options={usedGenres} />
            <Select label="Thème" value={state.theme} onChange={(theme) => update({ theme })} options={usedThemes} />
            <Select label="Époque" value={state.epoque} onChange={(epoque) => update({ epoque })} options={PERIODS.map((p) => [p.key, p.name])} />
          </>
        )}
        <Select
          label="Trier par"
          value={state.tri}
          onChange={(tri) => update({ tri: (tri || "nouveautes") as Sort })}
          options={[
            ["nouveautes", "Nouveautés"],
            ["titre", "Titre"],
            ["annee", "Année de parution"],
          ]}
          noEmpty
        />
      </div>

      <div className="mt-4 mb-6 flex items-center justify-between text-sm text-muted">
        <p aria-live="polite">
          {results.length} {simple ? "BD" : results.length > 1 ? "livres" : "livre"}
        </p>
        {active && (
          <button type="button" className="underline hover:text-ink" onClick={() => update({ q: "", pays: "", genre: "", public: "", theme: "", epoque: "" })}>
            Effacer les filtres
          </button>
        )}
      </div>

      {results.length > 0 ? <BookGrid books={results} /> : <p className="py-10 text-center text-muted">Aucun résultat pour cette recherche.</p>}
    </div>
  );
}

function Select({ label, value, onChange, options, noEmpty = false }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> | Array<readonly [string, string]>; noEmpty?: boolean }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {!noEmpty && <option value="">Tous</option>}
        {options.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
}

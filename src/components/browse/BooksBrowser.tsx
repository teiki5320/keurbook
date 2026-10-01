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
      <label className="block">
        <span className="sr-only">Rechercher</span>
        <input
          type="search"
          className="input-line"
          placeholder={simple ? "Un titre, un auteur…" : "Un titre, un auteur, un thème…"}
          value={state.q}
          onChange={(e) => update({ q: e.target.value })}
        />
      </label>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        <Pill label="Pays" value={state.pays} onChange={(pays) => update({ pays })} options={countries.map((c) => [c.code, c.name])} />
        {!simple && <Pill label="Thème" value={state.theme} onChange={(theme) => update({ theme })} options={usedThemes} />}
        {!simple && <Pill label="Genre" value={state.genre} onChange={(genre) => update({ genre })} options={usedGenres} />}
        <Pill label="Public" value={state.public} onChange={(v) => update({ public: v })} options={Object.entries(AUDIENCES)} />
        {!simple && <Pill label="Époque" value={state.epoque} onChange={(epoque) => update({ epoque })} options={PERIODS.map((p) => [p.key, p.name])} />}
      </div>

      <div className="mt-4 mb-6 flex items-center justify-between gap-3 text-xs text-faint">
        <p aria-live="polite">
          {results.length} {simple ? "BD" : results.length > 1 ? "livres" : "livre"}
          {active && (
            <button type="button" className="ml-3 text-accent hover:text-ink" onClick={() => update({ q: "", pays: "", genre: "", public: "", theme: "", epoque: "" })}>
              Effacer les filtres
            </button>
          )}
        </p>
        <label className="flex items-center gap-1.5">
          <span>Trier :</span>
          <select className="bg-transparent text-ink focus:outline-none" value={state.tri} onChange={(e) => update({ tri: (e.target.value || "nouveautes") as Sort })}>
            <option value="nouveautes">Nouveautés d&apos;abord</option>
            <option value="titre">Titre</option>
            <option value="annee">Année de parution</option>
          </select>
        </label>
      </div>

      {results.length > 0 ? <BookGrid books={results} /> : <p className="py-16 text-center font-serif text-2xl text-muted italic">Aucun résultat pour cette recherche.</p>}
    </div>
  );
}

/** Filtre en forme de pastille : ocre plein quand une valeur est choisie. */
function Pill({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> | Array<readonly [string, string]> }) {
  const on = Boolean(value);
  return (
    <label className="shrink-0">
      <span className="sr-only">{label}</span>
      <select
        className={`appearance-none rounded-full px-3.5 py-2 text-[13px] focus:outline-none ${on ? "bg-accent font-medium text-paper" : "border border-line-strong bg-paper text-ink"}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
}

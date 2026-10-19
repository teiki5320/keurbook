"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AmazonButton } from "@/components/book/AmazonButton";
import { BookCover } from "@/components/book/BookCover";
import type { SelectionBook } from "@/lib/data/selections";
import { PartnerNote } from "./PartnerNote";

type Sort = "ancien" | "recent";
const MAX_COMPARE = 3;

/**
 * La sélection complète : filtres par envie, tri par date, et comparaison de 2 ou 3 livres côte à côte.
 * Tous les livres sont dans le HTML de la page (lisibles sans JavaScript et par les moteurs de recherche) ;
 * les filtres ne font que masquer ceux qui ne correspondent pas.
 */
export function SelectionBrowser({ books, envies, unit }: { books: SelectionBook[]; envies: Record<string, string>; unit: string }) {
  const [envie, setEnvie] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("ancien");
  const [compare, setCompare] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const shown = books.filter((b) => envie === "all" || b.envie === envie).sort((a, b) => (sort === "ancien" ? a.year - b.year : b.year - a.year));
  const chosen = compare.map((slug) => books.find((b) => b.slug === slug)!).filter(Boolean);
  const toggle = (slug: string) =>
    setCompare((c) => (c.includes(slug) ? c.filter((s) => s !== slug) : c.length >= MAX_COMPARE ? c : [...c, slug]));
  const sheetOpen = open && chosen.length > 1;

  // Comparaison ouverte : Échap la ferme et la page derrière ne défile plus.
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const count = envie === "all" ? `${books.length} ${unit}` : `${shown.length} ${shown.length > 1 ? unit : unit.replace(/s$/, "")} pour «\u00a0${envies[envie]}\u00a0»`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="selection-titre" className="section-title">
            La sélection complète
          </h2>
          <p className="mt-2 text-sm text-muted" aria-live="polite">
            {count} · cochez «{"\u00a0"}Comparer{"\u00a0"}» sur 2 ou 3 livres.
          </p>
        </div>
        <label className="flex items-center gap-2 text-[13px] text-muted">
          Trier
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-line-strong bg-white px-3 py-2 text-[13px] text-ink focus:border-accent focus:outline-none"
          >
            <option value="ancien">Du plus ancien au plus récent</option>
            <option value="recent">Du plus récent au plus ancien</option>
          </select>
        </label>
      </div>

      <div role="group" aria-label="Filtrer selon votre envie" className="mt-5 flex flex-wrap gap-2">
        {[["all", "Tous"], ...Object.entries(envies)].map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={envie === key}
            onClick={() => setEnvie(key)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] transition ${envie === key ? "border-accent bg-accent text-paper" : "border-line-strong text-ink/85 hover:border-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ol className="mt-6 flex flex-col gap-4">
        {books.map((b) => {
          const visible = shown.includes(b);
          const order = shown.indexOf(b);
          const selected = compare.includes(b.slug);
          return (
            <li key={b.slug} id={b.slug} hidden={!visible} style={{ order }} className="scroll-mt-32">
              <article className="rounded-xl border border-line bg-white p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-5">
                  <span className="hidden h-10 w-14 shrink-0 items-center justify-center rounded-md border border-line-strong font-serif text-lg text-accent sm:flex" title="Année de parution">
                    {b.year}
                  </span>
                  <Link href={b.path} className="w-[72px] shrink-0 sm:w-24" tabIndex={-1} aria-hidden>
                    <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full border border-accent/50 px-2.5 py-0.5 text-[11px] text-ink">{b.envieLabel}</span>
                    <h3 className="mt-2 font-serif text-[26px] leading-[1.02] text-balance sm:text-3xl">
                      <Link href={b.path} className="italic hover:text-accent">
                        {b.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-ink/80">
                      {b.authorName}
                      {b.country && <span className="text-muted"> · {b.country.name}</span>}
                    </p>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-3 text-[13px] sm:grid-cols-4">
                  <Fact label="Parution">{b.year}</Fact>
                  <Fact label="Longueur">{b.pages ? `${b.pages} pages` : "Non précisée"}</Fact>
                  <Fact label="Langue d'origine">{b.language}</Fact>
                  <Fact label="Distinction" accent={b.awards.length > 0}>
                    {b.awards[0] ?? "—"}
                  </Fact>
                </dl>

                <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
                  <strong className="font-semibold text-ink">Pourquoi le lire. </strong>
                  {b.why}
                </p>

                <div className="mt-4">
                  <p className="text-[11px] tracking-[0.14em] text-accent uppercase">On aime</p>
                  <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-ink/80">
                    {b.whyRead.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span aria-hidden className="text-accent">
                          +
                        </span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {b.authorSlug && (
                  <p className="mt-4 text-sm">
                    <Link href={`/auteur/${b.authorSlug}`} className="text-accent hover:text-ink">
                      Qui est {b.authorName}{"\u00a0"}? →
                    </Link>
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
                  <AmazonButton href={b.amazonUrl} priceCents={null} small className="py-2" />
                  <PartnerNote />
                  <Link href={b.path} className="btn-secondary px-3 py-1.5 text-xs">
                    Voir la fiche
                  </Link>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggle(b.slug)}
                    disabled={!selected && compare.length >= MAX_COMPARE}
                    className={`ml-auto rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-40 ${selected ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink"}`}
                  >
                    {selected ? "✓ À comparer" : "+ Comparer"}
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      {/* Barre de comparaison */}
      {chosen.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-ink text-paper shadow-[0_-6px_24px_rgba(0,0,0,0.4)]">
          <div className="container-page flex items-center justify-between gap-3 py-3">
            <div className="min-w-0 text-sm">
              <strong className="font-semibold">
                {chosen.length} sélectionné{chosen.length > 1 ? "s" : ""}
              </strong>
              <p className="truncate text-xs text-paper/70">{chosen.map((b) => b.title).join(" · ")}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => setCompare([])} className="rounded-full border border-paper/30 px-3 py-2 text-xs font-medium">
                Vider
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={chosen.length < 2}
                className="rounded-full bg-paper px-4 py-2 text-xs font-semibold text-ink disabled:opacity-50"
              >
                Comparer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparaison côte à côte */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comparaison-titre"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88dvh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white px-4 pt-5 pb-8 sm:px-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="comparaison-titre" className="font-serif text-3xl">
                Côte à côte
              </h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer la comparaison" className="size-9 rounded-full bg-ink/10 text-lg">
                ×
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {chosen.map((b) => (
                <div key={b.slug} className="flex flex-col gap-2.5 rounded-xl border border-line-strong bg-paper p-4">
                  <p className="font-serif text-2xl leading-tight italic">{b.title}</p>
                  <p className="text-[13px] text-ink/80">{b.authorName}</p>
                  <dl className="space-y-1.5 border-t border-line pt-2.5 text-[13px]">
                    <Row label="Pays">{b.country?.name ?? "—"}</Row>
                    <Row label="Parution">{b.year}</Row>
                    <Row label="Pages">{b.pages ?? "Non précisé"}</Row>
                    <Row label="Langue">{b.language}</Row>
                  </dl>
                  {b.awards.length > 0 && <p className="text-[13px] leading-snug text-accent">✦ {b.awards.join(" · ")}</p>}
                  <p className="border-t border-line pt-2.5 text-[13px] leading-snug text-ink/80">{b.whyRead[0]}</p>
                  <div className="mt-auto flex flex-col items-stretch gap-1.5 pt-2 text-center">
                    <AmazonButton href={b.amazonUrl} priceCents={null} small className="py-2" />
                    <PartnerNote />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Fact({ label, children, accent = false }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-faint">{label}</dt>
      <dd className={`mt-0.5 font-medium ${accent ? "text-accent" : ""}`}>{children}</dd>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-faint">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

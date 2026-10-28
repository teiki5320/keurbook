import Link from "next/link";
import { AmazonButton, AmazonNote } from "@/components/book/AmazonButton";
import { BookCover } from "@/components/book/BookCover";
import type { Top10Book } from "@/lib/data/top10";
import { TOP10_UPDATED } from "@/lib/top10/sujets";
import type { Top10 } from "@/lib/top10/types";
import { RichText } from "./RichText";
import { Top10Tabs } from "./Top10Tabs";

const monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

/** Les 3 sujets qui suivent dans l'ordre des onglets (on repart du début après le dernier). */
function seeAlso(tops: Top10[], top: Top10): Top10[] {
  const i = tops.findIndex((t) => t.slug === top.slug);
  return [1, 2, 3].map((k) => tops[(i + k) % tops.length]);
}

/** Sujet du top avec une majuscule : « Top 10 des romans récents » → « Romans récents ». */
function subjectOf(top: Top10): string {
  const s = top.title.replace(/^Top 10 des /, "");
  return s[0].toUpperCase() + s.slice(1);
}

/** Page « Top 10 » : onglets des sujets, puis le top du sujet actif (même gabarit pour tous les sujets). */
export function Top10View({ tops, top, books }: { tops: Top10[]; top: Top10; books: Top10Book[] }) {
  return (
    <>
      {/* Pas de fil d'Ariane visible (comme le reste du site) : seule sa version pour Google, dans la page. */}
      <div className="mt-4">
        <Top10Tabs tabs={tops.map((t) => ({ slug: t.slug, tab: t.tab }))} active={top.slug} />
      </div>

      <article className="container-page max-w-4xl">
        {/* En-tête du sujet */}
        <header className="pt-10">
          <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
            <span>Notre sélection</span>
            <span className="text-muted">10 livres · {monthYear.format(new Date(`${TOP10_UPDATED}T12:00:00Z`))}</span>
          </p>
          <h1 className="mt-3 font-serif text-[42px] leading-[0.98] text-balance sm:text-6xl">{top.title}</h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink/85">{top.intro}</p>
        </header>

        {/* Les 10 livres */}
        <ol className="mt-10 space-y-5">
          {books.map((b) => (
            <li key={b.slug}>
              <section aria-labelledby={`livre-${b.rank}`} className="rounded-xl border border-line bg-white p-5 sm:p-7">
                <div className="sm:grid sm:grid-cols-[176px_1fr] sm:gap-8">
                  <div className="flex items-start gap-5 sm:flex-col sm:gap-4">
                    <span
                      aria-label={`Numéro ${b.rank}`}
                      className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-paper font-serif text-[34px] leading-none text-accent sm:size-16 sm:text-[40px]"
                    >
                      {b.rank}
                    </span>
                    <Link href={b.path} tabIndex={-1} aria-hidden className="w-36 shrink-0 sm:w-44">
                      <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} priority={b.rank === 1} />
                    </Link>
                  </div>

                  <div className="mt-5 min-w-0 sm:mt-0">
                    <p className="eyebrow">
                      {[b.place ?? b.country?.name, b.year, b.isBd && "BD", b.age].filter(Boolean).join(" · ")}
                    </p>
                    <h2 id={`livre-${b.rank}`} className="mt-2 font-serif text-[32px] leading-[1.02] text-balance sm:text-4xl">
                      <Link href={b.path} className="italic hover:text-accent">
                        {b.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-[15px] text-ink/85">
                      {b.authorSlug ? (
                        <Link href={`/auteur/${b.authorSlug}`} className="underline decoration-line-strong underline-offset-4 hover:text-accent">
                          {b.authorName}
                        </Link>
                      ) : (
                        b.authorName
                      )}
                    </p>
                    {b.awards.length > 0 && <p className="mt-2 text-[13px] leading-snug text-accent">✦ {b.awards.join(" · ")}</p>}

                    <h3 className="eyebrow mt-5">Pourquoi le lire</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{b.why}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                      <AmazonButton href={b.amazonUrl} title={b.title} className="py-3" />
                      <Link href={b.path} className="text-sm text-accent hover:text-ink">
                        Voir la fiche →
                      </Link>
                    </div>
                    <AmazonNote illustrated={!b.cover && !!b.illustration} />
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ol>

        {/* Par où commencer */}
        <section aria-labelledby="commencer" className="mt-14">
          <h2 id="commencer" className="section-title">
            Par où commencer
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/85">
            <RichText text={top.start} />
          </p>
        </section>

        {/* Questions fréquentes */}
        <section aria-labelledby="questions" className="mt-14">
          <h2 id="questions" className="section-title">
            Questions fréquentes
          </h2>
          <div className="mt-5 border-b border-line">
            {top.faq.map((f) => (
              <details key={f.q} className="group border-t border-line py-4">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-base font-semibold hover:text-accent [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-accent transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                  <RichText text={f.a} />
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Voir aussi : les 3 tops suivants dans l'ordre des onglets */}
        <section aria-labelledby="voir-aussi" className="mt-14">
          <h2 id="voir-aussi" className="section-title">
            Voir aussi
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {seeAlso(tops, top).map((t) => (
              <li key={t.slug}>
                <Link href={`/top-10/${t.slug}`} className="flex h-full flex-col rounded-xl border border-line bg-white p-4 transition hover:border-line-strong">
                  <span className="eyebrow">Top 10</span>
                  <span className="mt-1.5 font-serif text-2xl leading-[1.05] text-balance">{subjectOf(t)}</span>
                  <span className="mt-auto pt-3 text-sm text-accent">Voir le top →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}

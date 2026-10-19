import Link from "next/link";
import { AmazonButton } from "@/components/book/AmazonButton";
import { BookCover } from "@/components/book/BookCover";
import { Breadcrumb } from "@/components/layout/Section";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import type { Top10Book } from "@/lib/data/top10";
import { TOP10_UPDATED } from "@/lib/top10/sujets";
import type { Top10 } from "@/lib/top10/types";
import { PartnerNote } from "./PartnerNote";
import { RichText } from "./RichText";
import { Top10Tabs } from "./Top10Tabs";

const monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

/** Page « Top 10 » : onglets des sujets, puis le top du sujet actif (même gabarit pour tous les sujets). */
export function Top10View({ tops, top, books }: { tops: Top10[]; top: Top10; books: Top10Book[] }) {
  return (
    <>
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Top 10", href: "/top-10" }, { name: top.tab }]} />
      <div className="mt-5">
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
          <p className="mt-4 text-xs leading-relaxed text-faint">{AMAZON_DISCLOSURE}</p>
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
                      {[b.country?.name, b.year].filter(Boolean).join(" · ")}
                      {b.isBd && " · BD"}
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
                      <AmazonButton href={b.amazonUrl} priceCents={null} label="Voir sur Amazon" className="py-3" />
                      <PartnerNote />
                      <Link href={b.path} className="text-sm text-accent hover:text-ink">
                        Voir la fiche →
                      </Link>
                    </div>
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
          <p className="mt-8 text-xs leading-relaxed text-faint">{AMAZON_DISCLOSURE}</p>
        </section>
      </article>
    </>
  );
}

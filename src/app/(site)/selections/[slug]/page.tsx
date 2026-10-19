import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmazonButton } from "@/components/book/AmazonButton";
import { BookCover } from "@/components/book/BookCover";
import { Breadcrumb } from "@/components/layout/Section";
import { PartnerNote } from "@/components/selections/PartnerNote";
import { RichText } from "@/components/selections/RichText";
import { SelectionBrowser } from "@/components/selections/SelectionBrowser";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { getSelectionBooks, getSelectionBySlug, getSelections } from "@/lib/data/selections";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getSelections().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/selections/[slug]">): Promise<Metadata> {
  const selection = getSelectionBySlug((await params).slug);
  if (!selection) return {};
  return pageMetadata({ title: selection.title, description: selection.description, path: `/selections/${selection.slug}`, type: "article" });
}

const monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

/** Sous-menu de la page (ancres). */
const SUBNAV = [
  ["portes", "3 entrées"],
  ["selection", "Sélection"],
  ["tableau", "Tableau"],
  ["guide", "Guide"],
  ["questions", "FAQ"],
] as const;

/** Page « Nos sélections » : modèle commun à toutes les sélections (données dans src/lib/selections). */
export default async function SelectionPage({ params }: PageProps<"/selections/[slug]">) {
  if (getMaintenance().enabled) return null;
  const selection = getSelectionBySlug((await params).slug);
  if (!selection) notFound();
  const books = await getSelectionBooks(selection);
  const bySlug = new Map(books.map((b) => [b.slug, b]));
  const url = `${siteConfig.url}/selections/${selection.slug}`;
  const head = selection.titleItalic && selection.title.endsWith(selection.titleItalic) ? selection.title.slice(0, -selection.titleItalic.length) : selection.title;

  const structuredData = [
    itemListLd(
      selection.title,
      books.map((b) => ({ name: b.title, url: `${siteConfig.url}${b.path}` })),
    ),
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: "Nos sélections", url: `${siteConfig.url}/selections` },
      { name: selection.title, url },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Nos sélections", href: "/selections" }, { name: selection.title }]} />

      {/* En-tête */}
      <header className="container-page max-w-3xl pt-8 lg:max-w-6xl">
        <div className="max-w-3xl">
          <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
            <span>Notre sélection</span>
            <span className="text-muted">
              {books.length} {selection.unit} · {monthYear.format(new Date(`${selection.updated}T12:00:00Z`))}
            </span>
          </p>
          <h1 className="mt-3 font-serif text-[44px] leading-[0.98] text-balance sm:text-6xl">
            {head}
            {head !== selection.title && <i>{selection.titleItalic}</i>}
          </h1>
          {selection.intro.map((p) => (
            <p key={p.slice(0, 30)} className="mt-5 text-[17px] leading-relaxed text-ink/85 first-of-type:mt-6">
              {p}
            </p>
          ))}
          <p className="mt-5 text-xs leading-relaxed text-faint">
            {AMAZON_DISCLOSURE} Aucun prix ni note n&apos;est affiché{"\u00a0"}: le prix du jour est sur Amazon. Les couvertures sont illustrées par Keurbook{"\u00a0"}; les éditions
            vendues ont leur propre couverture.
          </p>
        </div>
      </header>

      {/* Sous-menu */}
      <nav aria-label="Dans cette page" className="sticky top-16 z-30 mt-8 border-y border-line bg-paper/95 backdrop-blur">
        <ul className="container-page flex flex-wrap gap-x-1 gap-y-0 py-1.5 text-[13px]">
          {SUBNAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="inline-block rounded-md px-2.5 py-1.5 text-ink/85 hover:bg-ink/10 hover:text-ink">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Trois portes d'entrée (sans classement) */}
      <section id="portes" aria-labelledby="portes-titre" className="container-page scroll-mt-32 pt-10">
        <h2 id="portes-titre" className="section-title">
          Trois portes d&apos;entrée
        </h2>
        <p className="mt-2 text-sm text-muted">Si vous ne savez pas par où commencer{"\u00a0"}: un classique, un roman d&apos;aujourd&apos;hui, un livre pour rire.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {selection.highlights.map((h) => {
            const b = bySlug.get(h.slug)!;
            return (
              <article key={h.slug} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4 sm:p-5">
                <span className="self-start rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-paper uppercase">{h.label}</span>
                <div className="flex gap-4">
                  <Link href={b.path} className="w-[72px] shrink-0" tabIndex={-1} aria-hidden>
                    <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                  </Link>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl leading-[1.05] text-balance italic">
                      <Link href={b.path} className="hover:text-accent">
                        {b.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-ink/80">{b.authorName}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {[b.country?.name, b.year, b.pages ? `${b.pages} p.` : null].filter(Boolean).join(" · ")}
                    </p>
                    {b.awards[0] && <p className="mt-1.5 text-xs text-accent">✦ {b.awards[0]}</p>}
                  </div>
                </div>
                <p className="border-t border-line pt-3 text-[15px] leading-relaxed text-ink/85">{h.verdict}</p>
                <div className="mt-auto flex items-center gap-3">
                  <AmazonButton href={b.amazonUrl} priceCents={null} className="flex-1 py-3" />
                  <PartnerNote />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* La sélection complète (filtres, tri, comparaison) */}
      <section id="selection" aria-labelledby="selection-titre" className="container-page scroll-mt-32 pt-14">
        <SelectionBrowser books={books} envies={selection.envies} unit={selection.unit} />
      </section>

      {/* Tableau comparatif : tableau sur ordinateur, fiches empilées sur téléphone (pas de défilement horizontal) */}
      <section id="tableau" aria-labelledby="tableau-titre" className="container-page scroll-mt-32 pt-14">
        <h2 id="tableau-titre" className="section-title">
          Tableau comparatif
        </h2>
        <p className="mt-2 text-sm text-muted">Les informations viennent des fiches de Keurbook (édition conseillée).</p>
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-line bg-white lg:block">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] tracking-[0.08em] text-faint uppercase">
              <tr>
                {["Titre", "Auteur", "Pays", "Année", "Pages", "Langue", "Distinction", ""].map((h) => (
                  <th key={h} scope="col" className={`px-4 py-3 font-medium ${h === "Année" || h === "Pages" ? "text-right" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.slug} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-3 font-serif text-lg leading-tight font-normal italic">
                    <Link href={b.path} className="hover:text-accent">
                      {b.title}
                    </Link>
                  </th>
                  <td className="px-4 py-3">{b.authorName}</td>
                  <td className="px-4 py-3 text-muted">{b.country?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{b.year}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{b.pages ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{b.language}</td>
                  <td className="px-4 py-3 text-accent">{b.awards[0] ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <a href={b.amazonUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="font-semibold whitespace-nowrap text-accent hover:text-ink">
                      Amazon →
                    </a>
                    <PartnerNote className="block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-white lg:hidden">
          {books.map((b) => (
            <li key={b.slug} className="p-4">
              <p className="font-serif text-xl leading-tight italic">
                <Link href={b.path} className="hover:text-accent">
                  {b.title}
                </Link>
              </p>
              <p className="mt-0.5 text-[13px] text-ink/80">
                {b.authorName}
                {b.country && <span className="text-muted"> · {b.country.name}</span>}
              </p>
              <p className="mt-1.5 text-[13px] text-muted">
                {b.year} · {b.pages ? `${b.pages} pages` : "pages non précisées"} · {b.language}
              </p>
              {b.awards[0] && <p className="mt-1 text-[13px] text-accent">✦ {b.awards[0]}</p>}
              <p className="mt-2 flex items-center gap-3 text-[13px]">
                <a href={b.amazonUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="font-semibold text-accent hover:text-ink">
                  Voir sur Amazon →
                </a>
                <PartnerNote />
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Comment choisir */}
      <section id="guide" aria-labelledby="guide-titre" className="container-page scroll-mt-32 pt-14">
        <h2 id="guide-titre" className="section-title">
          Comment choisir
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {selection.guide.map((g, i) => (
            <div key={g.q} className="rounded-xl border border-line bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-paper">{i + 1}</span>
                <h3 className="text-base font-semibold">{g.q}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                <RichText text={g.a} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Questions fréquentes */}
      <section id="questions" aria-labelledby="questions-titre" className="container-page max-w-3xl scroll-mt-32 pt-14 lg:max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="questions-titre" className="section-title">
            Questions fréquentes
          </h2>
          <div className="mt-5 border-b border-line">
            {selection.faq.map((f) => (
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
        </div>
      </section>
    </>
  );
}

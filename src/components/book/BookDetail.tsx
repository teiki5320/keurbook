/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import Link from "next/link";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb, Section } from "@/components/layout/Section";
import { PileButton } from "@/components/pile/PileButton";
import { amazonUrl } from "@/lib/amazon";
import { creatorNames, creators, translator } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
import { getBookAuthors, getBookCountry, getBooksByAuthor, getRelatedBooks, toCards } from "@/lib/data/books";
import { getConseilsForBooks } from "@/lib/data/conseils";
import { formatPrice } from "@/lib/format";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { AUDIENCES, GENRES, THEMES } from "@/lib/themes";
import type { Book } from "@/lib/types";
import { AmazonButton } from "./AmazonButton";
import { BookGrid } from "./BookCard";
import { BookCover } from "./BookCover";

const ROLE_LABEL = { auteur: "", scenariste: "Scénario", dessinateur: "Dessin", traducteur: "Traduction" } as const;

/** Fiche livre ou BD (même contenu ; la BD distingue scénariste et dessinateur et peut montrer des planches). */
export async function BookDetail({ book }: { book: Book }) {
  const isBd = book.kind === "bd";
  const base = isBd ? { name: "BD", href: "/bd", path: `/bd/${book.slug}` } : { name: "Livres", href: "/livres", path: `/livre/${book.slug}` };
  const [country, authors, related] = await Promise.all([getBookCountry(book), getBookAuthors(book), getRelatedBooks(book)]);
  const sameAuthor = (await Promise.all(authors.map((a) => getBooksByAuthor(a.slug))))
    .flat()
    .filter((b, i, all) => b.slug !== book.slug && all.findIndex((x) => x.slug === b.slug) === i);
  const conseils = getConseilsForBooks([book.slug]).slice(0, 3);
  const names = creatorNames(book);
  const trans = translator(book);
  const buyUrl = amazonUrl(book);
  const url = `${siteConfig.url}${base.path}`;
  const filterBase = isBd ? "/bd" : "/livres";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: book.title,
      url,
      author: creators(book).map((c) => ({ "@type": "Person", name: c.name, ...(c.authorSlug ? { url: `${siteConfig.url}/auteur/${c.authorSlug}` } : {}) })),
      ...(trans ? { translator: { "@type": "Person", name: trans.name } } : {}),
      inLanguage: "fr",
      datePublished: String(book.year),
      publisher: { "@type": "Organization", name: book.publisher },
      genre: GENRES[book.genre],
      description: book.summary,
      ...(book.isbn ? { isbn: book.isbn } : {}),
      ...(book.pages ? { numberOfPages: book.pages } : {}),
      ...(book.cover ? { image: `${siteConfig.url}${book.cover}` } : {}),
      ...(book.awards.length ? { award: book.awards.map((a) => `${a.name} ${a.year}`) } : {}),
    },
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: base.name, url: `${siteConfig.url}${base.href}` },
      { name: book.title, url },
    ]),
  ];

  const facts: Array<[string, React.ReactNode]> = [
    ["Éditeur", book.publisher],
    ["Première parution", book.year],
    ...(book.originalLanguage ? ([["Langue d'origine", book.originalLanguage]] as Array<[string, React.ReactNode]>) : []),
    ...(trans ? ([["Traduction", trans.name]] as Array<[string, React.ReactNode]>) : []),
    ...(book.pages ? ([["Pages", book.pages]] as Array<[string, React.ReactNode]>) : []),
    ...(book.format ? ([["Format", { poche: "Poche", "grand-format": "Grand format", album: "Album" }[book.format]]] as Array<[string, React.ReactNode]>) : []),
    ...(book.isbn ? ([["ISBN", book.isbn]] as Array<[string, React.ReactNode]>) : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: base.name, href: base.href }, { name: book.title }]} />

      {/* 1 à 5 : couverture, titre, auteurs, pays, genre, achat */}
      <div className="container-page mt-6 grid gap-8 md:grid-cols-[260px_1fr] lg:gap-12">
        <div className="mx-auto w-48 md:w-full">
          <BookCover title={book.title} creators={names} cover={book.cover} />
        </div>
        <div>
          <p className="text-sm text-accent">
            <Link href={`${filterBase}?genre=${book.genre}`} className="hover:underline">
              {GENRES[book.genre]}
            </Link>{" "}
            · {AUDIENCES[book.audience]}
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight font-bold sm:text-5xl">{book.title}</h1>
          {book.subtitle && <p className="mt-2 font-serif text-xl text-muted">{book.subtitle}</p>}
          <p className="mt-4 text-lg">
            {creators(book).map((c, i) => (
              <span key={c.name}>
                {i > 0 && (isBd ? " · " : ", ")}
                {ROLE_LABEL[c.role] && <span className="text-muted">{ROLE_LABEL[c.role]} : </span>}
                {c.authorSlug ? (
                  <Link href={`/auteur/${c.authorSlug}`} className="font-semibold underline-offset-2 hover:underline">
                    {c.name}
                  </Link>
                ) : (
                  <span className="font-semibold">{c.name}</span>
                )}
              </span>
            ))}
          </p>
          {country && (
            <p className="mt-1 text-muted">
              <Link href={`/pays/${country.slug}`} className="hover:text-ink hover:underline">
                {country.name}
              </Link>
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <AmazonButton href={buyUrl} priceCents={book.priceCents} />
            <PileButton slug={book.slug} />
          </div>
          {book.priceCents != null && <p className="mt-2 text-xs text-muted">Prix indicatif : le prix affiché sur Amazon fait foi ({formatPrice(book.priceCents)}).</p>}

          {/* 6. Résumé */}
          <section className="mt-8" aria-labelledby="resume">
            <h2 id="resume" className="font-serif text-xl font-semibold">
              Résumé
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed">{book.summary}</p>
          </section>

          {/* 7. Pourquoi le lire */}
          <section className="mt-8" aria-labelledby="pourquoi">
            <h2 id="pourquoi" className="font-serif text-xl font-semibold">
              Pourquoi le lire
            </h2>
            <ul className="mt-2 max-w-2xl list-disc space-y-1 pl-5">
              {book.whyRead.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>

          {/* 8. Citation */}
          {book.quote && (
            <figure className="mt-8 max-w-2xl border-l-4 border-accent pl-4">
              <blockquote className="font-serif text-lg italic">« {book.quote.text} »</blockquote>
              <figcaption className="mt-1 text-sm text-muted">
                — {names}, <cite>{book.title}</cite>
                {book.quote.source ? `, ${book.quote.source}` : ""}
              </figcaption>
            </figure>
          )}

          {/* BD : planches autorisées */}
          {isBd && book.plates && book.plates.length > 0 && (
            <section className="mt-8" aria-labelledby="planches">
              <h2 id="planches" className="font-serif text-xl font-semibold">
                Planches
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {book.plates.map((p, i) => (
                  <img key={p} src={withBase(p)} alt={`${book.title}, planche ${i + 1}`} className="rounded-md border border-line" loading="lazy" />
                ))}
              </div>
            </section>
          )}

          {/* 9, 10, 11, 12 : fiche technique, prix, thèmes, public */}
          <div className="mt-8 grid max-w-2xl gap-6 sm:grid-cols-2">
            <section aria-labelledby="fiche">
              <h2 id="fiche" className="font-serif text-xl font-semibold">
                Fiche technique
              </h2>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <dt className="text-muted">Public</dt>
                <dd>{AUDIENCES[book.audience]}</dd>
              </dl>
            </section>
            <div className="space-y-6">
              {book.awards.length > 0 && (
                <section aria-labelledby="prix">
                  <h2 id="prix" className="font-serif text-xl font-semibold">
                    Prix littéraires
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm">
                    {book.awards.map((a) => (
                      <li key={`${a.name}-${a.year}`}>
                        {a.name} {a.year}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section aria-labelledby="themes">
                <h2 id="themes" className="font-serif text-xl font-semibold">
                  Thèmes
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {book.themes.map((t) => (
                    <Link key={t} href={`${filterBase}?theme=${t}`} className="tag">
                      {THEMES[t]}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* 14. Du même auteur */}
      {sameAuthor.length > 0 && (
        <Section title={authors.length === 1 ? `Du même auteur` : "Des mêmes auteurs"} href={authors.length === 1 ? `/auteur/${authors[0].slug}` : undefined} linkLabel="Voir la fiche auteur">
          <BookGrid books={await toCards(sameAuthor.slice(0, 5))} />
        </Section>
      )}

      {/* 15. Vous aimerez aussi */}
      {related.length > 0 && (
        <Section title="Vous aimerez aussi">
          <BookGrid books={await toCards(related)} />
        </Section>
      )}

      {/* 16. Conseils liés */}
      {conseils.length > 0 && (
        <Section title="Dans nos conseils" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

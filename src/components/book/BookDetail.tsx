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
import { AuthorAvatar } from "./AuthorAvatar";
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
  const photoOf = new Map(authors.map((a) => [a.slug, a.photo]));

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
      authors[0] ? { name: authors[0].name, url: `${siteConfig.url}/auteur/${authors[0].slug}` } : { name: base.name, url: `${siteConfig.url}${base.href}` },
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
    ["Public", AUDIENCES[book.audience]],
    ...(book.isbn ? ([["ISBN", book.isbn]] as Array<[string, React.ReactNode]>) : []),
  ];

  const halo = isBd ? "bg-[radial-gradient(120%_80%_at_50%_30%,#3d3518_0%,var(--color-paper)_70%)]" : "bg-[radial-gradient(120%_80%_at_50%_30%,#3b2f22_0%,var(--color-paper)_70%)]";
  const buy = (
    <>
      <div className="flex flex-col gap-2">
        <AmazonButton href={buyUrl} priceCents={book.priceCents} className="py-4 text-[15px]" />
        <PileButton slug={book.slug} className="py-3.5 text-[15px]" />
      </div>
      {book.priceCents != null && <p className="mt-2 text-xs text-faint">Prix indicatif : le prix affiché sur Amazon fait foi ({formatPrice(book.priceCents)}).</p>}
    </>
  );
  const factList = (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-left text-[13px] sm:grid-cols-3 md:grid-cols-2">
      {facts.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[11px] text-faint">{k}</dt>
          <dd className="mt-0.5">{v}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <Breadcrumb items={[{ name: "Accueil", href: "/" }, authors[0] ? { name: authors[0].name, href: `/auteur/${authors[0].slug}` } : { name: base.name, href: base.href }, { name: book.title }]} />

      {/* Mobile : une colonne centrée. iPad et ordinateur : couverture, achat et fiche technique à gauche, texte à droite. */}
      <div className="container-page md:mt-6 md:grid md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          {/* 1. Couverture sur halo */}
          <div className={`-mx-5 px-5 py-10 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-xl md:px-5 md:py-6 ${halo}`}>
            <div className={`mx-auto md:w-full ${isBd ? "w-56 sm:w-64" : "w-52 sm:w-60"}`}>
              <BookCover title={book.title} creators={names} cover={book.cover} illustration={book.illustration} className="shadow-2xl shadow-black/70" priority />
            </div>
            {/* Honnêteté envers l'acheteur : l'illustration n'est pas la couverture de l'édition vendue. */}
            {!book.cover && book.illustration && (
              <p className="mx-auto mt-4 max-w-60 text-center text-[11px] leading-snug text-faint md:max-w-none">
                Couverture illustrée par Keurbook. L&apos;édition vendue sur Amazon a sa propre couverture.
              </p>
            )}
          </div>
          <div className="hidden md:mt-5 md:block">
            {buy}
            <div className="mt-6">{factList}</div>
          </div>
        </div>

        <div>
          {/* 2 à 5 : genre, pays, titre, auteurs, achat */}
          <div className="text-center md:text-left">
            <p className="eyebrow">
              <Link href={`${filterBase}?genre=${book.genre}`} className="hover:text-ink">
                {GENRES[book.genre]}
              </Link>
              {country && (
                <>
                  {" · "}
                  <Link href={`/pays/${country.slug}`} className="underline underline-offset-4 hover:text-ink">
                    {country.name}
                  </Link>
                </>
              )}
              {` · ${book.year} · ${AUDIENCES[book.audience]}`}
            </p>
            <h1 className="mt-3 font-serif text-[44px] leading-none text-balance sm:text-6xl lg:text-7xl">{book.title}</h1>
            {book.subtitle && <p className="mt-2 font-serif text-xl text-muted italic">{book.subtitle}</p>}

            {isBd ? (
              <div className="mx-auto mt-6 grid max-w-md gap-2.5 text-left sm:grid-cols-2 md:mx-0">
                {creators(book).map((c) => {
                  const inner = (
                    <>
                      <AuthorAvatar name={c.name} photo={c.authorSlug ? (photoOf.get(c.authorSlug) ?? null) : null} className="size-11 text-base" />
                      <span>
                        <span className="eyebrow block text-[10px]">{ROLE_LABEL[c.role] || "Auteur"}</span>
                        <span className="block font-serif text-lg leading-[1.05]">{c.name}</span>
                      </span>
                    </>
                  );
                  return c.authorSlug ? (
                    <Link key={c.name} href={`/auteur/${c.authorSlug}`} className="flex items-center gap-3 rounded-xl bg-white p-3 hover:text-accent">
                      {inner}
                    </Link>
                  ) : (
                    <div key={c.name} className="flex items-center gap-3 rounded-xl bg-white p-3">
                      {inner}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 text-[15px] text-ink/80 md:text-base">
                {creators(book).map((c, i) => (
                  <span key={c.name}>
                    {i > 0 && ", "}
                    {c.authorSlug ? (
                      <Link href={`/auteur/${c.authorSlug}`} className="underline underline-offset-4 hover:text-accent">
                        {c.name}
                      </Link>
                    ) : (
                      c.name
                    )}
                  </span>
                ))}
              </p>
            )}

            <div className="mx-auto mt-6 max-w-md md:hidden">{buy}</div>
          </div>

          {/* 6. Résumé */}
          <section aria-labelledby="resume">
            <h2 id="resume" className="sr-only">
              Résumé
            </h2>
            <p className="mt-10 font-serif text-[22px] leading-[1.35] text-pretty text-ink/90 sm:text-[26px] md:mt-8">{book.summary}</p>
          </section>

          {/* 7. Pourquoi le lire */}
          <section className="mt-10" aria-labelledby="pourquoi">
            <h2 id="pourquoi" className="eyebrow">
              Pourquoi le lire
            </h2>
            <ul className="mt-2">
              {book.whyRead.map((w) => (
                <li key={w} className="border-b border-line py-4 text-[15px] leading-relaxed text-ink/80">
                  {w}
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Citation */}
          {book.quote && (
            <figure className="mt-10 border-l border-accent pl-5">
              <blockquote className="font-serif text-2xl leading-snug italic">« {book.quote.text} »</blockquote>
              <figcaption className="mt-2 text-[13px] text-muted">
                {names}, <cite>{book.title}</cite>
                {book.quote.source ? `, ${book.quote.source}` : ""}
              </figcaption>
            </figure>
          )}

          {/* BD : planches autorisées */}
          {isBd && book.plates && book.plates.length > 0 && (
            <section className="mt-10" aria-labelledby="planches">
              <h2 id="planches" className="eyebrow">
                Planches
              </h2>
              <div className="-mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
                {book.plates.map((p, i) => (
                  <img key={p} src={withBase(p)} alt={`${book.title}, planche ${i + 1}`} className="h-72 w-auto shrink-0 snap-start rounded-md sm:h-96" loading="lazy" />
                ))}
              </div>
            </section>
          )}

          {/* 9. Fiche technique (mobile ; à gauche sur iPad et ordinateur) */}
          <div className="mt-10 md:hidden">{factList}</div>

          {/* 10. Prix littéraires */}
          {book.awards.length > 0 && (
            <section className="mt-8 space-y-2" aria-labelledby="prix">
              <h2 id="prix" className="sr-only">
                Prix littéraires
              </h2>
              {book.awards.map((a) => (
                <p key={`${a.name}-${a.year}`} className="flex items-center gap-4 rounded-md border border-line-strong p-4 font-serif text-[22px] leading-tight">
                  <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    {a.name} <span className="text-faint">{a.year}</span>
                  </span>
                </p>
              ))}
            </section>
          )}

          {/* 11. Thèmes */}
          <section className="mt-8" aria-labelledby="themes">
            <h2 id="themes" className="sr-only">
              Thèmes
            </h2>
            <div className="flex flex-wrap gap-2">
              {book.themes.map((t) => (
                <Link key={t} href={`${filterBase}?theme=${t}`} className="tag">
                  {THEMES[t]}
                </Link>
              ))}
            </div>
          </section>
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

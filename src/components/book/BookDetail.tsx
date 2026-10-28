/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import Link from "next/link";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb, Section } from "@/components/layout/Section";
import { PileButton } from "@/components/pile/PileButton";
import { amazonUrl } from "@/lib/amazon";
import { creatorNames, creators, deOrD, translator } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
import { getBookAuthors, getBookCountry, getBooksByAuthor, getNeighbourBooks, getRelatedBooks, toCards } from "@/lib/data/books";
import { ALireAussi } from "@/components/layout/ALireAussi";
import { getConseilsForBooks } from "@/lib/data/conseils";
import { getTop10sOfBook } from "@/lib/data/top10";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { AUDIENCES, GENRES, THEMES } from "@/lib/themes";
import type { Book } from "@/lib/types";
import { AdSlot } from "@/components/ads/AdSlot";
import { AmazonButton, AmazonNote } from "./AmazonButton";
import { AuthorAvatar } from "./AuthorAvatar";
import { BookGrid } from "./BookCard";
import { BookCover } from "./BookCover";

const ROLE_LABEL = { auteur: "", scenariste: "Scénario", dessinateur: "Dessin", traducteur: "Traduction" } as const;

/** Fiche livre ou BD (même contenu ; la BD distingue scénariste et dessinateur et peut montrer des planches). */
export async function BookDetail({ book }: { book: Book }) {
  const isBd = book.kind === "bd";
  const base = isBd ? { name: "BD", href: "/bd", path: `/bd/${book.slug}` } : { name: "Livres", href: "/livres", path: `/livre/${book.slug}` };
  const [country, authors, related, neighbours] = await Promise.all([getBookCountry(book), getBookAuthors(book), getRelatedBooks(book), getNeighbourBooks(book)]);
  const sameAuthor = (await Promise.all(authors.map((a) => getBooksByAuthor(a.slug))))
    .flat()
    .filter((b, i, all) => b.slug !== book.slug && all.findIndex((x) => x.slug === b.slug) === i);
  const conseils = getConseilsForBooks([book.slug]).slice(0, 3);
  const tops = getTop10sOfBook(book.slug);
  const names = creatorNames(book);
  const trans = translator(book);
  const buyUrl = amazonUrl(book, "fiche");
  const url = `${siteConfig.url}${base.path}`;
  const filterBase = isBd ? "/bd" : "/livres";
  const photoOf = new Map(authors.map((a) => [a.slug, a.photo]));
  // Place du livre dans l'œuvre de l'auteur (ordre de parution) : texte propre à chaque fiche, et liens vers les livres voisins.
  const author = authors.length === 1 ? authors[0] : null;
  const oeuvre = author ? [book, ...sameAuthor].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title, "fr")) : [];
  const rank = oeuvre.indexOf(book);
  const before = rank > 0 ? oeuvre[rank - 1] : null;
  const after = rank >= 0 && rank < oeuvre.length - 1 ? oeuvre[rank + 1] : null;
  const bookLink = (b: Book) => (
    <Link href={b.kind === "bd" ? `/bd/${b.slug}` : `/livre/${b.slug}`} className="underline underline-offset-4 hover:text-accent">
      <i>{b.title}</i>
    </Link>
  );

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
    ...(book.editionTitle ? ([["Édition conseillée", book.editionTitle]] as Array<[string, React.ReactNode]>) : []),
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
        <div>
          <AmazonButton href={buyUrl} title={book.title} className="w-full py-4 text-[15px]" />
          <AmazonNote illustrated={!book.cover && !!book.illustration} />
        </div>
        <PileButton slug={book.slug} className="py-3.5 text-[15px]" />
      </div>
      {book.outOfPrint && <p className="mt-2 text-xs text-muted">Épuisé chez l&apos;éditeur ; on le trouve d&apos;occasion.</p>}
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
              <BookCover title={book.title} creators={names} cover={book.cover} illustration={book.illustration} className="shadow-2xl shadow-black/70" priority sizes="(min-width: 1024px) 280px, 240px" />
            </div>
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
              <Link href={`${filterBase}?genre=${book.genre}`} prefetch={false} className="hover:text-ink">
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

          {/* Top 10 dont le livre fait partie (liens internes) */}
          {tops.length > 0 && (
            <ul className="mx-auto mt-8 max-w-md space-y-2 md:mx-0">
              {tops.map(({ top, rank }) => (
                <li key={top.slug}>
                  <Link href={`/top-10/${top.slug}`} className="flex items-center gap-3 rounded-xl border border-line-strong p-3.5 text-[14px] leading-snug hover:border-ink hover:text-accent">
                    <span aria-hidden className="font-serif text-2xl leading-none text-accent">
                      {rank}
                    </span>
                    <span>
                      Ce livre est n°&nbsp;{rank} du <span className="underline underline-offset-4">{top.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

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

          {/* Le livre en détail (texte long, src/lib/demo/analyses) */}
          {book.analysis && (
            <section className="mt-10" aria-labelledby="detail">
              <h2 id="detail" className="eyebrow">
                Le livre en détail
              </h2>
              {(
                [
                  ["Le contexte", book.analysis.contexte],
                  ["Les thèmes et l'écriture", book.analysis.ecriture],
                  ["À qui le conseiller", book.analysis.aQui],
                ] as const
              ).map(([titre, texte]) => (
                <div key={titre} className="mt-5">
                  <h3 className="font-serif text-[19px] text-ink">{titre}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-pretty text-ink/80">{texte}</p>
                </div>
              ))}
            </section>
          )}

          {/* Dans l'œuvre de l'auteur */}
          {author && oeuvre.length > 1 && (
            <section className="mt-10" aria-labelledby="oeuvre">
              <h2 id="oeuvre" className="eyebrow">
                Dans l&apos;œuvre {deOrD(author.name)}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                <i>{book.title}</i> ({GENRES[book.genre].toLowerCase()}, {book.year}) est l&apos;un des {oeuvre.length} livres {deOrD(author.name).startsWith("d'") ? "d'" : "de "}
                <Link href={`/auteur/${author.slug}`} className="underline underline-offset-4 hover:text-accent">
                  {author.name}
                </Link>{" "}
                présentés sur Keurbook
                {rank === 0 ? ", et le plus ancien d'entre eux" : rank === oeuvre.length - 1 ? ", et le plus récent d'entre eux" : ""}.
                {before && (
                  <>
                    {" "}Il vient après {bookLink(before)} ({before.year})
                    {after ? (
                      <>
                        {" "}et avant {bookLink(after)} ({after.year}).
                      </>
                    ) : (
                      "."
                    )}
                  </>
                )}
                {!before && after && (
                  <>
                    {" "}Le suivant est {bookLink(after)} ({after.year}).
                  </>
                )}
              </p>
            </section>
          )}

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

          {/* Adaptations (cinéma, théâtre, BD…) */}
          {book.adaptations && book.adaptations.length > 0 && (
            <section className="mt-8" aria-labelledby="adaptations">
              <h2 id="adaptations" className="eyebrow">
                Adapté
              </h2>
              <ul className="mt-3 space-y-2">
                {book.adaptations.map((a) => (
                  <li key={`${a.kind}-${a.title}-${a.year}`} className="flex items-baseline gap-3 rounded-md border border-line-strong p-4">
                    <span className="shrink-0 text-[11px] tracking-[0.14em] text-accent uppercase">{a.kind}</span>
                    <span className="font-serif text-xl leading-tight">
                      <i>{a.title}</i> <span className="text-faint">{a.year}</span>
                      {a.by && <span className="block text-sm text-muted not-italic">{a.by}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 11. Thèmes */}
          <section className="mt-8" aria-labelledby="themes">
            <h2 id="themes" className="sr-only">
              Thèmes
            </h2>
            <div className="flex flex-wrap gap-2">
              {book.themes.map((t) => (
                <Link key={t} href={`${filterBase}?theme=${t}`} prefetch={false} className="tag">
                  {THEMES[t]}
                </Link>
              ))}
            </div>
          </section>

          {/* Publicité : en fin de fiche, loin du bouton Amazon (en haut de page). */}
          <AdSlot placement="fiche" />
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

      {/* Fiches voisines en boucle : chaque fiche reçoit au moins 3 liens d'autres fiches. */}
      <ALireAussi liens={neighbours.map((b) => ({ href: b.kind === "bd" ? `/bd/${b.slug}` : `/livre/${b.slug}`, nom: b.title, detail: creatorNames(b) }))} />

      {/* 16. Conseils liés */}
      {conseils.length > 0 && (
        <Section title="Dans nos conseils" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

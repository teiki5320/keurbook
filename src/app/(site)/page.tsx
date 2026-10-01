/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import type { Metadata } from "next";
import Link from "next/link";
import { BookRow } from "@/components/book/BookCard";
import { BookCover } from "@/components/book/BookCover";
import { AuthorAvatar } from "@/components/book/AuthorAvatar";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { bookPath, creatorNames, lifeYears } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
import { getAuthors, getBookAuthors, getBookCountry, getBooks, getBooksByAuthor, getCountriesWithBooks, getCountry, toCards } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { GENRES } from "@/lib/themes";
import type { Genre } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Genres présentés en carrousel sur l'accueil, dans cet ordre. */
const HOME_GENRES: Genre[] = ["roman", "poesie", "essai", "recit", "contes", "jeunesse", "nouvelles", "theatre"];

/** « Auteur à découvrir » : change chaque semaine (numéro de semaine au moment du build, republié chaque lundi). */
function weekNumber(d = new Date()) {
  return Math.floor(d.getTime() / (7 * 24 * 3600 * 1000));
}

export default async function HomePage() {
  if (getMaintenance().enabled) return null;
  const [livres, bd, countries, authors] = await Promise.all([getBooks("livre"), getBooks("bd"), getCountriesWithBooks(), getAuthors()]);
  const featured = livres.filter((b) => b.featured);
  const hero = featured[0] ?? livres[0] ?? null;
  const heroAuthors = hero ? await getBookAuthors(hero) : [];
  const heroPhoto = heroAuthors.find((a) => a.photo)?.photo ?? null;
  const heroCountry = hero ? await getBookCountry(hero) : null;
  const heroAward = hero?.awards[0] ?? null;
  const newest = livres.slice(0, 10);
  const conseils = getConseils().slice(0, 3);
  const byCount = [...countries].sort((a, b) => b.books + b.bd - (a.books + a.bd));
  const withBooks = (await Promise.all(authors.map(async (a) => ({ a, n: (await getBooksByAuthor(a.slug)).length })))).filter((x) => x.n > 0);
  const spotlight = withBooks.length ? withBooks[weekNumber() % withBooks.length].a : null;
  const spotlightBooks = spotlight ? await getBooksByAuthor(spotlight.slug) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "fr" }),
        }}
      />

      {/* 1. À la une : portrait pleine largeur */}
      {hero && (
        <section className="relative h-[72svh] max-h-[820px] min-h-[500px] overflow-hidden">
          {heroPhoto ? (
            <img src={withBase(heroPhoto)} alt="" className="absolute inset-0 size-full object-cover object-top brightness-75 grayscale-[30%]" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(120%_80%_at_50%_30%,#3b2f22_0%,var(--color-paper)_70%)]">
              <div className="w-48 sm:w-60">
                <BookCover title={hero.title} creators={creatorNames(hero)} cover={hero.cover} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-b from-paper/40 via-transparent via-40% to-paper" />
          <div className="container-page relative flex h-full flex-col justify-end pb-8">
            <p className="eyebrow">À la une{heroAward ? ` · ${heroAward.name} ${heroAward.year}` : ""}</p>
            <Link href={bookPath(hero)} className="mt-3 max-w-3xl font-serif text-[46px] leading-[0.98] italic hover:text-accent sm:text-7xl">
              {hero.title}
            </Link>
            <p className="mt-3 text-sm text-ink/80">
              {creatorNames(hero)}
              {heroCountry ? ` · ${heroCountry.name}` : ""}
            </p>
          </div>
        </section>
      )}

      {/* 2. Accroche */}
      <section className="container-page pt-4">
        <h1 className="max-w-2xl font-serif text-[26px] leading-[1.15] text-ink/80 sm:text-4xl">Les livres des auteurs d&apos;Afrique subsaharienne, en français.</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Romans, poésie, essais, jeunesse et BD : des résumés, des fiches auteurs, la littérature de chaque pays et nos conseils pour choisir votre prochain livre.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/livres" className="btn-primary">
            Voir les livres
          </Link>
          <Link href="/conseils" className="btn-secondary">
            Par où commencer ?
          </Link>
        </div>
      </section>

      {/* 3. Nouveautés */}
      <Section title="Nouveautés" href="/livres">
        <BookRow books={await toCards(newest)} />
      </Section>

      {/* 4. Voyager par pays */}
      {byCount.length > 0 && (
        <section className="container-page mt-16">
          <div className="border-y border-line py-6">
            <p className="eyebrow">Voyager par pays</p>
            <p className="mt-4 font-serif text-[30px] leading-[1.25] text-faint sm:text-4xl">
              {byCount.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && " · "}
                  <Link href={`/pays/${c.slug}`} className={i % 2 === 0 ? "text-ink hover:text-accent" : "hover:text-ink"}>
                    {c.name}
                  </Link>
                </span>
              ))}
            </p>
            <Link href="/pays" className="mt-4 inline-block text-[13px] text-accent hover:text-ink">
              Ouvrir la carte →
            </Link>
          </div>
        </section>
      )}

      {/* 5. Auteur à découvrir */}
      {spotlight && (
        <section className="container-page mt-12">
          <Link href={`/auteur/${spotlight.slug}`} className="group grid grid-cols-2 items-end gap-4 sm:grid-cols-[300px_1fr] sm:gap-10">
            {spotlight.photo ? (
              <img src={withBase(spotlight.photo)} alt="" className="h-52 w-full rounded object-cover object-top grayscale-[40%] sm:h-96" loading="lazy" />
            ) : (
              <AuthorAvatar name={spotlight.name} photo={null} className="size-40 text-5xl" />
            )}
            <div className="pb-1">
              <p className="eyebrow">Auteur à découvrir</p>
              <p className="mt-2 font-serif text-[34px] leading-none group-hover:text-accent sm:text-6xl">{spotlight.name}</p>
              <p className="mt-2 text-[13px] text-muted">
                {getCountry(spotlight.countryCode)?.name}
                {lifeYears(spotlight) ? ` · ${lifeYears(spotlight)}` : ""}
              </p>
              <p className="mt-5 hidden max-w-xl font-serif text-xl leading-snug text-ink/80 sm:line-clamp-4">{spotlight.bio}</p>
            </div>
          </Link>
          {spotlightBooks.length > 0 && (
            <p className="mt-4 text-[13px] text-muted">
              À lire :{" "}
              {spotlightBooks.map((b, i) => (
                <span key={b.slug}>
                  {i > 0 && ", "}
                  <Link href={bookPath(b)} className="font-serif text-base text-ink italic hover:text-accent">
                    {b.title}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </section>
      )}

      {/* 6. Un carrousel par genre */}
      {await Promise.all(
        HOME_GENRES.map(async (g) => {
          const list = livres.filter((b) => b.genre === g);
          if (list.length < 2) return null;
          return (
            <Section key={g} title={GENRES[g]} href={`/livres?genre=${g}`}>
              <BookRow books={await toCards(list)} />
            </Section>
          );
        }),
      )}

      {/* 7. BD */}
      {bd.length > 0 && (
        <Section title="Bandes dessinées" href="/bd">
          <BookRow books={await toCards(bd)} />
        </Section>
      )}

      {/* 8. Derniers conseils */}
      {conseils.length > 0 && (
        <Section title="Conseils" href="/conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

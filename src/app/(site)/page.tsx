import type { Metadata } from "next";
import Link from "next/link";
import { BookGrid, BookRow } from "@/components/book/BookCard";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { CountryMap } from "@/components/map/CountryMap";
import { initials, lifeYears } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAuthors, getBooks, getBooksByAuthor, getCountriesWithBooks, getCountry, toCards } from "@/lib/data/books";
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
  const featured = livres.filter((b) => b.featured).slice(0, 5);
  const newest = livres.slice(0, 10);
  const conseils = getConseils().slice(0, 3);
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
      {/* 1, 2 : accroche et carte */}
      <section className="container-page grid items-center gap-10 pt-10 lg:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-6xl">Les livres des auteurs d&apos;Afrique subsaharienne, en français</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Romans, poésie, essais, jeunesse et BD : des résumés, des fiches auteurs, la littérature de chaque pays et nos conseils pour choisir votre prochain livre.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/livres" className="btn-primary">
              Voir les livres
            </Link>
            <Link href="/conseils" className="btn-secondary">
              Par où commencer ?
            </Link>
          </div>
        </div>
        <CountryMap countries={countries} />
      </section>

      {/* 3. À la une */}
      {featured.length > 0 && (
        <Section title="À la une" href="/livres">
          <BookGrid books={await toCards(featured)} showBuy />
        </Section>
      )}

      {/* 4. Nouveautés */}
      <Section title="Nouveautés" href="/livres">
        <BookRow books={await toCards(newest)} />
      </Section>

      {/* 5. Un carrousel par genre */}
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

      {/* 6. BD */}
      {bd.length > 0 && (
        <Section title="BD" href="/bd">
          <BookRow books={await toCards(bd)} />
        </Section>
      )}

      {/* 7. Auteur à découvrir */}
      {spotlight && (
        <Section title="Auteur à découvrir" href={`/auteur/${spotlight.slug}`} linkLabel="Voir sa fiche">
          <div className="grid gap-6 rounded-xl border border-line bg-white p-6 md:grid-cols-[auto_1fr]">
            <span aria-hidden className="flex size-24 items-center justify-center rounded-full bg-accent-soft font-serif text-3xl font-bold">
              {initials(spotlight.name)}
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold">
                <Link href={`/auteur/${spotlight.slug}`} className="hover:text-accent">
                  {spotlight.name}
                </Link>
              </p>
              <p className="text-sm text-muted">
                {getCountry(spotlight.countryCode)?.name}
                {lifeYears(spotlight) ? ` · ${lifeYears(spotlight)}` : ""}
              </p>
              <p className="mt-3 max-w-2xl">{spotlight.bio}</p>
              <p className="mt-3 text-sm">
                À lire :{" "}
                {spotlightBooks.map((b, i) => (
                  <span key={b.slug}>
                    {i > 0 && ", "}
                    <Link href={b.kind === "bd" ? `/bd/${b.slug}` : `/livre/${b.slug}`} className="underline hover:text-accent">
                      {b.title}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Section>
      )}

      {/* 8. Derniers conseils */}
      {conseils.length > 0 && (
        <Section title="Derniers conseils" href="/conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

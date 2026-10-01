/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import type { Metadata } from "next";
import Link from "next/link";
import { AuthorTile } from "@/components/book/AuthorAvatar";
import { CountryCarousel } from "@/components/carousel/CountryCarousel";
import { BookRow } from "@/components/book/BookCard";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { SECONDARY_NAV } from "@/components/layout/nav";
import { lifeYears } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
import { getAllBooks, getAuthorGenerations, getAuthors, getBooksByAuthor, getCountriesWithBooks, getCountry, toCards } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { todayInParis } from "@/lib/conseils/article";
import { getMaintenance } from "@/lib/data/settings";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Accueil : une ode aux écrivains. Les auteurs d'abord, rangés par grandes époques ; leurs livres sont sur leur fiche. */
export default async function HomePage() {
  if (getMaintenance().enabled) return null;
  const [generations, authors, countries] = await Promise.all([getAuthorGenerations(), getAuthors(), getCountriesWithBooks()]);
  const conseils = getConseils().slice(0, 3);
  // Étagère « À lire maintenant » : 12 livres illustrés, une sélection qui change chaque semaine
  // (le site est reconstruit chaque lundi).
  const week = Math.floor(Date.parse(todayInParis()) / (7 * 24 * 3600 * 1000));
  const score = (slug: string) => [...`${slug}${week}`].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const shelf = await toCards(
    (await getAllBooks())
      .filter((b) => b.illustration)
      .sort((a, b) => score(a.slug) - score(b.slug))
      .slice(0, 12),
  );
  // Carrousel des pays, comme sur la page Pays : d'ouest en est, en partant du Sénégal.
  const westToEast = [...countries].sort((a, b) => a.lon - b.lon);
  const startCountry = Math.max(0, westToEast.findIndex((c) => c.code === "SN"));
  // Mosaïque de l'ouverture : des portraits de toutes les époques, en alternance.
  const withPhoto = generations.map((g) => g.authors.filter((x) => x.author.photo).map((x) => x.author));
  const mosaic = Array.from({ length: 12 }, (_, i) => withPhoto[i % withPhoto.length]?.[Math.floor(i / withPhoto.length)]).filter((a) => a != null);
  const bookCount = (await Promise.all(authors.map((a) => getBooksByAuthor(a.slug)))).flat().filter((b, i, all) => all.findIndex((x) => x.slug === b.slug) === i).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "fr", description: siteConfig.description },
            { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/keurbook-logo.png`, email: siteConfig.contactEmail },
          ]),
        }}
      />

      {/* 1. Ouverture : mosaïque de portraits et dédicace */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
          {mosaic.map((a, i) => (
            <img
              key={a.slug}
              src={withBase(a.photo!)}
              alt=""
              loading={i < 6 ? "eager" : "lazy"}
              fetchPriority={i < 3 ? "high" : "low"}
              className="aspect-[3/4] w-full object-cover object-top brightness-[.55] grayscale"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-paper/30 via-paper/40 via-40% to-paper" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
          <p className="eyebrow">
            {authors.length} écrivains · {countries.length} pays · {bookCount} livres
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-[46px] leading-[0.95] sm:text-7xl lg:text-8xl">
            Une ode aux <i>écrivains</i> d&apos;Afrique subsaharienne
          </h1>
        </div>
      </section>

      <section className="container-page pt-6">
        <p className="max-w-2xl font-serif text-[22px] leading-[1.35] text-ink/80 sm:text-[26px]">
          Poètes, conteurs, romanciers, essayistes et dessinateurs : leurs vies, leurs combats, leurs œuvres. Choisissez un visage, découvrez son histoire, puis ses livres.
        </p>
      </section>

      {/* Étagère de couvertures : la couleur des livres dès l'arrivée */}
      {shelf.length > 0 && (
        <section className="container-page mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Cette semaine</p>
              <h2 className="mt-2 font-serif text-[34px] leading-none sm:text-5xl">À lire maintenant</h2>
            </div>
            <Link href="/livres" className="shrink-0 text-[13px] text-accent hover:text-ink">
              Tous les livres →
            </Link>
          </div>
          <BookRow books={shelf} />
        </section>
      )}

      {/* 2. La galerie, par grandes époques */}
      {generations.map((g) => (
        <section key={g.key} id={g.key} style={{ "--era": g.color } as React.CSSProperties} className="container-page mt-16 scroll-mt-20">
          <div className="reveal mb-6 border-b border-(--era)/40 pb-4 md:grid md:grid-cols-[1fr_1.2fr] md:items-end md:gap-10">
            <div>
              <p className="eyebrow text-(--era)">{g.period}</p>
              <h2 className="mt-2 font-serif text-[40px] leading-none sm:text-6xl">{g.name}</h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:mt-0">{g.intro}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {g.authors.map(({ author: a, isBd }) => (
              <li key={a.slug} className="reveal">
                <AuthorTile
                  slug={a.slug}
                  name={a.name}
                  photo={a.photo}
                  coverImage={a.coverImage}
                  subtitle={[getCountry(a.countryCode)?.name, lifeYears(a), isBd ? "BD" : null].filter(Boolean).join(" · ")}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="container-page mt-8 flex flex-wrap gap-2">
        <Link href="/auteurs" className="btn-secondary">
          Tous les auteurs de A à Z
        </Link>
        {SECONDARY_NAV.map((n) => (
          <Link key={n.href} href={n.href} className="btn-secondary">
            {n.label}
          </Link>
        ))}
      </section>

      {/* 3. Voyager par pays : le carrousel de la page Pays */}
      {westToEast.length > 0 && (
        <section className="container-page mt-20">
          <div className="reveal flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="eyebrow">Les écrivains, pays par pays</p>
              <h2 className="mt-2 font-serif text-[40px] leading-none sm:text-6xl">Traverser le continent</h2>
            </div>
            <Link href="/pays" className="shrink-0 text-[13px] text-accent hover:text-ink">
              Tous les pays →
            </Link>
          </div>
          <div className="mt-8">
            <CountryCarousel countries={westToEast} start={startCountry} />
          </div>
        </section>
      )}

      {/* 4. Derniers conseils */}
      {conseils.length > 0 && (
        <Section title="Conseils" href="/conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

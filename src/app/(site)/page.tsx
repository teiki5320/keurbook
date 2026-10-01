/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import type { Metadata } from "next";
import Link from "next/link";
import { AuthorTile } from "@/components/book/AuthorAvatar";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { SECONDARY_NAV } from "@/components/layout/nav";
import { lifeYears } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
import { getAuthorGenerations, getAuthors, getBooksByAuthor, getCountriesWithBooks, getCountry } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
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
  const byCount = [...countries].sort((a, b) => b.authors - a.authors || a.name.localeCompare(b.name, "fr"));
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
          {mosaic.map((a) => (
            <img key={a.slug} src={withBase(a.photo!)} alt="" className="aspect-[3/4] w-full object-cover object-top brightness-[.55] grayscale" />
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

      {/* 2. La galerie, par grandes époques */}
      {generations.map((g) => (
        <section key={g.key} id={g.key} className="container-page mt-16 scroll-mt-20">
          <div className="mb-6 border-b border-line pb-4 md:grid md:grid-cols-[1fr_1.2fr] md:items-end md:gap-10">
            <div>
              <p className="eyebrow">{g.period}</p>
              <h2 className="mt-2 font-serif text-[40px] leading-none sm:text-6xl">{g.name}</h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:mt-0">{g.intro}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {g.authors.map(({ author: a, isBd }) => (
              <li key={a.slug}>
                <AuthorTile
                  slug={a.slug}
                  name={a.name}
                  photo={a.photo}
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

      {/* 3. Voyager par pays */}
      {byCount.length > 0 && (
        <section className="container-page mt-16">
          <div className="border-y border-line py-6">
            <p className="eyebrow">Les écrivains, pays par pays</p>
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

      {/* 4. Derniers conseils */}
      {conseils.length > 0 && (
        <Section title="Conseils" href="/conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

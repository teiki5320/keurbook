import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmazonButton } from "@/components/book/AmazonButton";
import { BookGrid } from "@/components/book/BookCard";
import { BookCover } from "@/components/book/BookCover";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { Coverflow } from "@/components/carousel/Coverflow";
import { CountryMap } from "@/components/map/CountryMap";
import { lifeYears } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAuthorsOfCountry, getBooksOfCountry, getCountriesWithBooks, getCountryBySlug, toCards } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { clip, pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return (await getCountriesWithBooks()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pays/[slug]">): Promise<Metadata> {
  const country = await getCountryBySlug((await params).slug);
  if (!country) return {};
  return pageMetadata({
    title: `${country.name} : écrivains et livres`,
    description: clip(`Livres et auteurs ${country.of}. ${country.description}`),
    path: `/pays/${country.slug}`,
  });
}

export default async function CountryPage({ params }: PageProps<"/pays/[slug]">) {
  if (getMaintenance().enabled) return null;
  const country = await getCountryBySlug((await params).slug);
  if (!country) notFound();
  const [all, authors, countries] = await Promise.all([getBooksOfCountry(country.code), getAuthorsOfCountry(country.code), getCountriesWithBooks()]);
  const livres = all.filter((b) => b.kind === "livre");
  const bd = all.filter((b) => b.kind === "bd");
  const start = country.startWith.flatMap((s) => all.filter((b) => b.slug === s));
  const startCards = await toCards(start);
  const slugs = new Set(all.map((b) => b.slug));
  const conseils = getConseils()
    .filter((c) => c.livres.some((s) => slugs.has(s)) || c.body.includes(`/pays/${country.slug}`))
    .slice(0, 3);
  const url = `${siteConfig.url}/pays/${country.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd([
              { name: "Accueil", url: siteConfig.url },
              { name: "Pays", url: `${siteConfig.url}/pays` },
              { name: country.name, url },
            ]),
          ),
        }}
      />

      <div className="container-page pt-5">
        <Link href="/pays" className="text-[13px] text-ink/85 hover:text-accent">
          ← Pays
        </Link>
      </div>

      {/* 1, 2 : carte, nom, présentation */}
      <div className="container-page mt-5 grid items-end gap-8 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px]">
        <div className="md:order-2">
          <CountryMap countries={countries} highlight={country.slug} />
        </div>
        <div>
          <p className="eyebrow">
            {livres.length} {livres.length > 1 ? "livres" : "livre"}
            {bd.length > 0 && ` · ${bd.length} BD`} · {authors.length} {authors.length > 1 ? "auteurs" : "auteur"}
          </p>
          <h1 className="mt-2 font-serif text-[72px] leading-[0.9] sm:text-8xl">
            <span className="sr-only">Littérature {country.of} : </span>
            {country.name}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-[22px] leading-[1.35] text-pretty text-ink/90 sm:text-[26px]">{country.description}</p>
        </div>
      </div>

      {/* 3. Les auteurs du pays, en premier : carrousel de portraits */}
      {authors.length > 0 && (
        <Section title={`Les écrivains ${country.of}`}>
          <Coverflow
            items={[...authors].sort((a, b) => (a.birthYear ?? 9999) - (b.birthYear ?? 9999)).map((a) => ({
              key: a.slug,
              title: a.name,
              eyebrow: lifeYears(a) || undefined,
              image: a.photo,
              href: `/auteur/${a.slug}`,
            }))}
          />
        </Section>
      )}

      {/* 4. Par où commencer */}
      {startCards.length > 0 && (
        <Section title="Par où commencer">
          <ol className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5">
            {startCards.map((b, i) => (
              <li key={b.slug} className="w-40 shrink-0 snap-start sm:w-auto">
                <Link href={b.path} className="group block">
                  <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} className="transition group-hover:-translate-y-1" />
                  <span className="mt-3 flex items-baseline gap-2">
                    <span className="font-serif text-3xl leading-none text-accent">{i + 1}</span>
                    <span className="font-serif text-lg leading-tight group-hover:text-accent">{b.title}</span>
                  </span>
                  <span className="mt-1 block text-xs text-muted">{b.creators}</span>
                </Link>
                <div className="mt-3">
                  <AmazonButton href={b.amazonUrl} priceCents={b.priceCents} small />
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 5. Livres */}
      {livres.length > 0 && (
        <Section title="Livres" href={`/livres?pays=${country.code}`}>
          <BookGrid books={await toCards(livres)} />
        </Section>
      )}

      {/* 6. BD */}
      {bd.length > 0 && (
        <Section title="Bandes dessinées" href={`/bd?pays=${country.code}`}>
          <BookGrid books={await toCards(bd)} />
        </Section>
      )}

      {/* 7. Conseils liés */}
      {conseils.length > 0 && (
        <Section title="Dans nos conseils" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

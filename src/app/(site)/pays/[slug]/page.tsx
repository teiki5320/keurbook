import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookGrid } from "@/components/book/BookCard";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb, Section } from "@/components/layout/Section";
import { CountryMap } from "@/components/map/CountryMap";
import { AuthorAvatar } from "@/components/book/AuthorAvatar";
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
    title: `Littérature ${country.of} : livres et auteurs`,
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
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Pays", href: "/pays" }, { name: country.name }]} />

      {/* 1, 2 : nom, carte, présentation */}
      <div className="container-page mt-6 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Littérature {country.of}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{country.description}</p>
          <p className="mt-4 text-sm text-muted">
            {livres.length} {livres.length > 1 ? "livres" : "livre"}
            {bd.length > 0 && ` · ${bd.length} BD`} · {authors.length} {authors.length > 1 ? "auteurs" : "auteur"}
          </p>
        </div>
        <CountryMap countries={countries} highlight={country.slug} />
      </div>

      {/* 3. Par où commencer */}
      {start.length > 0 && (
        <Section title="Par où commencer">
          <BookGrid books={await toCards(start)} showBuy />
        </Section>
      )}

      {/* 4. Auteurs */}
      {authors.length > 0 && (
        <Section title={`Auteurs ${country.of}`}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {authors.map((a) => (
              <li key={a.slug}>
                <Link href={`/auteur/${a.slug}`} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 hover:border-ink">
                  <AuthorAvatar name={a.name} photo={a.photo} />
                  <span className="font-semibold">{a.name}</span>
                </Link>
              </li>
            ))}
          </ul>
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
        <Section title="BD" href={`/bd?pays=${country.code}`}>
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

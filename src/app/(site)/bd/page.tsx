import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookGrid } from "@/components/book/BookCard";
import { BooksBrowser } from "@/components/browse/BooksBrowser";
import { EntryText, PageHeader } from "@/components/layout/Section";
import { bookPath, titleWithSubtitle } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAuthors, getBooks, getCountriesWithBooks, toCards } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "BD africaines",
  description: "Bandes dessinées d'auteurs d'Afrique subsaharienne, en français, pour les adultes, les ados et les enfants. Recherche par pays et par public.",
  path: "/bd",
});

export default async function BdListPage() {
  if (getMaintenance().enabled) return null;
  const [books, countries, authors] = await Promise.all([getBooks("bd"), getCountriesWithBooks(), getAuthors()]);
  const cards = await toCards(books);
  const bdAuthors = authors.filter((a) => books.some((b) => b.contributors.some((c) => c.authorSlug === a.slug))).length;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("BD africaines", books.map((b) => ({ name: titleWithSubtitle(b), url: `${siteConfig.url}${bookPath(b)}` })))) }}
      />
      <PageHeader title="BD" intro="Les bandes dessinées des auteurs et dessinateurs d'Afrique subsaharienne." />
      {/* Sans JavaScript (et pour les moteurs de recherche), la liste complète est déjà dans la page. */}
      <Suspense fallback={<div className="container-page"><BookGrid books={cards} /></div>}>
        <BooksBrowser books={cards} countries={countries.filter((c) => c.bd > 0)} simple />
      </Suspense>
      <EntryText title="La bande dessinée africaine, en français">
        <p>
          Keurbook présente {books.length} bandes dessinées signées par {bdAuthors} scénaristes et dessinateurs d&apos;Afrique subsaharienne et de sa diaspora : chroniques du quotidien,
          récits d&apos;histoire, polars, humour et albums pour les enfants. Chaque album a sa fiche, avec un résumé sans spoiler et le public auquel il s&apos;adresse.
        </p>
        <p>
          Le succès le plus connu est <Link href="/bd/aya-de-yopougon">Aya de Yopougon</Link>, de <Link href="/auteur/marguerite-abouet">Marguerite Abouet</Link> et Clément Oubrerie, qui raconte la jeunesse
          d&apos;Abidjan dans les années 1970 ; les plus jeunes lui préfèrent <Link href="/bd/akissi">Akissi</Link>. <Link href="/auteur/barly-baruti">Barly Baruti</Link>, pionnier de la BD congolaise, signe{" "}
          <Link href="/bd/madame-livingstone">Madame Livingstone</Link> ; <Link href="/auteur/didier-kassai">Didier Kassaï</Link> raconte la guerre en Centrafrique dans{" "}
          <Link href="/bd/tempete-sur-bangui">Tempête sur Bangui</Link> ; <Link href="/auteur/pahe">Pahé</Link> fait rire avec <Link href="/bd/la-vie-de-pahe">La Vie de Pahé</Link>.
        </p>
        <p>
          Filtrez par pays ou par public pour trouver l&apos;album qui vous convient, ou lisez notre conseil{" "}
          <Link href="/conseils/bd-africaines-adultes">Quelles BD africaines lire quand on est adulte ?</Link>. Romans, poésie et essais sont dans la rubrique <Link href="/livres">Livres</Link>.
        </p>
      </EntryText>
    </>
  );
}

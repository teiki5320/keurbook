import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookGrid } from "@/components/book/BookCard";
import { BooksBrowser } from "@/components/browse/BooksBrowser";
import { EntryText, PageHeader } from "@/components/layout/Section";
import { bookPath } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getBooks, getCountriesWithBooks, toCards } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Livres d'auteurs africains",
  description:
    "Romans, nouvelles, poésie, théâtre, essais et livres jeunesse d'auteurs d'Afrique subsaharienne, en français. Recherche par pays, genre, thème ou époque.",
  path: "/livres",
});

export default async function BooksPage() {
  if (getMaintenance().enabled) return null;
  const [books, countries] = await Promise.all([getBooks("livre"), getCountriesWithBooks()]);
  const cards = await toCards(books);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("Livres d'auteurs africains", books.map((b) => ({ name: b.title, url: `${siteConfig.url}${bookPath(b)}` })))) }}
      />
      <PageHeader title="Livres" intro="Romans, poésie, essais, théâtre et jeunesse : les livres des auteurs d'Afrique subsaharienne, en français." />
      {/* Sans JavaScript (et pour les moteurs de recherche), la liste complète est déjà dans la page. */}
      <Suspense fallback={<div className="container-page"><BookGrid books={cards} /></div>}>
        <BooksBrowser books={cards} countries={countries.filter((c) => c.books > 0)} />
      </Suspense>
      <EntryText title="Les livres d'Afrique subsaharienne, en français">
        <p>
          Keurbook rassemble {books.length} livres d&apos;auteurs nés en Afrique subsaharienne ou issus de sa diaspora, tous disponibles en français : romans, nouvelles, poésie, théâtre,
          essais, récits et livres pour la jeunesse. Chaque fiche présente le livre avec un résumé écrit par nous, sans dévoiler la fin, et dit en quelques mots pourquoi le lire.
        </p>
        <p>
          On y trouve les grands classiques, comme <Link href="/livre/une-si-longue-lettre">Une si longue lettre</Link> de Mariama Bâ, <Link href="/livre/l-aventure-ambigue">L&apos;Aventure ambiguë</Link> de Cheikh Hamidou Kane,{" "}
          <Link href="/livre/les-soleils-des-independances">Les Soleils des indépendances</Link> d&apos;Ahmadou Kourouma ou <Link href="/livre/le-monde-s-effondre">Le monde s&apos;effondre</Link> de Chinua Achebe, et les voix
          d&apos;aujourd&apos;hui : <Link href="/livre/la-plus-secrete-memoire-des-hommes">La plus secrète mémoire des hommes</Link> de Mohamed Mbougar Sarr, <Link href="/livre/petit-pays">Petit pays</Link> de Gaël Faye,{" "}
          <Link href="/livre/les-impatientes">Les Impatientes</Link> de Djaïli Amadou Amal ou <Link href="/livre/americanah">Americanah</Link> de Chimamanda Ngozi Adichie.
        </p>
        <p>
          Pour choisir, filtrez par pays, par genre, par thème ou par époque. Vous hésitez ? Commencez par notre conseil{" "}
          <Link href="/conseils/par-quel-livre-commencer">Par quel livre commencer pour découvrir la littérature africaine ?</Link>, parcourez les <Link href="/auteurs">auteurs</Link> de A à Z ou voyagez{" "}
          <Link href="/pays">pays par pays</Link>. Les bandes dessinées ont leur propre rubrique : <Link href="/bd">les BD africaines</Link>.
        </p>
      </EntryText>
    </>
  );
}

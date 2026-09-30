import type { Metadata } from "next";
import { Suspense } from "react";
import { BooksBrowser } from "@/components/browse/BooksBrowser";
import { PageHeader } from "@/components/layout/Section";
import { getBooks, getCountriesWithBooks, toCards } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
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
  return (
    <>
      <PageHeader title="Livres" intro="Romans, poésie, essais, théâtre et jeunesse : les livres des auteurs d'Afrique subsaharienne, en français." />
      <Suspense>
        <BooksBrowser books={await toCards(books)} countries={countries.filter((c) => c.books > 0)} />
      </Suspense>
    </>
  );
}

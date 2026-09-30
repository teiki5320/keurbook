import type { Metadata } from "next";
import { Suspense } from "react";
import { BooksBrowser } from "@/components/browse/BooksBrowser";
import { PageHeader } from "@/components/layout/Section";
import { getBooks, getCountriesWithBooks, toCards } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "BD africaines",
  description: "Bandes dessinées d'auteurs d'Afrique subsaharienne, en français, pour les adultes, les ados et les enfants. Recherche par pays et par public.",
  path: "/bd",
});

export default async function BdListPage() {
  if (getMaintenance().enabled) return null;
  const [books, countries] = await Promise.all([getBooks("bd"), getCountriesWithBooks()]);
  return (
    <>
      <PageHeader title="BD" intro="Les bandes dessinées des auteurs et dessinateurs d'Afrique subsaharienne." />
      <Suspense>
        <BooksBrowser books={await toCards(books)} countries={countries.filter((c) => c.bd > 0)} simple />
      </Suspense>
    </>
  );
}

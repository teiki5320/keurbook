import type { Metadata } from "next";
import { AuthorsBrowser } from "@/components/browse/AuthorsBrowser";
import { PageHeader } from "@/components/layout/Section";
import { lifeYears } from "@/lib/book-utils";
import { getAuthors, getBooksByAuthor, getCountriesWithBooks, getCountry } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Auteurs africains",
  description: "Écrivains, poètes, essayistes et auteurs de BD d'Afrique subsaharienne et de sa diaspora : biographies, livres et par où commencer.",
  path: "/auteurs",
});

export default async function AuthorsPage() {
  if (getMaintenance().enabled) return null;
  const [authors, countries] = await Promise.all([getAuthors(), getCountriesWithBooks()]);
  const items = await Promise.all(
    authors.map(async (a) => ({
      slug: a.slug,
      name: a.name,
      countryCode: a.countryCode,
      countryName: getCountry(a.countryCode)?.name ?? "",
      years: lifeYears(a),
      count: (await getBooksByAuthor(a.slug)).length,
    })),
  );
  return (
    <>
      <PageHeader title="Auteurs" intro="Les écrivains et dessinateurs d'Afrique subsaharienne et de sa diaspora présents sur Keurbook." />
      <AuthorsBrowser authors={items} countries={countries.filter((c) => c.authors > 0)} />
    </>
  );
}

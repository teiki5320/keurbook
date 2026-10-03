import type { Metadata } from "next";
import { AuthorsBrowser } from "@/components/browse/AuthorsBrowser";
import { PageHeader } from "@/components/layout/Section";
import { lifeYears } from "@/lib/book-utils";
import { getAuthors, getBooksByAuthor, getCountriesWithBooks, getCountry } from "@/lib/data/books";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
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
      photo: a.photo,
      count: (await getBooksByAuthor(a.slug)).length,
    })),
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("Auteurs africains", authors.map((a) => ({ name: a.name, url: `${siteConfig.url}/auteur/${a.slug}` })))) }}
      />
      <PageHeader title="Auteurs" intro="Tous les écrivains et dessinateurs d'Afrique subsaharienne et de sa diaspora, de A à Z." />
      <AuthorsBrowser authors={items} countries={countries.filter((c) => c.authors > 0)} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/Section";
import { CountryMap } from "@/components/map/CountryMap";
import { getCountriesWithBooks } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "La littérature africaine par pays",
  description: "Découvrez la littérature de chaque pays d'Afrique subsaharienne : grandes figures, livres pour commencer, auteurs et BD.",
  path: "/pays",
});

export default async function CountriesPage() {
  if (getMaintenance().enabled) return null;
  const countries = await getCountriesWithBooks();
  const sorted = [...countries].sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return (
    <>
      <PageHeader title="Pays" intro="La littérature d'Afrique subsaharienne, pays par pays." />
      <div className="container-page grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
        <CountryMap countries={countries} />
        <ul className="grid gap-2 sm:grid-cols-2">
          {sorted.map((c) => (
            <li key={c.code}>
              <Link href={`/pays/${c.slug}`} className="flex justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 hover:border-ink">
                <span className="font-semibold">{c.name}</span>
                <span className="text-sm text-muted">
                  {c.books + c.bd} {c.books + c.bd > 1 ? "titres" : "titre"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

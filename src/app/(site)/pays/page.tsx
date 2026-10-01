import type { Metadata } from "next";
import { CountryCarousel } from "@/components/carousel/CountryCarousel";
import { PageHeader } from "@/components/layout/Section";
import { getCountriesWithBooks } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "La littérature africaine par pays",
  description: "Découvrez les écrivains de chaque pays d'Afrique subsaharienne : grandes figures, livres pour commencer, auteurs et BD.",
  path: "/pays",
});

export default async function CountriesPage() {
  if (getMaintenance().enabled) return null;
  // Carrousel d'ouest en est : on traverse le continent en faisant glisser.
  const countries = [...(await getCountriesWithBooks())].sort((a, b) => a.lon - b.lon);
  const start = Math.max(0, countries.findIndex((c) => c.code === "SN"));
  return (
    <>
      <PageHeader title="Pays" intro="Les écrivains d'Afrique subsaharienne, pays par pays. Faites glisser pour traverser le continent." />
      <section className="container-page">
        <CountryCarousel countries={countries} start={start} />
      </section>
    </>
  );
}

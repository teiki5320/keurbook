import type { Metadata } from "next";
import Link from "next/link";
import { CountryCarousel } from "@/components/carousel/CountryCarousel";
import { EntryText, PageHeader } from "@/components/layout/Section";
import { siteConfig } from "@/lib/config";
import { getCountriesWithBooks } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
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
  const authors = countries.reduce((n, c) => n + c.authors, 0);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("La littérature africaine par pays", countries.map((c) => ({ name: c.name, url: `${siteConfig.url}/pays/${c.slug}` })))) }}
      />
      <PageHeader title="Pays" intro="Les écrivains d'Afrique subsaharienne, pays par pays. Faites glisser pour traverser le continent." />
      <section className="container-page">
        <CountryCarousel countries={countries} start={start} />
      </section>
      <EntryText title="Lire l'Afrique pays par pays">
        <p>
          La littérature d&apos;Afrique subsaharienne ne forme pas un seul bloc : chaque pays a son histoire, ses langues, ses grandes figures et ses débats. Keurbook la parcourt en {countries.length} pays
          et {authors} écrivains, de la Mauritanie à Madagascar, avec pour chacun une présentation, ses auteurs et les livres par lesquels commencer.
        </p>
        <p>
          En Afrique de l&apos;Ouest, le <Link href="/pays/senegal">Sénégal</Link> de Senghor, de Mariama Bâ et de Mohamed Mbougar Sarr côtoie la <Link href="/pays/cote-d-ivoire">Côte d&apos;Ivoire</Link> d&apos;Ahmadou
          Kourouma et le <Link href="/pays/nigeria">Nigeria</Link> de Chinua Achebe, Wole Soyinka et Chimamanda Ngozi Adichie. En Afrique centrale, le <Link href="/pays/cameroun">Cameroun</Link> de Mongo Beti et Léonora Miano
          répond aux deux Congo, le <Link href="/pays/congo">Congo-Brazzaville</Link> d&apos;Alain Mabanckou et la <Link href="/pays/rd-congo">RD Congo</Link> d&apos;In Koli Jean Bofane. À l&apos;est et dans l&apos;océan Indien,
          le <Link href="/pays/rwanda">Rwanda</Link> de Scholastique Mukasonga, <Link href="/pays/madagascar">Madagascar</Link> et <Link href="/pays/maurice">Maurice</Link> ont leurs propres voix, jusqu&apos;à
          l&apos;<Link href="/pays/afrique-du-sud">Afrique du Sud</Link> de J. M. Coetzee et Nelson Mandela.
        </p>
        <p>
          Faites glisser le carrousel pour voyager d&apos;ouest en est, ou cherchez directement un écrivain dans la liste des <Link href="/auteurs">auteurs</Link>. Pour un premier pas, lisez notre conseil{" "}
          <Link href="/conseils/par-quel-livre-commencer">Par quel livre commencer pour découvrir la littérature africaine ?</Link>
        </p>
        {/* Ligne discrète : chaque page pays a un lien depuis cette page (pour les visiteurs sans carrousel et pour Google). */}
        <nav aria-label="Tous les pays" className="pt-2 text-[13px] leading-loose text-faint">
          {[...countries]
            .sort((a, b) => a.name.localeCompare(b.name, "fr"))
            .map((c, i) => (
              <span key={c.code}>
                {i > 0 && " · "}
                <Link href={`/pays/${c.slug}`}>{c.name}</Link>
              </span>
            ))}
        </nav>
      </EntryText>
    </>
  );
}

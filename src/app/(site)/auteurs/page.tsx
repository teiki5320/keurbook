import type { Metadata } from "next";
import Link from "next/link";
import { AuthorsBrowser } from "@/components/browse/AuthorsBrowser";
import { EntryText, PageHeader } from "@/components/layout/Section";
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
      bdOnly: (await getBooksByAuthor(a.slug)).every((b) => b.kind === "bd"),
    })),
  );
  // Texte d'entrée calculé depuis les fiches (aucun chiffre écrit à la main).
  const avecAuteurs = countries.filter((c) => c.authors > 0);
  const topPays = [...avecAuteurs].sort((x, y) => y.authors - x.authors || x.name.localeCompare(y.name, "fr")).slice(0, 4);
  const topAuteurs = [...items].filter((a) => a.count > 0).sort((x, y) => y.count - x.count || x.name.localeCompare(y.name, "fr")).slice(0, 4);
  const auteursBd = items.filter((a) => a.count > 0 && a.bdOnly).length;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("Auteurs africains", authors.map((a) => ({ name: a.name, url: `${siteConfig.url}/auteur/${a.slug}` })))) }}
      />
      <PageHeader title="Auteurs" intro="Tous les écrivains et dessinateurs d'Afrique subsaharienne et de sa diaspora, de A à Z." />
      <AuthorsBrowser authors={items.map((a) => ({ slug: a.slug, name: a.name, countryCode: a.countryCode, countryName: a.countryName, years: a.years, photo: a.photo, count: a.count }))} countries={avecAuteurs} />
      <EntryText title="Les écrivains d'Afrique subsaharienne et de sa diaspora">
        <p>
          Keurbook présente {items.length} auteurs venus de {avecAuteurs.length} pays : romanciers, poètes, dramaturges, essayistes, auteurs pour la jeunesse et, pour {auteursBd} d&apos;entre eux,
          scénaristes ou dessinateurs de bandes dessinées. Chaque page auteur donne une courte biographie, la liste de ses livres présentés sur le site et le titre par lequel commencer.
        </p>
        <p>
          Pays les mieux représentés :{" "}
          {topPays.map((c, i) => (
            <span key={c.code}>
              {i > 0 ? (i === topPays.length - 1 ? " et " : ", ") : ""}
              <Link href={`/pays/${c.slug}`}>{c.name}</Link> ({c.authors} auteurs)
            </span>
          ))}
          . Auteurs dont le site présente le plus de titres :{" "}
          {topAuteurs.map((a, i) => (
            <span key={a.slug}>
              {i > 0 ? (i === topAuteurs.length - 1 ? " et " : ", ") : ""}
              <Link href={`/auteur/${a.slug}`}>{a.name}</Link> ({a.count} titres)
            </span>
          ))}
          .
        </p>
        <p>
          Cherchez un nom, filtrez la liste par pays ou voyagez <Link href="/pays">pays par pays</Link>. Pour choisir un premier livre, lisez notre conseil{" "}
          <Link href="/conseils/par-quel-livre-commencer">Par quel livre commencer pour découvrir la littérature africaine ?</Link>, ou parcourez les rubriques <Link href="/livres">Livres</Link> et{" "}
          <Link href="/bd">BD</Link>.
        </p>
      </EntryText>
    </>
  );
}

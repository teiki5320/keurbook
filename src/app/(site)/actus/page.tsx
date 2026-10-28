import type { Metadata } from "next";
import { BlocActus } from "@/components/actus/BlocActus";
import { PageHeader } from "@/components/layout/Section";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Actus du livre africain",
  description: "Prix littéraires, nouveaux livres, salons et BD : l'actualité des écrivains d'Afrique et de la diaspora, résumée chaque jour avec un lien vers chaque source.",
  path: "/actus",
});

/** Page « Actus » : les 20 dernières actus du livre et de la BD d'Afrique, lues en direct depuis la veille. */
export default function ActusPage() {
  if (getMaintenance().enabled) return null;
  return (
    <>
      <PageHeader
        title="Actus du livre africain"
        intro="Prix littéraires, nouveaux livres, rencontres d'auteurs, salons et bande dessinée : l'actualité des écrivains d'Afrique et de sa diaspora. Touchez une actu pour lire l'article complet, rédigé par nos soins à partir de sources citées. Mise à jour deux fois par jour."
      />
      <div className="container-page">
        <BlocActus limite={20} prioritaire avecMiseAJour siVide="Les actus arrivent bientôt : revenez dans quelques heures." />
      </div>
    </>
  );
}

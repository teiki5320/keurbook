import type { Metadata } from "next";
import Link from "next/link";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { PageHeader } from "@/components/layout/Section";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { getConseils } from "@/lib/data/conseils";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Conseils de lecture",
  description: "Par quel livre commencer, quels romans africains lire au lycée, quelles BD offrir : nos réponses aux questions sur la littérature africaine.",
  path: "/conseils",
});

export default function ConseilsPage() {
  if (getMaintenance().enabled) return null;
  const conseils = getConseils();
  const categories = Object.entries(CONSEIL_CATEGORIES).filter(([k]) => conseils.some((c) => c.theme === k));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("Conseils de lecture", conseils.map((c) => ({ name: c.title, url: `${siteConfig.url}/conseils/${c.slug}` })))) }}
      />
      <PageHeader title="Conseils" intro="Nos réponses aux questions que l'on se pose sur la littérature africaine. Trois nouveaux articles par semaine : le lundi, le mercredi et le vendredi.">
        <nav aria-label="Catégories" className="mt-6 flex flex-wrap gap-2">
          {categories.map(([k, name]) => (
            <Link key={k} href={`#${k}`} className="tag">
              {name}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <div className="container-page space-y-12">
        {categories.map(([k, name]) => (
          <section key={k} id={k} className="scroll-mt-24">
            <h2 className="section-title mb-5">{name}</h2>
            <ConseilGrid conseils={conseils.filter((c) => c.theme === k)} />
          </section>
        ))}
      </div>
    </>
  );
}

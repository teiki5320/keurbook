import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/book/BookCover";
import { PageHeader } from "@/components/layout/Section";
import { siteConfig } from "@/lib/config";
import { getSelectionBooks, getSelections } from "@/lib/data/selections";
import { getMaintenance } from "@/lib/data/settings";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Nos sélections",
  description: "Nos sélections de livres d'Afrique subsaharienne : des listes courtes, choisies par nous, pour savoir quoi lire et par où commencer.",
  path: "/selections",
});

const monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

export default async function SelectionsPage() {
  if (getMaintenance().enabled) return null;
  const selections = await Promise.all(getSelections().map(async (s) => ({ ...s, books: await getSelectionBooks(s) })));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListLd("Nos sélections", selections.map((s) => ({ name: s.title, url: `${siteConfig.url}/selections/${s.slug}` })))) }}
      />
      <PageHeader
        title="Nos sélections"
        intro="Des listes courtes, choisies par nous parmi les livres du site, pour savoir quoi lire et par où commencer. Ce ne sont pas des classements : chaque livre a sa fiche, et l'ordre suit la date de parution."
      />
      <div className="container-page grid gap-5 md:grid-cols-2">
        {selections.map((s) => (
          <Link key={s.slug} href={`/selections/${s.slug}`} className="group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 transition hover:border-line-strong sm:flex-row sm:items-center">
            <div aria-hidden className="flex shrink-0 -space-x-6">
              {s.books.slice(0, 3).map((b, i) => (
                <div key={b.slug} className="w-20" style={{ zIndex: 3 - i, transform: `rotate(${(i - 1) * 4}deg)` }}>
                  <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                </div>
              ))}
            </div>
            <div className="min-w-0">
              <p className="eyebrow">
                {s.books.length} {s.unit} · {monthYear.format(new Date(`${s.updated}T12:00:00Z`))}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-[1.02] text-balance group-hover:text-accent">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Top10View } from "@/components/top10/Top10View";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { getTop10BySlug, getTop10Books, getTop10s } from "@/lib/data/top10";
import { breadcrumbLd, itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getTop10s().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/top-10/[slug]">): Promise<Metadata> {
  const top = getTop10BySlug((await params).slug);
  if (!top) return {};
  return pageMetadata({ title: top.title, description: top.description, path: `/top-10/${top.slug}`, type: "article" });
}

/** Un onglet de la page « Top 10 » : vraie page à part, avec son titre, sa description et ses 10 livres dans le HTML. */
export default async function Top10Page({ params }: PageProps<"/top-10/[slug]">) {
  if (getMaintenance().enabled) return null;
  const top = getTop10BySlug((await params).slug);
  if (!top) notFound();
  const books = await getTop10Books(top);
  const url = `${siteConfig.url}/top-10/${top.slug}`;
  const structuredData = [
    itemListLd(
      top.title,
      books.map((b) => ({ name: b.title, url: `${siteConfig.url}${b.path}` })),
    ),
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: "Top 10", url: `${siteConfig.url}/top-10` },
      { name: top.title, url },
    ]),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Top10View tops={getTop10s()} top={top} books={books} />
    </>
  );
}

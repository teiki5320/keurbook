import type { MetadataRoute } from "next";
import { NOINDEX, siteConfig } from "@/lib/config";
import { getAllBooks, getAuthors, getCountriesWithBooks } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance : rien à indexer.
  // Site en maintenance ou version provisoire (GitHub Pages) : rien à indexer.
  if (getMaintenance().enabled || NOINDEX) return [];
  const [books, authors, countries] = await Promise.all([getAllBooks(), getAuthors(), getCountriesWithBooks()]);
  const base = siteConfig.url;
  const lists = ["/livres", "/bd", "/auteurs", "/pays", "/conseils"];
  const staticPages = ["", ...lists, "/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" || lists.includes(path) ? ("weekly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : lists.includes(path) ? 0.8 : 0.3,
  }));
  return [
    ...staticPages,
    ...books.map((b) => ({
      url: `${base}${b.kind === "bd" ? "/bd" : "/livre"}/${b.slug}`,
      lastModified: new Date(`${b.addedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...authors.map((a) => ({ url: `${base}/auteur/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...countries.map((c) => ({ url: `${base}/pays/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getConseils().map((c) => ({
      url: `${base}/conseils/${c.slug}`,
      lastModified: new Date(`${c.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

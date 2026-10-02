import type { MetadataRoute } from "next";
import { bookCountry } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAllBooks, getAuthors, getCountriesWithBooks } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";

export const dynamic = "force-static";

/** Dernière mise à jour des pages légales. */
const LEGAL_UPDATED = "2026-10-01";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance : rien à indexer.
  // Site en maintenance ou version provisoire (GitHub Pages) : rien à indexer.
  if (getMaintenance().enabled) return [];
  const [books, authors, countries] = await Promise.all([getAllBooks(), getAuthors(), getCountriesWithBooks()]);
  const base = siteConfig.url;
  const conseils = getConseils();
  const authorMap = new Map(authors.map((a) => [a.slug, a]));
  // Dernière modification : date d'ajout la plus récente des livres concernés (ou de l'article le plus récent).
  const day = (d: string) => new Date(`${d}T00:00:00Z`);
  const latest = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), "2026-09-30");
  const booksOf = (pred: (b: (typeof books)[number]) => boolean) => books.filter(pred).map((b) => b.addedAt);
  const lastBook = latest(books.map((b) => b.addedAt));
  const lastConseil = latest(conseils.map((c) => c.date));
  const lists: Record<string, string> = {
    "/livres": latest(booksOf((b) => b.kind === "livre")),
    "/bd": latest(booksOf((b) => b.kind === "bd")),
    "/auteurs": lastBook,
    "/pays": lastBook,
    "/conseils": lastConseil,
  };
  const staticPages = [
    { url: base, lastModified: day(latest([lastBook, lastConseil])), changeFrequency: "weekly" as const, priority: 1 },
    ...Object.entries(lists).map(([path, d]) => ({ url: `${base}${path}`, lastModified: day(d), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...["/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
      url: `${base}${path}`,
      lastModified: day(LEGAL_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
  return [
    ...staticPages,
    ...books.map((b) => ({
      url: `${base}${b.kind === "bd" ? "/bd" : "/livre"}/${b.slug}`,
      lastModified: new Date(`${b.addedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...authors.map((a) => ({
      url: `${base}/auteur/${a.slug}`,
      lastModified: day(latest(booksOf((b) => b.contributors.some((c) => c.authorSlug === a.slug)))),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...countries.map((c) => ({
      url: `${base}/pays/${c.slug}`,
      lastModified: day(latest(booksOf((b) => bookCountry(b, authorMap) === c.code))),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...conseils.map((c) => ({
      url: `${base}/conseils/${c.slug}`,
      lastModified: new Date(`${c.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

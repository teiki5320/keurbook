import type { MetadataRoute } from "next";
import { bookCountry } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAllBooks, getAuthors, getCountriesWithBooks } from "@/lib/data/books";
import { getConseils } from "@/lib/data/conseils";
import { getTop10s } from "@/lib/data/top10";
import { TOP10_UPDATED } from "@/lib/top10/sujets";
import { getMaintenance } from "@/lib/data/settings";
import { getArticlesActus } from "@/lib/data/veille-articles";
import { currentHashes, readLedger } from "@/lib/lastmod";
import { execFileSync } from "node:child_process";

export const dynamic = "force-static";

/** Jour du dernier commit (date de repli d'une page changée dont le registre n'est pas encore à jour), sinon aujourd'hui. */
function commitDay(): string {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs"], { encoding: "utf8" }).trim() || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

/** Dernière mise à jour des pages légales. */
const LEGAL_UPDATED = "2026-10-12";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Site en maintenance : rien à indexer.
  // Site en maintenance ou version provisoire (GitHub Pages) : rien à indexer.
  if (getMaintenance().enabled) return [];
  const [books, authors, countries] = await Promise.all([getAllBooks(), getAuthors(), getCountriesWithBooks()]);
  const base = siteConfig.url;
  const conseils = getConseils();
  const authorMap = new Map(authors.map((a) => [a.slug, a]));
  // Dernière modification réelle de chaque page : registre src/lib/lastmod.json (empreinte du contenu + jour du changement).
  // Contenu changé depuis la dernière mise à jour du registre : jour du dernier commit.
  const hashes = await currentHashes();
  const ledger = readLedger();
  const fallback = commitDay();
  const changed = (key: string, added: string) => {
    const known = ledger[key];
    const d = known && known.h === hashes[key] ? known.d : fallback;
    return d > added ? d : added;
  };
  const day = (d: string) => new Date(`${d}T00:00:00Z`);
  const latest = (dates: string[]) => dates.reduce((a, b) => (b > a ? b : a), "2026-09-30");
  const bookDay = new Map(books.map((b) => [b.slug, changed(`${b.kind === "bd" ? "bd" : "livre"}/${b.slug}`, b.addedAt)]));
  const booksOf = (pred: (b: (typeof books)[number]) => boolean) => books.filter(pred).map((b) => bookDay.get(b.slug)!);
  const conseilDay = new Map(conseils.map((c) => [c.slug, changed(`conseils/${c.slug}`, c.date)]));
  const lastBook = latest([...bookDay.values()]);
  const lastConseil = latest([...conseilDay.values()]);
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
    // Actus : lues en direct depuis la veille (2 fois par jour), la page change tous les jours.
    { url: `${base}/actus`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
    ...["/conditions", "/mentions-legales", "/confidentialite"].map((path) => ({
      url: `${base}${path}`,
      lastModified: day(LEGAL_UPDATED),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
  return [
    ...staticPages,
    // Top 10 : une adresse par onglet (/top-10 renvoie vers le premier comme adresse canonique).
    ...getTop10s().map((t) => ({ url: `${base}/top-10/${t.slug}`, lastModified: day(changed(`top-10/${t.slug}`, TOP10_UPDATED)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...books.map((b) => ({
      url: `${base}${b.kind === "bd" ? "/bd" : "/livre"}/${b.slug}`,
      lastModified: day(bookDay.get(b.slug)!),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...authors.map((a) => ({
      url: `${base}/auteur/${a.slug}`,
      lastModified: day(changed(`auteur/${a.slug}`, latest(booksOf((b) => b.contributors.some((c) => c.authorSlug === a.slug))))),
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
      lastModified: day(conseilDay.get(c.slug)!),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // Articles complets des actus, construits 2 fois par jour (la page de secours /actus/article n'y est pas).
    ...getArticlesActus().map((a) => ({
      url: `${base}/actus/${a.slug}`,
      lastModified: new Date(a.redige_le),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

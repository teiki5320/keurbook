/**
 * Dates de dernière modification du plan du site (sitemap.xml), page par page.
 * Chaque page a une empreinte de son contenu ; src/lib/lastmod.json garde, pour chaque page,
 * l'empreinte connue et le jour où elle a changé pour la dernière fois.
 * Mise à jour du registre : npx tsx scripts/lastmod.mjs (à lancer après un changement de contenu).
 * Page modifiée mais registre pas encore à jour : date du dernier commit (voir sitemap.ts).
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { allAuthors, allBooks } from "./demo";
import type { Author, Book } from "./types";

export type Ledger = Record<string, { h: string; d: string }>;

const hash = (value: unknown) => createHash("sha1").update(JSON.stringify(value)).digest("hex").slice(0, 16);

/**
 * Empreinte de chaque page : « livre/<slug> » ou « bd/<slug> », « auteur/<slug> » (fiche et ses livres),
 * « conseils/<slug> » (fichier de l'article), « top-10/<slug> » (sujet et ses livres).
 */
export function pageHashes(books: Book[], authors: Author[], conseils: Record<string, string>, tops: Array<{ slug: string; items: Array<{ slug: string }> }> = []): Record<string, string> {
  const out: Record<string, string> = {};
  const bookHash = new Map(books.filter((b) => b.isPublished).map((b) => [b.slug, hash(b)]));
  for (const b of books) if (b.isPublished) out[`${b.kind === "bd" ? "bd" : "livre"}/${b.slug}`] = bookHash.get(b.slug)!;
  for (const a of authors) {
    const own = books.filter((b) => b.isPublished && b.contributors.some((c) => c.authorSlug === a.slug)).map((b) => bookHash.get(b.slug));
    out[`auteur/${a.slug}`] = hash([a, own]);
  }
  for (const [slug, text] of Object.entries(conseils)) out[`conseils/${slug}`] = hash(text);
  for (const t of tops) out[`top-10/${t.slug}`] = hash([t, t.items.map((i) => bookHash.get(i.slug) ?? null)]);
  return out;
}

/** Fichiers des articles Conseils (texte brut, par adresse). */
export function readConseils(dir = join(process.cwd(), "content", "conseils")): Record<string, string> {
  return Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => [f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8")]),
  );
}

/** Empreintes du contenu actuel. */
export async function currentHashes(): Promise<Record<string, string>> {
  const { TOP10S } = await import("./top10/sujets");
  return pageHashes(allBooks, allAuthors, readConseils(), TOP10S);
}

/** Registre des dates (src/lib/lastmod.json). */
export function readLedger(file = join(process.cwd(), "src", "lib", "lastmod.json")): Ledger {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Ledger;
  } catch {
    return {};
  }
}

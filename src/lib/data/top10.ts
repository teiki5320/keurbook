import { amazonUrl } from "@/lib/amazon";
import { ageFromSheet, bookPath, creatorNames } from "@/lib/book-utils";
import { TOP10S } from "@/lib/top10/sujets";
import type { Top10 } from "@/lib/top10/types";
import { getAllBooks, getAuthorBySlug, getCountry } from "./books";

/** Livre d'un top 10, prêt à afficher. */
export interface Top10Book {
  rank: number;
  slug: string;
  path: string;
  isBd: boolean;
  title: string;
  creators: string;
  cover: string | null;
  illustration: string | null;
  authorName: string;
  authorSlug: string | null;
  country: { name: string; slug: string } | null;
  /** Remplace le pays en tête de la carte (voir Top10.items). */
  place: string | null;
  year: number;
  /** Âge conseillé, seulement s'il est écrit dans la fiche (« Dès 6 ans »). */
  age: string | null;
  awards: string[];
  why: string;
  amazonUrl: string;
}

/** Espaces insécables à la française (avant « ? ! : ; » et dans les guillemets) : aucun signe seul en début de ligne. */
const frenchSpaces = (top: Top10): Top10 => JSON.parse(JSON.stringify(top).replace(/ ([?!:;»])/g, "\\u00a0$1").replace(/« /g, "«\\u00a0"));
const fr = (text: string) => text.replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");

const TOPS = TOP10S.map(frenchSpaces);

/** Sujets, dans l'ordre des onglets. */
export const getTop10s = (): Top10[] => TOPS;

export const getTop10BySlug = (slug: string): Top10 | null => TOPS.find((t) => t.slug === slug) ?? null;

/** Top 10 dont fait partie un livre, avec son rang (lien « Ce livre est dans le Top 10 … » de la fiche). */
export const getTop10sOfBook = (bookSlug: string): Array<{ top: Top10; rank: number }> =>
  TOPS.flatMap((top) => {
    const i = top.items.findIndex((it) => it.slug === bookSlug);
    return i < 0 ? [] : [{ top, rank: i + 1 }];
  });

/** Texte « Pourquoi le lire » tiré de la fiche : début du résumé (au moins une phrase complète) puis les raisons de la fiche. */
function whyFromSheet(summary: string, whyRead: string[]): string {
  const sentences = summary.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [summary];
  let lead = "";
  for (const s of sentences) {
    lead += s;
    if (lead.trim().length >= 60) break;
  }
  return [lead.trim(), ...whyRead].join(" ");
}

/** Les 10 livres d'un sujet, dans l'ordre (n° 1 à 10), complétés par leurs fiches. */
export async function getTop10Books(top: Top10): Promise<Top10Book[]> {
  const books = await getAllBooks();
  return Promise.all(
    top.items.map(async ({ slug, why, place }, i) => {
      const book = books.find((b) => b.slug === slug);
      if (!book) throw new Error(`Top 10 « ${top.slug} » : livre absent ou non publié (${slug}).`);
      const main = book.contributors.find((c) => c.authorSlug && c.role !== "traducteur");
      const author = main?.authorSlug ? await getAuthorBySlug(main.authorSlug) : null;
      const country = getCountry(author?.countryCode ?? null);
      return {
        rank: i + 1,
        slug: book.slug,
        path: bookPath(book),
        isBd: book.kind === "bd",
        title: book.title,
        creators: creatorNames(book),
        cover: book.cover,
        illustration: book.illustration ?? null,
        authorName: creatorNames(book),
        authorSlug: author?.slug ?? null,
        country: country ? { name: country.name, slug: country.slug } : null,
        place: place ?? null,
        year: book.year,
        age: ageFromSheet(book),
        awards: book.awards.map((a) => `${a.name} ${a.year}`),
        why: fr(why ?? whyFromSheet(book.summary, book.whyRead)),
        amazonUrl: amazonUrl(book, "top"),
      };
    }),
  );
}

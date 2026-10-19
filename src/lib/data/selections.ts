import { amazonUrl } from "@/lib/amazon";
import { creatorNames } from "@/lib/book-utils";
import { SELECTIONS, type Selection } from "@/lib/selections";
import { getAuthorBySlug, getBookBySlug, getCountry } from "./books";

/** Livre d'une sélection, prêt à afficher (données simples, transmises aussi au composant interactif). */
export interface SelectionBook {
  slug: string;
  path: string;
  title: string;
  creators: string;
  cover: string | null;
  illustration: string | null;
  authorName: string;
  authorSlug: string | null;
  country: { name: string; slug: string } | null;
  year: number;
  pages: number | null;
  /** « Français », ou « Anglais (traduit) » pour une traduction. */
  language: string;
  awards: string[];
  whyRead: string[];
  why: string;
  envie: string;
  envieLabel: string;
  amazonUrl: string;
}

/** Espaces insécables à la française (avant « ? ! : ; » et dans les guillemets), pour qu'aucun signe ne reste seul en début de ligne. */
const frenchSpaces = (selection: Selection): Selection =>
  JSON.parse(JSON.stringify(selection).replace(/ ([?!:;»])/g, "\u00a0$1").replace(/« /g, "«\u00a0"));

const SELECTIONS_FR = SELECTIONS.map(frenchSpaces);

export const getSelections = (): Selection[] => SELECTIONS_FR;

export const getSelectionBySlug = (slug: string): Selection | null => SELECTIONS_FR.find((s) => s.slug === slug) ?? null;

/** Livres d'une sélection, complétés par leurs fiches, dans l'ordre de parution. */
export async function getSelectionBooks(selection: Selection): Promise<SelectionBook[]> {
  const books = await Promise.all(
    selection.items.map(async ({ slug, envie, why }) => {
      const book = await getBookBySlug(slug, "livre");
      if (!book) throw new Error(`Sélection « ${selection.slug} » : livre absent ou non publié (${slug}).`);
      const authorSlug = book.contributors.find((c) => c.role === "auteur")?.authorSlug ?? null;
      const author = authorSlug ? await getAuthorBySlug(authorSlug) : null;
      const country = getCountry(author?.countryCode ?? null);
      const lang = book.originalLanguage;
      return {
        slug: book.slug,
        path: `/livre/${book.slug}`,
        title: book.title,
        creators: creatorNames(book),
        cover: book.cover,
        illustration: book.illustration ?? null,
        authorName: author?.name ?? creatorNames(book),
        authorSlug: author?.slug ?? null,
        country: country ? { name: country.name, slug: country.slug } : null,
        year: book.year,
        pages: book.pages,
        language: lang ? `${lang[0].toUpperCase()}${lang.slice(1)} (traduit)` : "Français",
        awards: book.awards.map((a) => `${a.name} ${a.year}`),
        whyRead: book.whyRead,
        why,
        envie,
        envieLabel: selection.envies[envie] ?? envie,
        amazonUrl: amazonUrl(book),
      } satisfies SelectionBook;
    }),
  );
  return books.sort((a, b) => a.year - b.year);
}

import "server-only";
import { cache } from "react";
import { amazonUrl } from "../amazon";
import { authorSlugsOf, bookCountry, byNewest, creatorNames, normalize, periodOf } from "../book-utils";
import { COUNTRIES } from "../countries";
import { allAuthors, allBooks } from "../demo";
import { GENERATIONS, generationOf } from "../generations";
import { GENRES, THEMES } from "../themes";
import type { Author, Book, BookKind, Country } from "../types";

/** Données d'une carte de livre, transmises aux composants client (listes, filtres, pile à lire). */
export interface BookCardData {
  slug: string;
  kind: BookKind;
  path: string;
  title: string;
  creators: string;
  countryCode: string | null;
  countryName: string | null;
  genre: Book["genre"];
  audience: Book["audience"];
  themes: Book["themes"];
  period: string;
  year: number;
  cover: string | null;
  illustration: string | null;
  amazonUrl: string;
  priceCents: number | null;
  addedAt: string;
  featured: boolean;
  /** Titre, auteurs, pays, genre et thèmes normalisés, pour la recherche. */
  search: string;
}

export const getAuthors = cache(async (): Promise<Author[]> => [...allAuthors].sort((a, b) => lastName(a.name).localeCompare(lastName(b.name), "fr")));

/** Nom de famille approximatif pour le tri alphabétique (dernier mot). */
function lastName(name: string) {
  return name.split(" ").at(-1) ?? name;
}

const authorMap = cache(async () => new Map((await getAuthors()).map((a) => [a.slug, a])));

/** Livres et BD publiés, des plus récents ajoutés aux plus anciens. */
export const getAllBooks = cache(async (): Promise<Book[]> => allBooks.filter((b) => b.isPublished).sort(byNewest));

export async function getBooks(kind: BookKind) {
  return (await getAllBooks()).filter((b) => b.kind === kind);
}

export async function getBookBySlug(slug: string, kind: BookKind) {
  return (await getBooks(kind)).find((b) => b.slug === slug) ?? null;
}

export async function getAuthorBySlug(slug: string) {
  return (await authorMap()).get(slug) ?? null;
}

export function getCountry(code: string | null): Country | null {
  return COUNTRIES.find((c) => c.code === code) ?? null;
}

export async function getBookCountry(book: Book): Promise<Country | null> {
  return getCountry(bookCountry(book, await authorMap()));
}

/** Auteurs du livre qui ont une fiche. */
export async function getBookAuthors(book: Book): Promise<Author[]> {
  const map = await authorMap();
  return authorSlugsOf(book).flatMap((s) => map.get(s) ?? []);
}

export async function toCard(book: Book): Promise<BookCardData> {
  const country = await getBookCountry(book);
  const creators = creatorNames(book);
  return {
    slug: book.slug,
    kind: book.kind,
    path: book.kind === "bd" ? `/bd/${book.slug}` : `/livre/${book.slug}`,
    title: book.title,
    creators,
    countryCode: country?.code ?? null,
    countryName: country?.name ?? null,
    genre: book.genre,
    audience: book.audience,
    themes: book.themes,
    period: periodOf(book.year),
    year: book.year,
    cover: book.cover,
    illustration: book.illustration ?? null,
    amazonUrl: amazonUrl(book),
    priceCents: book.priceCents,
    addedAt: book.addedAt,
    featured: book.featured,
    search: normalize([book.title, book.subtitle ?? "", creators, country?.name ?? "", GENRES[book.genre], ...book.themes.map((t) => THEMES[t])].join(" ")),
  };
}

export async function toCards(books: Book[]): Promise<BookCardData[]> {
  return Promise.all(books.map(toCard));
}

/** Livres et BD d'un auteur (quel que soit son rôle). */
export async function getBooksByAuthor(slug: string) {
  return (await getAllBooks()).filter((b) => authorSlugsOf(b).includes(slug));
}

/** « Vous aimerez aussi » : même pays, puis thèmes communs, puis même genre. Hors livres du même auteur. */
export async function getRelatedBooks(book: Book, limit = 4) {
  const map = await authorMap();
  const own = new Set(authorSlugsOf(book));
  const country = bookCountry(book, map);
  const others = (await getBooks(book.kind)).filter((b) => b.slug !== book.slug && !authorSlugsOf(b).some((s) => own.has(s)));
  const score = (b: Book) =>
    (bookCountry(b, map) === country ? 3 : 0) + b.themes.filter((t) => book.themes.includes(t)).length * 2 + (b.genre === book.genre ? 1 : 0);
  return others
    .map((b) => ({ b, s: score(b) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s || byNewest(x.b, y.b))
    .slice(0, limit)
    .map((x) => x.b);
}

/** Thèmes récurrents d'un auteur (les plus fréquents dans ses livres). */
export async function getAuthorThemes(slug: string, limit = 4) {
  const counts = new Map<Book["themes"][number], number>();
  for (const b of await getBooksByAuthor(slug)) for (const t of b.themes) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => t);
}

/** « Auteurs proches » : même pays, puis thèmes communs. */
export async function getRelatedAuthors(author: Author, limit = 4) {
  const themes = await getAuthorThemes(author.slug, 6);
  const scored = await Promise.all(
    (await getAuthors())
      .filter((a) => a.slug !== author.slug)
      .map(async (a) => {
        const t = await getAuthorThemes(a.slug, 6);
        return { a, s: (a.countryCode === author.countryCode ? 3 : 0) + t.filter((x) => themes.includes(x)).length };
      }),
  );
  return scored.filter((x) => x.s > 0).sort((x, y) => y.s - x.s).slice(0, limit).map((x) => x.a);
}

/** Pays qui ont au moins un livre ou une BD, avec leurs nombres de livres, BD et auteurs. */
export async function getCountriesWithBooks() {
  const [books, authors] = await Promise.all([getAllBooks(), getAuthors()]);
  const map = await authorMap();
  return COUNTRIES.map((c) => ({
    ...c,
    books: books.filter((b) => b.kind === "livre" && bookCountry(b, map) === c.code).length,
    bd: books.filter((b) => b.kind === "bd" && bookCountry(b, map) === c.code).length,
    authors: authors.filter((a) => a.countryCode === c.code).length,
  })).filter((c) => c.books + c.bd > 0);
}

export async function getCountryBySlug(slug: string) {
  return (await getCountriesWithBooks()).find((c) => c.slug === slug) ?? null;
}

export async function getBooksOfCountry(code: string) {
  const map = await authorMap();
  return (await getAllBooks()).filter((b) => bookCountry(b, map) === code);
}

export async function getAuthorsOfCountry(code: string) {
  return (await getAuthors()).filter((a) => a.countryCode === code);
}

/** Galerie de l'accueil : auteurs par grande époque, du plus ancien au plus jeune. */
export async function getAuthorGenerations() {
  const items = await Promise.all(
    (await getAuthors()).map(async (a) => {
      const books = await getBooksByAuthor(a.slug);
      const first = books.length ? Math.min(...books.map((b) => b.year)) : null;
      return {
        author: a,
        generation: generationOf(a.birthYear, first),
        sortYear: a.birthYear ?? (first != null ? first - 30 : 9999),
        isBd: books.length > 0 && books.every((b) => b.kind === "bd"),
        books: books.length,
      };
    }),
  );
  return GENERATIONS.map((g) => ({
    ...g,
    authors: items.filter((x) => x.generation === g.key && x.books > 0).sort((x, y) => x.sortYear - y.sortYear || x.author.name.localeCompare(y.author.name, "fr")),
  })).filter((g) => g.authors.length > 0);
}

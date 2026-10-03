/** Fonctions pures sur les livres et auteurs (utilisables côté client et dans les tests). */
import { PERIODS } from "./themes";
import type { Author, Book, Contributor } from "./types";

/** Auteurs principaux (auteur, scénariste, dessinateur), sans les traducteurs. */
export const creators = (book: Pick<Book, "contributors">): Contributor[] => book.contributors.filter((c) => c.role !== "traducteur");

/** « Mariama Bâ » ou « Marguerite Abouet et Clément Oubrerie » (une personne à la fois scénariste et dessinatrice n'est nommée qu'une fois). */
export function creatorNames(book: Pick<Book, "contributors">): string {
  const names = [...new Set(creators(book).map((c) => c.name))];
  return names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} et ${names.at(-1)}`;
}

export const translator = (book: Pick<Book, "contributors">) => book.contributors.find((c) => c.role === "traducteur") ?? null;

/** Slugs des fiches auteurs liées au livre. */
export const authorSlugsOf = (book: Pick<Book, "contributors">): string[] =>
  creators(book).flatMap((c) => (c.authorSlug ? [c.authorSlug] : []));

export const periodOf = (year: number) => PERIODS.find((p) => p.test(year))?.key ?? "depuis-2000";

/** Chemin de la fiche : /livre/… ou /bd/… */
export const bookPath = (book: Pick<Book, "kind" | "slug">) => (book.kind === "bd" ? `/bd/${book.slug}` : `/livre/${book.slug}`);

/** Texte normalisé pour la recherche (minuscules, sans accents). */
export function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Pays d'un livre : celui du premier auteur qui a une fiche. */
export function bookCountry(book: Pick<Book, "contributors">, authors: Map<string, Pick<Author, "countryCode">>): string | null {
  for (const slug of authorSlugsOf(book)) {
    const a = authors.get(slug);
    if (a) return a.countryCode;
  }
  return null;
}

/** Tri « Nouveautés » : ajoutés le plus récemment, puis parus le plus récemment. */
export const byNewest = (a: Book, b: Book) => b.addedAt.localeCompare(a.addedAt) || b.year - a.year || a.title.localeCompare(b.title, "fr");

/** Initiales d'un nom (« Mariama Bâ » → « MB »), affichées tant qu'il n'y a pas de photo libre de droits. */
export function initials(name: string) {
  const parts = name.replace(/[^\p{L}\s-]/gu, "").split(/[\s-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")).toUpperCase();
}

/** « 1929 – 1981 », « né en 1990 » ou chaîne vide. */
export function lifeYears(a: Pick<Author, "birthYear" | "deathYear">): string {
  if (a.birthYear && a.deathYear) return `${a.birthYear} – ${a.deathYear}`;
  if (a.birthYear) return `né·e en ${a.birthYear}`;
  return "";
}

/** Titre et tome : « Aya de Yopougon, tome 2 », « Akissi : Paix temporaire ». */
export function titleWithSubtitle(book: Pick<Book, "title" | "subtitle">): string {
  if (!book.subtitle) return book.title;
  const tome = book.subtitle.match(/^tome\s+(\d+)$/i);
  return tome ? `${book.title}, tome ${tome[1]}` : `${book.title} : ${book.subtitle}`;
}

/**
 * Titre de la fiche pour les moteurs de recherche, qui tient si possible dans 60 caractères avec « | Keurbook » :
 * le sous-titre (tome) n'est ajouté que si un autre livre porte le même titre, et la liste des auteurs se réduit
 * au premier nom quand elle est trop longue.
 * @param homonym un autre livre du même type porte le même titre
 */
export function bookPageTitle(book: Pick<Book, "title" | "subtitle" | "kind" | "contributors">, homonym: boolean, max = 60, suffix = " | Keurbook"): string {
  const base = homonym ? titleWithSubtitle(book) : book.title;
  const head = book.kind === "bd" ? `${base} (BD)` : base;
  const all = creatorNames(book);
  const first = creators(book)[0]?.name ?? "";
  const candidates = [...new Set([all && `${head}, ${all}`, first && `${head}, ${first}`, head].filter(Boolean))];
  return candidates.find((t) => t.length + suffix.length <= max) ?? candidates.find((t) => t.length <= max) ?? head;
}

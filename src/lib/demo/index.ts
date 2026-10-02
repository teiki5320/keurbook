/**
 * Contenu du site, écrit dans le code (site statique, sans base de données).
 * Livres : livres-*.ts ; BD : bd.ts ; auteurs : auteurs-*.ts ; fiches ajoutées par lots : lots/ ; pays : ../countries.ts.
 */
import { normalize } from "../book-utils";
import type { Author, Book } from "../types";
import { auteursBd } from "./auteurs-bd";
import { auteursCentreEstSud } from "./auteurs-centre-est-sud";
import { auteursOuest } from "./auteurs-ouest";
import { bandesDessinees } from "./bd";
import { livresCentreEstSud } from "./livres-centre-est-sud";
import { livresOuest } from "./livres-ouest";
import { ILLUSTRATED } from "./illustrations";
import { LOTS } from "./lots";
import { AUTHOR_PHOTOS } from "./photos";

const illustrated = new Set([...ILLUSTRATED, ...LOTS.flatMap((l) => l.illustres)]);
const photos = Object.assign({}, AUTHOR_PHOTOS, ...LOTS.map((l) => l.photos));

/** Livres et BD, avec leur illustration de couverture Keurbook quand elle existe (illustrations.ts et lots). */
export const allBooks: Book[] = [...livresOuest, ...livresCentreEstSud, ...bandesDessinees, ...LOTS.flatMap((l) => l.livres)].map((b) =>
  illustrated.has(b.slug) ? { ...b, illustration: `/illustrations/${b.slug}.webp` } : b,
);

/** Livres de l'auteur présents sur le site. */
const booksOf = (slug: string) => allBooks.filter((b) => b.contributors.some((c) => c.authorSlug === slug));

/** Illustration du livre conseillé de l'auteur (ou, à défaut, de son premier livre illustré). */
function coverImageOf(a: Author): string | null {
  const own = booksOf(a.slug).filter((b) => b.illustration);
  return (own.find((b) => b.slug === a.startWith) ?? own[0])?.illustration ?? null;
}

/** « Titre (année) » → titre normalisé, pour retirer des autres titres ceux qui ont désormais une fiche. */
const titleKey = (t: string) => normalize(t.replace(/\s*\(\d{4}\)\s*$/, "")).replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Auteurs, avec leur photo libre de droits quand il y en a une (photos.ts et lots), sinon une couverture de leur livre.
 * Les « autres titres » qui ont désormais une fiche sur le site en sont retirés.
 */
export const allAuthors: Author[] = [...auteursOuest, ...auteursCentreEstSud, ...auteursBd, ...LOTS.flatMap((l) => l.auteurs)].map((a) => {
  const onSite = new Set(booksOf(a.slug).map((b) => titleKey(b.title)));
  const base = { ...a, otherTitles: a.otherTitles.filter((t) => !onSite.has(titleKey(t))) };
  const p = photos[a.slug];
  return p ? { ...base, photo: p.photo, photoCredit: p.credit, photoSource: p.source } : { ...base, coverImage: coverImageOf(base) };
});

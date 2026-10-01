/**
 * Contenu du site, écrit dans le code (site statique, sans base de données).
 * Livres : livres-*.ts ; BD : bd.ts ; auteurs : auteurs-*.ts ; pays : ../countries.ts.
 */
import type { Author, Book } from "../types";
import { auteursBd } from "./auteurs-bd";
import { auteursCentreEstSud } from "./auteurs-centre-est-sud";
import { auteursOuest } from "./auteurs-ouest";
import { bandesDessinees } from "./bd";
import { livresCentreEstSud } from "./livres-centre-est-sud";
import { livresOuest } from "./livres-ouest";
import { ILLUSTRATED } from "./illustrations";
import { AUTHOR_PHOTOS } from "./photos";

const illustrated = new Set(ILLUSTRATED);

/** Livres et BD, avec leur illustration de couverture Keurbook quand elle existe (illustrations.ts). */
export const allBooks: Book[] = [...livresOuest, ...livresCentreEstSud, ...bandesDessinees].map((b) =>
  illustrated.has(b.slug) ? { ...b, illustration: `/illustrations/${b.slug}.webp` } : b,
);
/** Illustration du livre conseillé de l'auteur (ou, à défaut, de son premier livre illustré). */
function coverImageOf(a: Author): string | null {
  const own = allBooks.filter((b) => b.illustration && b.contributors.some((c) => c.authorSlug === a.slug));
  return (own.find((b) => b.slug === a.startWith) ?? own[0])?.illustration ?? null;
}

/** Auteurs, avec leur photo libre de droits quand il y en a une (photos.ts), sinon une couverture de leur livre. */
export const allAuthors: Author[] = [...auteursOuest, ...auteursCentreEstSud, ...auteursBd].map((a) => {
  const p = AUTHOR_PHOTOS[a.slug];
  return p ? { ...a, photo: p.photo, photoCredit: p.credit, photoSource: p.source } : { ...a, coverImage: coverImageOf(a) };
});

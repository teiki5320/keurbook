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
/** Auteurs, avec leur photo libre de droits quand il y en a une (photos.ts). */
export const allAuthors: Author[] = [...auteursOuest, ...auteursCentreEstSud, ...auteursBd].map((a) => {
  const p = AUTHOR_PHOTOS[a.slug];
  return p ? { ...a, photo: p.photo, photoCredit: p.credit, photoSource: p.source } : a;
});

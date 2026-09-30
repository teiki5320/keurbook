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
import { AUTHOR_PHOTOS } from "./photos";

export const allBooks: Book[] = [...livresOuest, ...livresCentreEstSud, ...bandesDessinees];
/** Auteurs, avec leur photo libre de droits quand il y en a une (photos.ts). */
export const allAuthors: Author[] = [...auteursOuest, ...auteursCentreEstSud, ...auteursBd].map((a) => {
  const p = AUTHOR_PHOTOS[a.slug];
  return p ? { ...a, photo: p.photo, photoCredit: p.credit, photoSource: p.source } : a;
});

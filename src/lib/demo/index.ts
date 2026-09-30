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

export const allBooks: Book[] = [...livresOuest, ...livresCentreEstSud, ...bandesDessinees];
export const allAuthors: Author[] = [...auteursOuest, ...auteursCentreEstSud, ...auteursBd];

/**
 * Compléments vérifiés, ajoutés à part pour ne pas toucher aux fiches : anecdotes « Le saviez-vous ? » des auteurs,
 * citations courtes et adaptations des livres. Règles : docs/REDACTION.md et docs/EXTRAS.md (citations de 2 lignes
 * au plus, exactes, avec leur source ; dans le doute, rien). Chaque groupe d'auteurs a son fichier dans extras/.
 */
import type { Adaptation, Quote } from "../types";
import * as g1 from "./extras/groupe-1";
import * as g2 from "./extras/groupe-2";
import * as g3 from "./extras/groupe-3";
import * as g4 from "./extras/groupe-4";
import * as g5 from "./extras/groupe-5";
import * as g6 from "./extras/groupe-6";

const GROUPES = [g1, g2, g3, g4, g5, g6];

/** « Le saviez-vous ? » : 2 à 4 anecdotes vérifiées par auteur (slug). */
export const AUTHOR_FACTS: Record<string, string[]> = Object.assign({}, ...GROUPES.map((g) => g.facts));

/** Citations courtes exactes (moins de 200 caractères), par livre (slug). */
export const BOOK_QUOTES: Record<string, Quote> = Object.assign({}, ...GROUPES.map((g) => g.quotes));

/** Adaptations vérifiées (film, série, théâtre, BD…), par livre (slug). */
export const BOOK_ADAPTATIONS: Record<string, Adaptation[]> = Object.assign({}, ...GROUPES.map((g) => g.adaptations));

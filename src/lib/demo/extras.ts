/**
 * Compléments vérifiés, ajoutés à part pour ne pas toucher aux fiches : anecdotes « Le saviez-vous ? » des auteurs,
 * citations courtes et adaptations des livres. Règles : docs/REDACTION.md (citations de 2 lignes au plus, exactes,
 * avec leur source ; dans le doute, rien).
 */
import type { Adaptation, Quote } from "../types";

/** « Le saviez-vous ? » : 2 à 4 anecdotes vérifiées par auteur (slug). */
export const AUTHOR_FACTS: Record<string, string[]> = {};

/** Citations courtes exactes (moins de 200 caractères), par livre (slug). */
export const BOOK_QUOTES: Record<string, Quote> = {};

/** Adaptations vérifiées (film, série, théâtre, BD…), par livre (slug). */
export const BOOK_ADAPTATIONS: Record<string, Adaptation[]> = {};

/**
 * Lot 04b : fiches ajoutées en octobre 2026 (voir docs/REDACTION.md).
 * Chaque lot est écrit séparément ; src/lib/demo/index.ts les rassemble.
 */
import type { Author, Book } from "../../types";

/** Livres et BD de ce lot. */
export const livres: Book[] = [];

/** Nouveaux auteurs de ce lot (vide si le lot ne complète que des auteurs déjà présents). */
export const auteurs: Author[] = [];

/** Photos libres de droits des nouveaux auteurs (fichiers : public/authors/). */
export const photos: Record<string, { photo: string; credit: string; source: string }> = {};

/** Livres de ce lot qui ont leur illustration Keurbook (public/illustrations/<slug>.webp). */
export const illustres: string[] = [];

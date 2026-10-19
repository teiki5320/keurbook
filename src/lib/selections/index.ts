import { romansAfricainsALire } from "./romans-africains-a-lire";
import type { Selection } from "./types";

export type { Selection } from "./types";

/**
 * Toutes les sélections (pages /selections/<slug>), de la plus récente à la plus ancienne.
 * Nouvelle sélection : copier romans-africains-a-lire.ts, l'ajouter ici ; la page, l'index, le sitemap et les tests suivent.
 */
export const SELECTIONS: Selection[] = [romansAfricainsALire];

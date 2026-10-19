/**
 * « Nos sélections » : pages /selections/<sujet>, des livres du site choisis par nous autour d'un sujet.
 * Uniquement des livres publiés sur le site ; les faits (année, pages, prix, langue) viennent de leurs fiches.
 * Pas de prix, pas de note : l'ordre affiché (date de parution) n'est pas un classement.
 */
export interface Selection {
  slug: string;
  /** Titre de la page (h1 et balise title), sans « Keurbook ». */
  title: string;
  /** Fin du titre mise en italique dans le h1 (doit terminer `title`). */
  titleItalic?: string;
  /** Description pour Google (70 à 160 caractères). */
  description: string;
  /** Mot pour compter les livres : « romans », « BD »… */
  unit: string;
  /** Date de mise à jour de la sélection (AAAA-MM-JJ). */
  updated: string;
  /** Introduction (1 ou 2 paragraphes). */
  intro: string[];
  /** Envies proposées en filtres : clé → libellé (« Pour commencer »). */
  envies: Record<string, string>;
  /** Les livres, dans l'ordre de parution ; `why` est écrit par nous à partir de la fiche. */
  items: Array<{ slug: string; envie: string; why: string }>;
  /** Trois portes d'entrée (sans classement) : libellé et phrase tirée de la fiche. */
  highlights: Array<{ slug: string; label: string; verdict: string }>;
  /** « Comment choisir » : 3 conseils. */
  guide: Array<{ q: string; a: string }>;
  /** Questions fréquentes. */
  faq: Array<{ q: string; a: string }>;
}

/**
 * Page « Top 10 » : un onglet par sujet, chacun avec sa propre adresse (/top-10/<slug>).
 * Exactement 10 livres publiés du site par sujet, numérotés de 1 à 10 (notre classement).
 * Les faits affichés (année, pays, prix) viennent des fiches ; pas de prix de vente, pas de note.
 */
export interface Top10 {
  slug: string;
  /** Libellé court de l'onglet. */
  tab: string;
  /** Titre de la page (h1) : « Top 10 des … ». */
  title: string;
  /** Description pour Google (70 à 160 caractères). */
  description: string;
  /** 2 ou 3 phrases : comment la sélection est faite. */
  intro: string;
  /**
   * Les 10 livres, du n° 1 au n° 10. `why` (facultatif) remplace le texte tiré de la fiche
   * (première phrase du résumé + « Pourquoi le lire »).
   */
  items: Array<{ slug: string; why?: string }>;
  /** « Par où commencer » : texte court, liens internes écrits [texte](/chemin). */
  start: string;
  /** 3 questions fréquentes (liens internes possibles). */
  faq: Array<{ q: string; a: string }>;
}

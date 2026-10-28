/**
 * Fiches voisines « en boucle » : les éléments qui suivent l'élément courant dans une liste fixe,
 * en revenant au début une fois la fin atteinte. Chaque fiche reçoit ainsi des liens d'autant d'autres fiches
 * (et pas seulement les premières de la liste), ce qui aide les moteurs de recherche à toutes les découvrir.
 * Même principe que Keur Déco (suivantsEnBoucle) et Keur Cook (getRelatedProducts).
 */
export function suivantsEnBoucle<T>(liste: readonly T[], estCourant: (x: T) => boolean, n: number): T[] {
  const i = liste.findIndex(estCourant);
  const autres = i < 0 ? [...liste] : [...liste.slice(i + 1), ...liste.slice(0, i)];
  return autres.slice(0, Math.max(0, n));
}

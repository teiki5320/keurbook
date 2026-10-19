/**
 * ASIN Amazon.fr vérifiés à la main : le bouton « Acheter sur Amazon » mène directement au livre
 * (https://www.amazon.fr/dp/<ASIN>) au lieu d'une recherche. Pour un livre papier, l'ASIN est l'ISBN-10
 * de l'édition conseillée (celui de la fiche) : chaque adresse a été ouverte et contrôlée.
 * Vérifiés le 19 octobre 2026 (livres de la sélection « Les 10 romans africains à lire absolument »).
 */
export const AMAZON_ASINS: Record<string, string> = {
  "l-enfant-noir": "2266178946",
  "une-vie-de-boy": "2266169289",
  "l-aventure-ambigue": "2264036931",
  "les-soleils-des-independances": "2020259214",
  "une-si-longue-lettre": "2842612892",
  "verre-casse": "2757864505",
  "notre-dame-du-nil": "2070456315",
  "petit-pays": "2253070440",
  "la-plus-secrete-memoire-des-hommes": "2253937711",
};

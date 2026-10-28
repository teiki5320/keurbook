/**
 * ASIN Amazon.fr vérifiés : le bouton « Voir sur Amazon » mène directement au livre
 * (https://www.amazon.fr/dp/<ASIN>) au lieu d'une recherche. Pour un livre papier, l'ASIN est l'ISBN-10
 * de l'édition de la fiche ; livre à ISBN 979… (sans ISBN-10) : l'ASIN Amazon (B0…) de la page dont l'ISBN-13
 * est celui de la fiche. ISBN absent, page introuvable ou livre seulement d'occasion : le bouton garde une
 * recherche Amazon (jamais d'ASIN deviné).
 *
 * Les données sont dans amazon-asins.json :
 * - « actifs » : slug → { asin, verifie_le } ; chaque page Amazon a été ouverte : titre et ISBN-13 comparés
 *   à la fiche, bouton « Ajouter au panier » présent. 19 octobre 2026 : livres des pages Top 10 ;
 *   28 octobre 2026 : fiches qui reçoivent des visites (docs/referencement.md), puis le reste du catalogue.
 * - « indisponibles » : ASIN retirés car plus achetables (le bouton revient à la recherche). Exemple :
 *   L'Empire peul du Macina (24 octobre 2026), épuisé sans autre édition achetable : à laisser sans lien direct.
 *
 * Vérification de la disponibilité, sur le Mac (pas sur GitHub) : `npm run verifier-produits`
 * (voir scripts/verifier-produits.mjs) met à jour verifie_le ou passe le livre en « indisponibles ».
 */
import donnees from "./amazon-asins.json";

interface AsinVerifie {
  asin: string;
  verifie_le: string;
}

export const AMAZON_ASINS: Record<string, string> = Object.fromEntries(
  Object.entries(donnees.actifs as Record<string, AsinVerifie>).map(([slug, v]) => [slug, v.asin]),
);

/** Date de la dernière vérification de chaque ASIN (AAAA-MM-JJ). */
export const AMAZON_ASINS_VERIFIES_LE: Record<string, string> = Object.fromEntries(
  Object.entries(donnees.actifs as Record<string, AsinVerifie>).map(([slug, v]) => [slug, v.verifie_le]),
);

/** ASIN retirés car plus achetables neufs : slug → date du constat (AAAA-MM-JJ). */
export const AMAZON_INDISPONIBLES: Record<string, string> = Object.fromEntries(
  Object.entries(donnees.indisponibles as Record<string, { constate_le: string }>).map(([slug, v]) => [slug, v.constate_le]),
);

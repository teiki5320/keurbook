import type { Book } from "./types";

/** Programme Partenaires Amazon : identifiant du site (code actuel), ajouté à tous les liens vers Amazon.fr. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "keurbookfr-21";

/**
 * Emplacements des boutons « Voir sur Amazon » :
 * - fiche : fiche livre ou BD ;
 * - top : pages Top 10 ;
 * - conseil : articles Conseils ;
 * - rubrique : pages auteur, pays et pile à lire.
 */
export type AmazonEmplacement = "fiche" | "top" | "conseil" | "rubrique";

/**
 * Table unique des codes de suivi Amazon, un par emplacement : c'est le seul endroit à modifier quand
 * des codes propres à chaque emplacement auront été créés dans Amazon Partenaires.
 * Pour l'instant, tous les emplacements utilisent le code actuel du site (rien ne change en ligne).
 */
export const AMAZON_TAGS: Record<AmazonEmplacement, string> = {
  fiche: AMAZON_TAG,
  top: AMAZON_TAG,
  conseil: AMAZON_TAG,
  rubrique: AMAZON_TAG,
};

/**
 * Lien d'achat d'un livre : la fiche Amazon.fr si l'ASIN est connu (vérifié à la main),
 * sinon une recherche Amazon (rayon Livres) par ISBN, ou à défaut par titre et auteur.
 * Le code de suivi dépend de l'emplacement du bouton (table AMAZON_TAGS).
 */
export function amazonUrl(book: Pick<Book, "amazonAsin" | "isbn" | "title" | "contributors">, emplacement: AmazonEmplacement): string {
  const tag = AMAZON_TAGS[emplacement];
  if (book.amazonAsin) return `https://www.amazon.fr/dp/${encodeURIComponent(book.amazonAsin)}?tag=${tag}`;
  const author = book.contributors.find((c) => c.role !== "traducteur")?.name ?? "";
  const query = book.isbn ? book.isbn.replace(/[^0-9X]/gi, "") : `${book.title} ${author}`.trim();
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&i=stripbooks&tag=${tag}`;
}

/** Mention obligatoire du programme Partenaires Amazon. */
export const AMAZON_DISCLOSURE =
  "En tant que Partenaire Amazon, Keurbook réalise un bénéfice sur les achats remplissant les conditions requises.";

/** Date du dernier relevé des prix Amazon affichés à titre indicatif (vide tant qu'aucun prix n'est relevé). */
export const AMAZON_PRICES_CHECKED_ON = "";

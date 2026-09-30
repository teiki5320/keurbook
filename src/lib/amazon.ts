import type { Book } from "./types";

/** Programme Partenaires Amazon : identifiant ajouté à tous les liens vers Amazon.fr. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "keurbook-21";

/**
 * Lien d'achat d'un livre : la fiche Amazon.fr si l'ASIN est connu (vérifié à la main),
 * sinon une recherche Amazon (rayon Livres) par ISBN, ou à défaut par titre et auteur.
 */
export function amazonUrl(book: Pick<Book, "amazonAsin" | "isbn" | "title" | "contributors">): string {
  if (book.amazonAsin) return `https://www.amazon.fr/dp/${encodeURIComponent(book.amazonAsin)}?tag=${AMAZON_TAG}`;
  const author = book.contributors.find((c) => c.role !== "traducteur")?.name ?? "";
  const query = book.isbn ? book.isbn.replace(/[^0-9X]/gi, "") : `${book.title} ${author}`.trim();
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&i=stripbooks&tag=${AMAZON_TAG}`;
}

/** Mention obligatoire du programme Partenaires Amazon. */
export const AMAZON_DISCLOSURE =
  "En tant que Partenaire Amazon, Keurbook réalise un bénéfice sur les achats remplissant les conditions requises.";

/** Date du dernier relevé des prix Amazon affichés à titre indicatif (vide tant qu'aucun prix n'est relevé). */
export const AMAZON_PRICES_CHECKED_ON = "";

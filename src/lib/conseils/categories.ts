/** Catégories de la rubrique Conseils. */
export const CONSEIL_CATEGORIES = {
  decouvrir: "Découvrir",
  pays: "Par pays",
  age: "Par âge",
  auteurs: "Auteurs",
  actualite: "Prix et actualité",
} as const;

export type ConseilCategory = keyof typeof CONSEIL_CATEGORIES;

export const isConseilCategory = (v: string): v is ConseilCategory => v in CONSEIL_CATEGORIES;

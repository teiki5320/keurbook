/** Menu principal (en-tête et pied de page) : le site est centré sur les auteurs. */
export const NAV = [
  { href: "/auteurs", label: "Auteurs" },
  { href: "/pays", label: "Pays" },
  { href: "/conseils", label: "Conseils" },
] as const;

/** Listes secondaires (pied de page, bas de l'accueil). */
export const SECONDARY_NAV = [
  { href: "/livres", label: "Tous les livres" },
  { href: "/bd", label: "Toutes les BD" },
] as const;

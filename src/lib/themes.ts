/** Thèmes des livres : filtre de /livres (?theme=…) et liens des fiches livre et auteur. */
export const THEMES = {
  enfance: "Enfance",
  famille: "Famille",
  femmes: "Condition des femmes",
  exil: "Exil et migration",
  colonisation: "Colonisation",
  independances: "Indépendances",
  guerre: "Guerre",
  genocide: "Génocide",
  histoire: "Histoire",
  politique: "Pouvoir et politique",
  tradition: "Tradition et modernité",
  spiritualite: "Religion et spiritualité",
  amour: "Amour",
  ville: "Ville",
  identite: "Identité",
  humour: "Humour et satire",
  contes: "Contes et mythes",
  esclavage: "Esclavage",
  ecole: "École et savoir",
  travail: "Travail et luttes sociales",
} as const;

export type ThemeKey = keyof typeof THEMES;

export const isTheme = (v: string): v is ThemeKey => v in THEMES;

export const GENRES = {
  roman: "Roman",
  nouvelles: "Nouvelles",
  poesie: "Poésie",
  theatre: "Théâtre",
  essai: "Essai",
  recit: "Récit et témoignage",
  contes: "Contes",
  jeunesse: "Jeunesse",
  bd: "BD",
} as const;

export const AUDIENCES = { adulte: "Adulte", ado: "Ado", jeunesse: "Jeunesse" } as const;

/** Époques du filtre de /livres, selon l'année de première parution. */
export const PERIODS = [
  { key: "avant-1960", name: "Avant 1960", test: (y: number) => y < 1960 },
  { key: "1960-1999", name: "1960 – 1999", test: (y: number) => y >= 1960 && y <= 1999 },
  { key: "depuis-2000", name: "Depuis 2000", test: (y: number) => y >= 2000 },
] as const;

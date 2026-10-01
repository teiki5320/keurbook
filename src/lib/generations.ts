/**
 * Grandes époques de la galerie des auteurs (accueil), selon l'année de naissance
 * (à défaut, l'année de leur premier livre sur le site, moins 30 ans).
 */
export const GENERATIONS = [
  {
    key: "pionniers",
    name: "Les pionniers",
    period: "nés avant 1930",
    /** Couleur de l'époque, tirée de la palette des couvertures. */
    color: "var(--color-accent)",
    intro: "Poètes de la négritude, conteurs et premiers romanciers : ils ont fait entrer l'Afrique dans la littérature de langue française.",
    test: (y: number) => y < 1930,
  },
  {
    key: "independances",
    name: "La génération des indépendances",
    period: "nés de 1930 à 1959",
    color: "var(--color-terracotta)",
    intro: "Ils ont grandi sous la colonisation et écrit les espoirs, puis les désillusions, des jeunes nations.",
    test: (y: number) => y >= 1930 && y < 1960,
  },
  {
    key: "aujourdhui",
    name: "Les voix d'aujourd'hui",
    period: "nés depuis 1960",
    color: "var(--color-indigo)",
    intro: "Romanciers, essayistes et dessinateurs, en Afrique ou dans la diaspora : la littérature africaine d'aujourd'hui, primée et traduite dans le monde entier.",
    test: (y: number) => y >= 1960,
  },
] as const;

export type GenerationKey = (typeof GENERATIONS)[number]["key"];

export function generationOf(birthYear: number | null, firstBookYear: number | null): GenerationKey {
  const y = birthYear ?? (firstBookYear != null ? firstBookYear - 30 : 1970);
  return GENERATIONS.find((g) => g.test(y))?.key ?? "aujourdhui";
}

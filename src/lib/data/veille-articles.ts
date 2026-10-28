import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { nettoyerArticle, nettoyerFichier, type Actu, type ArticleActu } from "@/lib/veille";
import { allAuthors } from "@/lib/demo";

/**
 * Articles complets des actus, lus au moment de la construction (fichier .veille/articles.json écrit par
 * scripts/veille-articles.mjs). Fichier absent ou illisible : aucun article, sans erreur.
 */
interface Donnees {
  actus: Actu[];
  articles: ArticleActu[];
}

let cache: Donnees | null = null;

function lire(): Donnees {
  if (cache) return cache;
  try {
    const brut = JSON.parse(readFileSync(join(process.cwd(), ".veille", "articles.json"), "utf8")) as { actus?: unknown; articles?: unknown };
    const actus = nettoyerFichier({ actus: brut.actus })?.actus ?? [];
    const articles = (Array.isArray(brut.articles) ? brut.articles : [])
      .map(nettoyerArticle)
      .filter((a): a is ArticleActu => a !== null)
      .sort((a, b) => Date.parse(b.publie_le) - Date.parse(a.publie_le));
    cache = { actus, articles };
  } catch {
    cache = { actus: [], articles: [] };
  }
  return cache;
}

/** Articles construits avec le site, du plus récent au plus ancien. */
export function getArticlesActus(): ArticleActu[] {
  return lire().articles;
}

export function getArticleActu(slug: string): ArticleActu | undefined {
  return lire().articles.find((a) => a.slug === slug);
}

/** Pages construites : id de l'actu → adresse /actus/<slug>/ (donné aux cartes d'actus). */
export function getConstruits(): Record<string, string> {
  return Object.fromEntries(lire().articles.map((a) => [a.id, a.slug]));
}

/** Actus lues au moment de la construction (pour « Autres actus »). */
export function getActusConstruction(): Actu[] {
  return lire().actus;
}

/** Fiches auteurs existantes : slug → nom (pour relier les tags « auteur:<slug> »). */
export function getNomsAuteurs(): Record<string, string> {
  return Object.fromEntries(allAuthors.map((a) => [a.slug, a.name]));
}

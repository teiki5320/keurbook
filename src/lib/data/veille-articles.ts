import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { nettoyerArticle, nettoyerFichier, type Actu, type ArticleActu } from "@/lib/veille";
import { bookPath, normalize } from "@/lib/book-utils";
import { allAuthors, allBooks } from "@/lib/demo";
import { getConseilsForBooks } from "./conseils";
import { getTop10sOfBook } from "./top10";

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

/** Liens internes d'un article d'actu : fiches des livres dont il parle, puis le Top 10 et le conseil proches. */
export interface LiensActu {
  livres: Array<{ href: string; titre: string }>;
  top: { href: string; titre: string } | null;
  conseil: { href: string; titre: string } | null;
}

/** Texte comparable : minuscules, sans accents, mots séparés par une seule espace. */
const comparable = (t: string) => ` ${normalize(t).replace(/[^a-z0-9]+/g, " ").trim()} `;

/**
 * Livres dont parle l'article : seulement ceux des auteurs étiquetés (tags « auteur:<slug> »), dont le titre
 * (ou sa partie principale, avant la virgule ou les deux-points, d'au moins 5 lettres) figure dans le texte.
 * Exemple : l'actu sur Murambi mène à /livre/murambi-le-livre-des-ossements. Jamais de lien Amazon ici.
 */
export function getLiensActu(article: ArticleActu): LiensActu {
  const auteurs = new Set((article.tags ?? []).flatMap((t) => /^auteur:([a-z0-9-]+)$/.exec(t)?.[1] ?? []));
  const texte = comparable([article.titre, article.chapo, ...article.blocs.flatMap((b) => [b.intertitre ?? "", ...b.paragraphes])].join(" "));
  const livres = allBooks
    .filter((b) => b.isPublished && b.contributors.some((c) => c.authorSlug && auteurs.has(c.authorSlug)))
    .filter((b) => {
      const principal = b.title.split(/[,:]| ou /)[0];
      return [b.title, principal].some((t) => comparable(t).trim().length >= 5 && texte.includes(comparable(t)));
    })
    .slice(0, 2);
  const slugs = livres.map((b) => b.slug);
  const top = slugs.flatMap((s) => getTop10sOfBook(s))[0]?.top ?? null;
  const conseil = getConseilsForBooks(slugs)[0] ?? null;
  return {
    livres: livres.map((b) => ({ href: bookPath(b), titre: b.title })),
    top: slugs.length && top ? { href: `/top-10/${top.slug}`, titre: top.title } : null,
    conseil: slugs.length && conseil ? { href: `/conseils/${conseil.slug}`, titre: conseil.title } : null,
  };
}

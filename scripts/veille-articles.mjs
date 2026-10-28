/**
 * Articles complets des actus, lus sur la veille au moment de la construction du site.
 * Lancé avant `next build` (voir package.json). Écrit .veille/articles.json (non suivi par git) :
 * les actus du fichier keurbook.json, puis l'article de chaque actu qui a une adresse (`slug`).
 * Les pages /actus/<slug>/ et le sitemap sont construits à partir de ce fichier.
 *
 * La veille ne répond pas, ou répond n'importe quoi : le fichier est écrit avec 0 article
 * et la construction continue (jamais d'erreur).
 * Essai sans la veille : VEILLE_HORS_LIGNE=1 npm run build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_ARTICLES, URL_VEILLE, nettoyerArticle, nettoyerFichier } from "../src/lib/veille.ts";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const fichier = join(racine, ".veille", "articles.json");
const DELAI_MS = 15000;

async function lireJson(url) {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
  try {
    const rep = await fetch(url, { signal: ctrl.signal, headers: { "cache-control": "no-cache" } });
    if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
    return await rep.json();
  } finally {
    clearTimeout(minuteur);
  }
}

function ecrire(contenu) {
  mkdirSync(dirname(fichier), { recursive: true });
  writeFileSync(fichier, `${JSON.stringify(contenu)}\n`);
}

const vide = { lu_le: new Date().toISOString(), actus: [], articles: [] };

try {
  if (process.env.VEILLE_HORS_LIGNE) throw new Error("VEILLE_HORS_LIGNE");
  const actusFichier = nettoyerFichier(await lireJson(URL_VEILLE));
  if (!actusFichier) throw new Error("fichier des actus illisible");
  const avecArticle = actusFichier.actus.filter((a) => a.slug && a.article_url);
  const lus = await Promise.all(
    avecArticle.map(async (a) => {
      try {
        const art = nettoyerArticle(await lireJson(`${BASE_ARTICLES}${a.id}.json`));
        return art && art.id === a.id ? art : null;
      } catch {
        return null;
      }
    }),
  );
  // Une adresse = un article (la plus récente garde l'adresse en cas de doublon).
  const slugs = new Set();
  const articles = lus.filter((a) => a && !slugs.has(a.slug) && slugs.add(a.slug));
  ecrire({ lu_le: vide.lu_le, actus: actusFichier.actus, articles });
  console.log(`veille/articles : ${articles.length} article(s) sur ${actusFichier.actus.length} actu(s)`);
} catch (e) {
  ecrire(vide);
  console.warn(`veille/articles : veille injoignable (${e instanceof Error ? e.message : e}), 0 page article.`);
}

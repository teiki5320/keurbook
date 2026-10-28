/**
 * Articles complets des actus, lus sur la veille au moment de la construction du site.
 * Lancé avant `next build` (voir package.json). Écrit .veille/articles.json (non suivi par git) :
 * les actus du fichier keurbook.json, puis TOUS les articles de l'index articles/keurbook/index.json
 * (la veille ne supprime jamais un article : une page indexée par Google ne disparaît donc jamais),
 * plus ceux des actus récentes au cas où l'index serait en retard ou absent.
 * Les pages /actus/<slug>/ et le sitemap sont construits à partir de ce fichier.
 *
 * La veille ne répond pas, ou répond n'importe quoi : le fichier est écrit avec 0 article
 * et la construction continue (jamais d'erreur).
 * Essai sans la veille : VEILLE_HORS_LIGNE=1 npm run build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_ARTICLES, URL_VEILLE, idsIndexArticles, nettoyerArticle, nettoyerFichier } from "../src/lib/veille.ts";

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
  // Fichier des actus illisible : on construit quand même les pages de l'index (aucune page ne disparaît).
  let actusFichier = { actus: [] };
  try {
    actusFichier = nettoyerFichier(await lireJson(URL_VEILLE)) ?? actusFichier;
  } catch (e) {
    console.warn(`veille/articles : fichier des actus illisible (${e instanceof Error ? e.message : e}).`);
  }
  // Index de tous les articles ; absent ou illisible : seulement ceux des actus récentes.
  let index = [];
  try {
    index = idsIndexArticles(await lireJson(`${BASE_ARTICLES}index.json`));
  } catch (e) {
    console.warn(`veille/articles : index des articles illisible (${e instanceof Error ? e.message : e}), actus récentes seulement.`);
  }
  const ids = [...new Set([...index, ...actusFichier.actus.filter((a) => a.slug && a.article_url).map((a) => a.id)])];
  const lus = [];
  // Par paquets de 8, pour ne pas ouvrir des centaines de connexions à la fois.
  for (let i = 0; i < ids.length; i += 8) {
    lus.push(
      ...(await Promise.all(
        ids.slice(i, i + 8).map(async (id) => {
          try {
            const art = nettoyerArticle(await lireJson(`${BASE_ARTICLES}${id}.json`));
            return art && art.id === id ? art : null;
          } catch {
            return null;
          }
        }),
      )),
    );
  }
  // Une adresse = un article (le plus récent garde l'adresse en cas de doublon).
  const slugs = new Set();
  const articles = lus
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.publie_le) - Date.parse(a.publie_le))
    .filter((a) => !slugs.has(a.slug) && slugs.add(a.slug));
  ecrire({ lu_le: vide.lu_le, actus: actusFichier.actus, articles });
  console.log(`veille/articles : ${articles.length} article(s) (index : ${index.length}) pour ${actusFichier.actus.length} actu(s) récentes`);
} catch (e) {
  ecrire(vide);
  console.warn(`veille/articles : veille injoignable (${e instanceof Error ? e.message : e}), 0 page article.`);
}

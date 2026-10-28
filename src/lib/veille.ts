/**
 * Veille actus : actus du livre et de la BD d'Afrique, préparées 2 fois par jour par la tâche de veille
 * (dépôt public teiki5320/veille) et lues en direct dans le navigateur du visiteur, sans reconstruire le site.
 * Schéma : https://teiki5320.github.io/veille/schema/actus-schema-v3.json
 */

export const URL_VEILLE = "https://teiki5320.github.io/veille/actus/keurbook.json";

/** Adresse de base des images de la veille (seule origine autorisée pour les images d'actus). */
const BASE_IMAGES = "https://teiki5320.github.io/veille/";

export interface ImageActu {
  url: string;
  source: "wikimedia" | "openverse" | "banque" | "carte";
  credit: string;
  licence: string | null;
  page?: string | null;
  alt: string;
  mots_cles?: string[];
  largeur: number;
  hauteur: number;
}

/** Une actu (schéma v3). */
export interface Actu {
  id: string;
  titre: string;
  resume: string;
  theme?: string;
  pays?: string[];
  competition?: string | null;
  /** Liens vers des fiches du site, ex. « auteur:mariama-ba ». */
  tags?: string[];
  source_nom: string;
  source_url: string;
  autres_sources?: string[];
  publie_le: string;
  collecte_le?: string;
  langue?: string;
  image: ImageActu;
  /** Adresse de l'article complet sur le site (/actus/<slug>) ; absente tant que l'article n'est pas écrit. */
  slug?: string;
  /** Fichier de l'article complet sur la veille (articles/keurbook/<id>.json). */
  article_url?: string;
  lecture_min?: number;
}

/** Un bloc de l'article complet : intertitre facultatif, puis les paragraphes. */
export interface BlocArticle {
  intertitre: string | null;
  paragraphes: string[];
}

/**
 * Article complet d'une actu (schéma https://teiki5320.github.io/veille/schema/article-schema-v1.json),
 * déjà réécrit par la veille : jamais le texte ni le titre d'origine.
 */
export interface ArticleActu {
  version: number;
  site: string;
  id: string;
  slug: string;
  titre: string;
  chapo: string;
  blocs: BlocArticle[];
  mots: number;
  lecture_min: number;
  theme?: string;
  pays?: string[];
  competition?: string | null;
  tags?: string[];
  source_nom: string;
  source_url: string;
  autres_sources?: string[];
  publie_le: string;
  redige_le: string;
  image: ImageActu;
}

export interface FichierActus {
  version: number;
  site: string;
  genere_le: string;
  actus: Actu[];
}

/** Dossier des articles complets de Keurbook sur la veille. */
export const BASE_ARTICLES = "https://teiki5320.github.io/veille/articles/keurbook/";

/** Adresse de la page de secours (articles parus après la dernière construction du site). */
export const PAGE_SECOURS = "/actus/article";

/** Adresses réservées sous /actus/ : un article ne peut pas porter ce nom. */
const SLUGS_RESERVES = new Set(["article", "aucun-article"]);

const DELAI_MS = 8000;
const CACHE_MS = 15 * 60 * 1000;
const CLE_CACHE = "keurbook-veille-actus-v3";

const estHttp = (u: unknown): u is string => typeof u === "string" && /^https?:\/\//.test(u);

/** Lien d'achat (Amazon et ses liens courts) : jamais dans un bloc d'actus. */
const estLienAmazon = (u: string) => /(^|\.)(amazon\.[a-z.]+|amzn\.[a-z]+)$/i.test(new URL(u).hostname);

/** Garde seulement les actus complètes et sûres (source http(s) non Amazon, image servie par la veille). */
export function actuValide(a: unknown): a is Actu {
  if (!a || typeof a !== "object") return false;
  const x = a as Partial<Actu>;
  if (typeof x.id !== "string" || typeof x.titre !== "string" || typeof x.resume !== "string") return false;
  if (typeof x.source_nom !== "string" || !estHttp(x.source_url) || typeof x.publie_le !== "string") return false;
  try {
    if (estLienAmazon(x.source_url)) return false;
  } catch {
    return false;
  }
  return imageValide(x.image);
}

/** Image servie par la veille, avec son crédit (jamais l'image de l'article source). */
function imageValide(i: Partial<ImageActu> | undefined): boolean {
  if (!i || typeof i.url !== "string" || !i.url.startsWith(BASE_IMAGES)) return false;
  if (typeof i.credit !== "string" || typeof i.alt !== "string") return false;
  if (i.page != null && !estHttp(i.page)) return false;
  return true;
}

/** Identifiant d'une actu : 40 caractères hexadécimaux. */
export const idValide = (id: unknown): id is string => typeof id === "string" && /^[0-9a-f]{40}$/.test(id);

/** Adresse d'article utilisable sous /actus/ (minuscules, chiffres, tirets ; pas un nom réservé). */
export const slugValide = (slug: unknown): slug is string =>
  typeof slug === "string" && slug.length <= 80 && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && !SLUGS_RESERVES.has(slug);

const texte = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

/** Garde seulement un article complet et sûr (même contrôle que les actus : source http(s) non Amazon, image de la veille). */
export function articleValide(a: unknown): a is ArticleActu {
  if (!a || typeof a !== "object") return false;
  const x = a as Partial<ArticleActu>;
  if (!idValide(x.id) || !slugValide(x.slug) || !texte(x.titre) || !texte(x.chapo)) return false;
  if (!texte(x.source_nom) || !estHttp(x.source_url) || !texte(x.publie_le) || Number.isNaN(Date.parse(x.publie_le))) return false;
  try {
    if (estLienAmazon(x.source_url)) return false;
  } catch {
    return false;
  }
  if (!Array.isArray(x.blocs) || x.blocs.length === 0) return false;
  for (const b of x.blocs) {
    if (!b || typeof b !== "object" || !Array.isArray(b.paragraphes) || b.paragraphes.length === 0) return false;
    if (!b.paragraphes.every(texte) || (b.intertitre != null && typeof b.intertitre !== "string")) return false;
  }
  if (x.autres_sources != null && !(Array.isArray(x.autres_sources) && x.autres_sources.every(estHttp))) return false;
  return imageValide(x.image);
}

/** Article nettoyé : autres sources sans lien Amazon, valeurs manquantes complétées. */
export function nettoyerArticle(brut: unknown): ArticleActu | null {
  if (!articleValide(brut)) return null;
  const autres = (brut.autres_sources ?? []).filter((u) => {
    try {
      return !estLienAmazon(u) && u !== brut.source_url;
    } catch {
      return false;
    }
  });
  return {
    ...brut,
    blocs: brut.blocs.map((b) => ({ intertitre: b.intertitre?.trim() || null, paragraphes: b.paragraphes })),
    lecture_min: Math.max(1, Math.round(Number(brut.lecture_min) || 1)),
    redige_le: texte(brut.redige_le) && !Number.isNaN(Date.parse(brut.redige_le)) ? brut.redige_le : brut.publie_le,
    autres_sources: autres,
  };
}

/**
 * Ids de l'index de tous les articles (articles/keurbook/index.json : { articles: [{ id, slug, … }] }).
 * La veille ne supprime jamais un article, même quand l'actu sort des 60 plus récentes.
 * Index illisible : [].
 */
export function idsIndexArticles(brut: unknown): string[] {
  if (!brut || typeof brut !== "object" || !Array.isArray((brut as { articles?: unknown }).articles)) return [];
  const ids = (brut as { articles: unknown[] }).articles
    .map((a) => (a && typeof a === "object" ? (a as { id?: unknown }).id : null))
    .filter(idValide);
  return [...new Set(ids)];
}

/** Lien d'une carte d'actu : la page construite, sinon la page de secours, sinon la source (nouvel onglet). */
export interface LienCarte {
  href: string;
  externe: boolean;
}

/**
 * Choix du lien d'une carte.
 * construits : id de l'actu → adresse (slug) des pages /actus/<slug> construites avec le site.
 */
export function lienActu(actu: Actu, construits: Record<string, string> = {}): LienCarte {
  const slug = construits[actu.id];
  if (slug) return { href: `/actus/${slug}`, externe: false };
  if (actu.article_url && actu.article_url.startsWith(BASE_ARTICLES) && idValide(actu.id)) {
    return { href: `${PAGE_SECOURS}?id=${actu.id}`, externe: false };
  }
  return { href: actu.source_url, externe: true };
}

/** Id demandé à la page de secours (« ?id=… ») ; null s'il est absent ou mal formé. */
export function idDepuisRecherche(recherche: string): string | null {
  const id = new URLSearchParams(recherche).get("id")?.trim().toLowerCase();
  return idValide(id) ? id : null;
}

/** Nom lisible d'une autre source (« www.jeuneafrique.com/… » → « jeuneafrique.com »). */
export function nomDomaine(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Fiches existantes liées à l'article : tags « auteur:<slug> » qui correspondent à une fiche du site, les autres sont ignorés. */
export function fichesDesTags(tags: string[] | undefined, auteurs: Record<string, string>): Array<{ href: string; nom: string }> {
  const vus = new Set<string>();
  const fiches: Array<{ href: string; nom: string }> = [];
  for (const t of tags ?? []) {
    const m = /^auteur:([a-z0-9-]+)$/.exec(t);
    if (!m || vus.has(m[1]) || !auteurs[m[1]]) continue;
    vus.add(m[1]);
    fiches.push({ href: `/auteur/${m[1]}`, nom: auteurs[m[1]] });
  }
  return fiches;
}

/**
 * Article complet lu dans le navigateur (page de secours) : délai de 8 s.
 * null si l'article n'existe pas ou n'est pas lisible.
 */
export async function chargerArticle(id: string): Promise<ArticleActu | null> {
  if (!idValide(id)) return null;
  try {
    const ctrl = new AbortController();
    const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
    const rep = await fetch(`${BASE_ARTICLES}${id}.json`, { signal: ctrl.signal, cache: "no-cache" }).finally(() => clearTimeout(minuteur));
    if (!rep.ok) return null;
    const article = nettoyerArticle(await rep.json());
    return article && article.id === id ? article : null;
  } catch {
    return null;
  }
}

/** Nettoie un fichier reçu : actus valides, de la plus récente à la plus ancienne. */
export function nettoyerFichier(brut: unknown): FichierActus | null {
  if (!brut || typeof brut !== "object") return null;
  const f = brut as Partial<FichierActus>;
  if (!Array.isArray(f.actus)) return null;
  const actus = f.actus.filter(actuValide).sort((a, b) => Date.parse(b.publie_le) - Date.parse(a.publie_le));
  return { version: Number(f.version) || 3, site: String(f.site ?? "keurbook"), genere_le: String(f.genere_le ?? ""), actus };
}

/** Actus d'une fiche (« auteur:mariama-ba »), ou toutes si aucun tag n'est donné. */
export function filtrerParTag(actus: Actu[], tag?: string): Actu[] {
  return tag ? actus.filter((a) => a.tags?.includes(tag)) : actus;
}

/** Vignette carrée : « -carre.webp » pour les photos ; la carte SVG est la même image, recadrée à l'affichage. */
export function imageCarree(image: ImageActu): string {
  return image.source !== "carte" && image.url.endsWith(".webp") ? image.url.replace(/\.webp$/, "-carre.webp") : image.url;
}

/** Âge d'une actu : « il y a 3 h », « hier », « il y a 4 jours », puis la date. */
export function ageActu(iso: string, maintenant: number = Date.now()): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const min = Math.max(0, Math.round((maintenant - t) / 60000));
  if (min < 60) return min <= 1 ? "à l'instant" : `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j === 1) return "hier";
  if (j < 7) return `il y a ${j} jours`;
  return `le ${new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" })}`;
}

let enCours: Promise<FichierActus | null> | null = null;

/**
 * Fichier des actus, côté navigateur seulement : délai de 8 s, cache de 15 min (sessionStorage).
 * En cas d'erreur, renvoie null, sans jamais casser la page.
 */
export function chargerFichier(): Promise<FichierActus | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (enCours) return enCours;
  enCours = (async () => {
    try {
      const enCache = sessionStorage.getItem(CLE_CACHE);
      if (enCache) {
        const { t, f } = JSON.parse(enCache) as { t: number; f: unknown };
        if (Date.now() - t < CACHE_MS) {
          const propre = nettoyerFichier(f);
          if (propre) return propre;
        }
      }
    } catch {
      // Stockage indisponible (navigation privée…) : on lit le fichier en ligne.
    }
    try {
      const ctrl = new AbortController();
      const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
      const rep = await fetch(URL_VEILLE, { signal: ctrl.signal, cache: "no-cache" }).finally(() => clearTimeout(minuteur));
      if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
      const brut: unknown = await rep.json();
      const propre = nettoyerFichier(brut);
      if (!propre) throw new Error("fichier illisible");
      try {
        sessionStorage.setItem(CLE_CACHE, JSON.stringify({ t: Date.now(), f: brut }));
      } catch {
        // Cache impossible : sans conséquence.
      }
      return propre;
    } catch {
      enCours = null; // nouvel essai possible à la prochaine page
      return null;
    }
  })();
  return enCours;
}

/** Actus, de la plus récente à la plus ancienne ; [] en cas d'erreur. */
export async function chargerActus(): Promise<Actu[]> {
  return (await chargerFichier())?.actus ?? [];
}

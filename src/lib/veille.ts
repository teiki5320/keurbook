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
}

export interface FichierActus {
  version: number;
  site: string;
  genere_le: string;
  actus: Actu[];
}

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
  const i = x.image;
  if (!i || typeof i.url !== "string" || !i.url.startsWith(BASE_IMAGES)) return false;
  if (typeof i.credit !== "string" || typeof i.alt !== "string") return false;
  if (i.page != null && !estHttp(i.page)) return false;
  return true;
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

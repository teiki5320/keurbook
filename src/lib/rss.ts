/**
 * Flux RSS 2.0 du site (servi à /feed.xml par src/app/feed.xml/route.ts) : derniers articles d'actus et conseils.
 * Signalé dans l'en-tête de chaque page ; Google et Bing peuvent le lire comme un second plan du site (méthode de Keur Déco).
 */

export interface ElementRss {
  titre: string;
  /** Adresse complète de la page. */
  lien: string;
  description: string;
  /** Date ISO de parution. */
  date: string;
  /** Adresse complète d'une image servie par le site. */
  image?: string | null;
}

/** Nombre d'éléments gardés dans le flux. */
export const TAILLE_FLUX = 30;

const echapper = (texte: string) => texte.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Texte XML du flux : éléments du plus récent au plus ancien, 30 au plus. */
export function fluxRss({ titre, lien, description, adresseFlux, elements }: { titre: string; lien: string; description: string; adresseFlux: string; elements: ElementRss[] }): string {
  const recents = [...elements].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, TAILLE_FLUX);
  const items = recents.map((e) =>
    [
      "<item>",
      `<title>${echapper(e.titre)}</title>`,
      `<link>${echapper(e.lien)}</link>`,
      `<guid isPermaLink="true">${echapper(e.lien)}</guid>`,
      `<description>${echapper(e.description)}</description>`,
      `<pubDate>${new Date(e.date).toUTCString()}</pubDate>`,
      e.image ? `<media:content url="${echapper(e.image)}" medium="image"/>` : "",
      "</item>",
    ].join(""),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    "<channel>",
    `<title>${echapper(titre)}</title>`,
    `<link>${echapper(lien)}</link>`,
    `<description>${echapper(description)}</description>`,
    "<language>fr</language>",
    `<atom:link href="${echapper(adresseFlux)}" rel="self" type="application/rss+xml"/>`,
    recents[0] ? `<lastBuildDate>${new Date(recents[0].date).toUTCString()}</lastBuildDate>` : "",
    ...items,
    "</channel>",
    "</rss>",
    "",
  ].join("\n");
}

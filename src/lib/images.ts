import { withBase } from "./config";

/**
 * Vignettes créées par scripts/vignettes.mjs (mêmes largeurs) : public/<dossier>/w<largeur>/<nom>.webp.
 * Les illustrations d'origine font 600 px de large.
 */
const THUMBS = { illustrations: [300, 400], authors: [200, 400], conseils: [400, 800] } as const;
const ILLUSTRATION_WIDTH = 600;
/** Les images des articles Conseils font 1200 px de large. */
const CONSEIL_WIDTH = 1200;

function parts(path: string): { dir: keyof typeof THUMBS; name: string } | null {
  const m = path.match(/^\/(illustrations|authors|conseils)\/([^/]+)\.(webp|jpe?g|png)$/i);
  return m ? { dir: m[1] as keyof typeof THUMBS, name: m[2] } : null;
}

/** Vignette d'une largeur donnée (200 ou 400 pour un portrait, 300 ou 400 pour une illustration), sinon l'image d'origine. */
export function thumb(path: string, width: number): string {
  const p = parts(path);
  if (!p || !(THUMBS[p.dir] as readonly number[]).includes(width)) return withBase(path);
  return withBase(`/${p.dir}/w${width}/${p.name}.webp`);
}

/** srcset d'une illustration de couverture (vignettes + original), ou undefined pour une autre image. */
export function illustrationSrcSet(path: string): string | undefined {
  const p = parts(path);
  if (p?.dir !== "illustrations") return undefined;
  return [...THUMBS.illustrations.map((w) => `${thumb(path, w)} ${w}w`), `${withBase(path)} ${ILLUSTRATION_WIDTH}w`].join(", ");
}

/** srcset d'une image d'article Conseils (vignettes 400 et 800 px + original 1200 px), ou undefined pour une autre image. */
export function conseilSrcSet(path: string): string | undefined {
  const p = parts(path);
  if (p?.dir !== "conseils") return undefined;
  return [...THUMBS.conseils.map((w) => `${thumb(path, w)} ${w}w`), `${withBase(path)} ${CONSEIL_WIDTH}w`].join(", ");
}

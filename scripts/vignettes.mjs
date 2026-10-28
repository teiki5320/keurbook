/**
 * Vignettes d'images, plus légères que les originaux, pour les listes et les petites tailles.
 * Lancé avant `next dev` et `next build` (voir package.json) ; les fichiers produits ne sont pas suivis par git.
 *   public/illustrations/<nom>.webp (600 px) → public/illustrations/w300/<nom>.webp et w400/<nom>.webp
 *   public/authors/<nom>.(jpg|webp)          → public/authors/w200/<nom>.webp et w400/<nom>.webp
 *   public/conseils/<nom>.webp (1200 px)     → public/conseils/w400/<nom>.webp et w800/<nom>.webp
 * Les largeurs doivent rester celles de src/lib/images.ts. Une vignette déjà à jour n'est pas refaite.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const LOTS = [
  { dossier: "illustrations", largeurs: [300, 400] },
  { dossier: "authors", largeurs: [200, 400] },
  { dossier: "conseils", largeurs: [400, 800] },
];

let faites = 0;
for (const { dossier, largeurs } of LOTS) {
  const source = join(racine, dossier);
  const images = readdirSync(source).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
  for (const w of largeurs) mkdirSync(join(source, `w${w}`), { recursive: true });
  await Promise.all(
    images.map(async (f) => {
      const src = join(source, f);
      for (const w of largeurs) {
        const dest = join(source, `w${w}`, `${parse(f).name}.webp`);
        if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) continue;
        await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(dest);
        faites++;
      }
    }),
  );
}
console.log(`Vignettes : ${faites} créées ou mises à jour.`);

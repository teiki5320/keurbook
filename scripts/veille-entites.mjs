/**
 * Fichier public des fiches pour la veille actus : public/veille/entites.json.
 * Lancé avant `next build` (voir package.json, avec tsx pour lire les données écrites en TypeScript).
 * La tâche de veille le lit sur https://www.keurbook.com/veille/entites.json pour relier une actu à un auteur.
 * Contenu : seulement le nom public de chaque auteur, ses variantes d'écriture et son pays.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allAuthors } from "../src/lib/demo/index.ts";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Nom sans accents ni apostrophe courbe (« Mariama Bâ » → « Mariama Ba »), pour les sources qui les perdent. */
const sansAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’ʼ]/g, "'");

const entites = allAuthors
  .map((a) => {
    const autres = [...new Set([sansAccents(a.name), a.name.replace(/[’ʼ]/g, "'")])].filter((n) => n !== a.name);
    return { tag: `auteur:${a.slug}`, nom: a.name, autres_noms: autres, pays: a.countryCode };
  })
  .sort((x, y) => x.tag.localeCompare(y.tag));

const fichier = join(racine, "public", "veille", "entites.json");
mkdirSync(dirname(fichier), { recursive: true });
writeFileSync(fichier, `${JSON.stringify(entites, null, 2)}\n`);
console.log(`veille/entites.json : ${entites.length} auteurs`);

/**
 * Met à jour src/lib/lastmod.json : pour chaque page, l'empreinte de son contenu et le jour de son dernier changement
 * (lu par le plan du site, src/app/sitemap.ts). Lancé tout seul avant chaque construction (« prebuild » de package.json) :
 *   npm run build                              → le registre est mis à jour d'abord, sans commande à retenir
 *   npx tsx scripts/lastmod.mjs                → même chose, à la main
 *   npx tsx scripts/lastmod.mjs --historique   → reconstruit tout le registre depuis l'historique git
 * Date d'une page changée : aujourd'hui si son contenu n'est pas encore enregistré (commit) ; sinon le jour du dernier
 * commit de son fichier (article Conseils) ou des données du site. Le registre reste juste même si personne ne le
 * remet dans un commit (sur GitHub, il est recalculé à chaque publication : historique git complet, fetch-depth: 0).
 */
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { currentHashes, readLedger } from "../src/lib/lastmod.ts";

const racine = process.cwd();
const fichier = join(racine, "src", "lib", "lastmod.json");
const aujourdhui = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());
const git = (...args) => execFileSync("git", args, { cwd: racine, encoding: "utf8", maxBuffer: 1 << 26 });

/** Empreintes du contenu tel qu'il était dans un commit (copie temporaire du dépôt, avec le calcul d'aujourd'hui). */
function hashesAt(commit) {
  const dir = mkdtempSync(join(tmpdir(), "keurbook-lastmod-"));
  try {
    const archive = execFileSync("git", ["archive", commit, "src", "content", "tsconfig.json", "package.json"], { cwd: racine, maxBuffer: 1 << 28 });
    execFileSync("tar", ["-x", "-C", dir], { input: archive });
    cpSync(join(racine, "src", "lib", "lastmod.ts"), join(dir, "src", "lib", "lastmod.ts"));
    symlinkSync(join(racine, "node_modules"), join(dir, "node_modules"));
    const code = `import { currentHashes } from "./src/lib/lastmod.ts"; process.stdout.write(JSON.stringify(await currentHashes()));`;
    writeFileSync(join(dir, "run.mts"), code);
    return JSON.parse(execFileSync(join(racine, "node_modules", ".bin", "tsx"), ["run.mts"], { cwd: dir, encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    return null; // commit ancien que le calcul ne sait pas lire : ignoré
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** Dossiers et fichiers d'où viennent les pages datées par le registre. */
const SOURCES = ["src/lib/demo", "src/lib/top10", "src/lib/types.ts", "content/conseils"];

/** Jour du dernier commit qui touche ces chemins (AAAA-MM-JJ), ou null (pas de git, historique absent). */
function jourCommit(...chemins) {
  try {
    return git("log", "-1", "--format=%cs", "--", ...chemins).trim() || null;
  } catch {
    return null;
  }
}

/** Contenu modifié mais pas encore enregistré dans un commit : il change aujourd'hui. */
let nonEnregistre = true;
try {
  nonEnregistre = git("status", "--porcelain", "--", ...SOURCES).trim() !== "";
} catch {
  // pas de git : date du jour
}
const jourDonnees = nonEnregistre ? null : jourCommit(...SOURCES);
/** Jour du changement d'une page dont l'empreinte a changé depuis le registre. */
function jourChangement(cle) {
  if (nonEnregistre) return aujourdhui;
  const conseil = cle.match(/^conseils\/(.+)$/);
  const jour = (conseil && jourCommit(`content/conseils/${conseil[1]}.md`)) || jourDonnees || aujourdhui;
  return jour > aujourdhui ? aujourdhui : jour;
}

const actuel = await currentHashes();
let registre = readLedger(fichier);

if (process.argv.includes("--historique")) {
  registre = {};
  const commits = git("log", "--reverse", "--format=%H %cs", "--", "src/lib/demo", "src/lib/top10", "src/lib/types.ts", "content/conseils")
    .trim()
    .split("\n")
    .map((l) => l.split(" "));
  for (const [commit, jour] of commits) {
    const h = hashesAt(commit);
    if (!h) continue;
    for (const [cle, empreinte] of Object.entries(h)) if (registre[cle]?.h !== empreinte) registre[cle] = { h: empreinte, d: jour };
    process.stdout.write(".");
  }
  process.stdout.write("\n");
}

let changees = 0;
for (const [cle, empreinte] of Object.entries(actuel))
  if (registre[cle]?.h !== empreinte) {
    registre[cle] = { h: empreinte, d: jourChangement(cle) };
    changees++;
  }
// Pages disparues : retirées du registre.
for (const cle of Object.keys(registre)) if (!(cle in actuel)) delete registre[cle];

const trie = Object.fromEntries(Object.entries(registre).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(fichier, `${JSON.stringify(trie, null, 0).replace(/\},"/g, '},\n"').replace(/^\{/, "{\n").replace(/\}\}$/, "}\n}")}\n`);
console.log(`lastmod.json : ${Object.keys(trie).length} pages, ${changees} redatées.`);

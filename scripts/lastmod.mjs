/**
 * Met à jour src/lib/lastmod.json : pour chaque page, l'empreinte de son contenu et le jour de son dernier changement
 * (lu par le plan du site, src/app/sitemap.ts). À lancer après un changement de fiche, d'article ou de top 10 :
 *   npx tsx scripts/lastmod.mjs                → les pages changées prennent la date du jour (heure de Paris)
 *   npx tsx scripts/lastmod.mjs --historique   → reconstruit tout le registre depuis l'historique git
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
    registre[cle] = { h: empreinte, d: aujourdhui };
    changees++;
  }
// Pages disparues : retirées du registre.
for (const cle of Object.keys(registre)) if (!(cle in actuel)) delete registre[cle];

const trie = Object.fromEntries(Object.entries(registre).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(fichier, `${JSON.stringify(trie, null, 0).replace(/\},"/g, '},\n"').replace(/^\{/, "{\n").replace(/\}\}$/, "}\n}")}\n`);
console.log(`lastmod.json : ${Object.keys(trie).length} pages, ${changees} datées du ${aujourdhui}.`);

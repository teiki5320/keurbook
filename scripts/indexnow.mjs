/**
 * IndexNow : signale à Bing (et aux autres moteurs du protocole) les pages nouvelles ou modifiées.
 * Lit le sitemap construit (out/sitemap.xml) et envoie les adresses dont la date de modification est récente
 * (aujourd'hui ou hier, heure de Paris). Avec --all : toutes les adresses (premier envoi).
 * Usage : node scripts/indexnow.mjs [--all]
 * La clé n'est pas un secret : elle est publiée dans public/<clé>.txt, comme le demande le protocole.
 */
import { readFileSync } from "node:fs";

const KEY = "86e162766f5615ec8020869f4b66761d";
const HOST = "keurbook.com";
const all = process.argv.includes("--all");

const xml = readFileSync("out/sitemap.xml", "utf8");
const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ url: m[1], lastmod: m[2] ?? "" }));

const paris = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(d);
const today = paris(new Date());
const yesterday = paris(new Date(Date.now() - 86_400_000));
const urls = entries.filter((e) => all || e.lastmod.slice(0, 10) >= yesterday).map((e) => e.url);

if (urls.length === 0) {
  console.log(`IndexNow : aucune page nouvelle au ${today}.`);
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10_000) }),
});
console.log(`IndexNow : ${urls.length} adresse(s) envoyée(s), réponse ${res.status}.`);
// 200 et 202 : accepté. Un refus ne doit pas faire échouer la publication.
if (res.status >= 400) console.log("::warning::IndexNow a refusé l'envoi :", await res.text());

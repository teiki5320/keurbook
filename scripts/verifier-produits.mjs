// Vérification de la disponibilité des livres à lien direct Amazon (à lancer sur le Mac, pas sur GitHub :
// Amazon bloque souvent les serveurs). Modèle : Keurdeco (scripts/verifier-produits.mjs).
// Pour chaque ASIN de src/lib/demo/amazon-asins.json (« actifs »), la page amazon.fr/dp/<ASIN> est ouverte
// dans Chrome : si le bouton d'achat (« Ajouter au panier ») est présent, verifie_le passe à la date du jour ;
// sinon le livre passe dans « indisponibles » (ASIN conservé, date notée) et son bouton revient à une
// recherche Amazon. Les liens de recherche (livres sans ASIN) n'ont pas besoin d'être vérifiés.
// Rien n'est inventé : seul l'état lu sur la page est enregistré.
//
// Usage : npm run verifier-produits              (rapport seul)
//         npm run verifier-produits -- --ecrire  (met à jour src/lib/demo/amazon-asins.json)
//         npm run verifier-produits -- --ecrire --lot 30
//           (seulement les 30 livres vérifiés il y a le plus longtemps, avec des pauses plus longues :
//            Amazon tolère mieux un passage quotidien par petits lots qu'une rafale de 200 pages)
//         npm run verifier-produits -- --ecrire --ids slug1,slug2,…   (seulement ces livres)
// Après --ecrire : npm test (contrôle ASIN ↔ ISBN), puis commit du fichier JSON.
// Chrome : CHROMIUM_PATH=/chemin/vers/chrome (par défaut, Google Chrome sur macOS).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const RACINE = resolve(import.meta.dirname, '..');
const FICHIER = resolve(RACINE, 'src/lib/demo/amazon-asins.json');
const ecrire = process.argv.includes('--ecrire');
const aujourdhui = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const chrome = process.env.CHROMIUM_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const donnees = JSON.parse(readFileSync(FICHIER, 'utf8'));
const tous = Object.entries(donnees.actifs).map(([slug, v]) => ({ slug, ...v }));
const iLot = process.argv.indexOf('--lot');
const lot = iLot > -1 ? Number(process.argv[iLot + 1]) || 30 : 0;
const iIds = process.argv.indexOf('--ids');
const ids = iIds > -1 ? new Set(String(process.argv[iIds + 1] || '').split(',').map((s) => s.trim()).filter(Boolean)) : null;
if (ids) for (const id of ids) if (!donnees.actifs[id]) console.log(`? ${id} : pas un livre avec ASIN actif, ignoré`);
const aVerifier = ids
  ? tous.filter((p) => ids.has(p.slug))
  : lot
    ? [...tous].sort((a, b) => String(a.verifie_le || '').localeCompare(String(b.verifie_le || ''))).slice(0, lot)
    : tous;

const navigateur = await chromium.launch({ executablePath: chrome, headless: true });
const page = await (await navigateur.newContext({ locale: 'fr-FR' })).newPage();
// Pages plus légères : ni images, ni polices, ni styles (seul le contenu est lu).
await page.route('**/*', (r) => (['image', 'media', 'font', 'stylesheet'].includes(r.request().resourceType()) ? r.abort() : r.continue()));
const disponibles = [];
const indisponibles = [];
let bloque = false;

for (const p of aVerifier) {
  let etat;
  try {
    const reponse = await page.goto(`https://www.amazon.fr/dp/${p.asin}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    etat = await page.evaluate(() => ({
      captcha: !!document.querySelector('form[action*="validateCaptcha"]'),
      achat: !!document.querySelector('#add-to-cart-button, #buy-now-button'),
      titre: (document.querySelector('#productTitle')?.textContent || '').trim(),
    }));
    etat.statut = reponse?.status() ?? 0;
  } catch (e) {
    console.log(`? ${p.slug} (${p.asin}) : erreur de chargement, non modifié (${e.message.split('\n')[0]})`);
    continue;
  }
  if (etat.captcha) {
    bloque = true;
    console.log(`Amazon demande une vérification (captcha) : arrêt, aucun livre modifié après ${p.slug}.`);
    break;
  }
  if (etat.achat) disponibles.push(p);
  else {
    indisponibles.push(p);
    console.log(`✗ ${p.slug} (${p.asin}) : plus achetable neuf (HTTP ${etat.statut})${etat.titre ? ` · ${etat.titre.slice(0, 60)}` : ''}`);
  }
  await page.waitForTimeout(lot ? 4000 + Math.random() * 4000 : 1200 + Math.random() * 1500); // rythme humain, pour ne pas surcharger Amazon
}
await navigateur.close();

console.log(`\n${disponibles.length} livre(s) disponible(s), ${indisponibles.length} indisponible(s), ${aVerifier.length - disponibles.length - indisponibles.length} non vérifié(s).`);
if (lot) console.log(`Lot du jour : ${aVerifier.length} sur ${tous.length} livres à lien direct.`);
if (ecrire) {
  for (const p of disponibles) donnees.actifs[p.slug].verifie_le = aujourdhui;
  for (const p of indisponibles) {
    delete donnees.actifs[p.slug];
    donnees.indisponibles[p.slug] = { asin: p.asin, constate_le: aujourdhui, note: "Plus de bouton d'achat sur Amazon.fr : retour à la recherche Amazon." };
  }
  writeFileSync(FICHIER, JSON.stringify(donnees, null, 2) + '\n');
  console.log(`src/lib/demo/amazon-asins.json mis à jour (${aujourdhui}).`);
}
if (indisponibles.length) console.log('Passés à la recherche Amazon (chercher une autre édition achetable si besoin) : ' + indisponibles.map((p) => p.slug).join(', '));
process.exit(bloque ? 2 : 0);

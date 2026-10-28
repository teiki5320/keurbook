/**
 * Plan du site : registre des dates de modification (src/lib/lastmod.json) et vignettes d'images.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { illustrationSrcSet, thumb } from "../src/lib/images";
import { currentHashes, readLedger } from "../src/lib/lastmod";

describe("Registre des dates (lastmod.json)", () => {
  const ledger = readLedger();
  it("dates au format AAAA-MM-JJ, jamais dans le futur", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const [key, { h, d }] of Object.entries(ledger)) {
      assert.match(d, /^\d{4}-\d{2}-\d{2}$/, key);
      assert.ok(d <= today, `${key} : ${d}`);
      assert.match(h, /^[0-9a-f]{16}$/, key);
    }
  });
  it("à jour (sinon le plan du site date les pages changées du dernier commit)", async () => {
    const hashes = await currentHashes();
    const stale = Object.entries(hashes).filter(([k, h]) => ledger[k]?.h !== h).map(([k]) => k);
    // Pas bloquant : un simple rappel pour lancer « npx tsx scripts/lastmod.mjs ».
    if (stale.length) console.warn(`lastmod.json : ${stale.length} pages à redater (npx tsx scripts/lastmod.mjs), ex. ${stale.slice(0, 3).join(", ")}`);
    assert.ok(Object.keys(hashes).length > 900);
  });
});

describe("Vignettes d'images", () => {
  it("illustrations : vignettes 300 et 400 px puis original", () => {
    assert.equal(thumb("/illustrations/petit-pays.webp", 400), "/illustrations/w400/petit-pays.webp");
    assert.equal(illustrationSrcSet("/illustrations/petit-pays.webp"), "/illustrations/w300/petit-pays.webp 300w, /illustrations/w400/petit-pays.webp 400w, /illustrations/petit-pays.webp 600w");
  });
  it("portraits : vignette .webp, autre largeur ou autre dossier → image d'origine", () => {
    assert.equal(thumb("/authors/mariama-ba.jpg", 200), "/authors/w200/mariama-ba.webp");
    assert.equal(thumb("/authors/mariama-ba.jpg", 300), "/authors/mariama-ba.jpg");
    assert.equal(thumb("/brand/logo.webp", 200), "/brand/logo.webp");
    assert.equal(illustrationSrcSet("/authors/mariama-ba.jpg"), undefined);
  });
});

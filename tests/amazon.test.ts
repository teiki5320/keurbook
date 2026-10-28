/**
 * Liens Amazon : chaque lien porte un code de suivi tiré de la table unique de src/lib/amazon.ts (AMAZON_TAGS).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AMAZON_TAGS, amazonUrl, type AmazonEmplacement } from "../src/lib/amazon";
import { allBooks } from "../src/lib/demo";

const emplacements = Object.keys(AMAZON_TAGS) as AmazonEmplacement[];
const codes = new Set(Object.values(AMAZON_TAGS));

describe("Codes de suivi Amazon", () => {
  it("la table donne un code valide à chaque emplacement", () => {
    assert.deepEqual([...emplacements].sort(), ["conseil", "fiche", "rubrique", "top"]);
    for (const e of emplacements) assert.match(AMAZON_TAGS[e], /^[a-z0-9]+-21$/, e);
  });

  it("chaque lien (fiche directe ou recherche) a un tag, qui fait partie de la table", () => {
    for (const book of allBooks.filter((b) => b.isPublished)) {
      for (const e of emplacements) {
        const url = new URL(amazonUrl(book, e));
        assert.equal(url.hostname, "www.amazon.fr", book.slug);
        const tag = url.searchParams.get("tag");
        assert.ok(tag && codes.has(tag), `${book.slug} (${e}) : tag absent ou hors table`);
        assert.equal(tag, AMAZON_TAGS[e]);
      }
    }
  });
});

describe("ASIN vérifiés (src/lib/demo/amazon-asins.json)", () => {
  it("chaque ASIN a une date de vérification, et L'Empire peul du Macina reste sans lien direct", async () => {
    const { AMAZON_ASINS, AMAZON_ASINS_VERIFIES_LE } = await import("../src/lib/demo/amazon-asins");
    for (const slug of Object.keys(AMAZON_ASINS)) assert.match(AMAZON_ASINS_VERIFIES_LE[slug] ?? "", /^20\d\d-\d\d-\d\d$/, slug);
    assert.equal(AMAZON_ASINS["l-empire-peul-du-macina"], undefined);
    assert.equal(allBooks.find((b) => b.slug === "l-empire-peul-du-macina")?.amazonAsin ?? null, null);
  });
});

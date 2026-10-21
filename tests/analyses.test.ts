/**
 * Tests de « Le livre en détail » (src/lib/demo/analyses, règles docs/ANALYSES.md).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { allBooks } from "../src/lib/demo";
import { BOOK_ANALYSES } from "../src/lib/demo/analyses";

const slugs = new Set(allBooks.filter((b) => b.isPublished).map((b) => b.slug));
const mots = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

describe("Le livre en détail", () => {
  it("chaque texte correspond à une fiche publiée", () => {
    assert.deepEqual(Object.keys(BOOK_ANALYSES).filter((s) => !slugs.has(s)), []);
  });
  for (const [slug, a] of Object.entries(BOOK_ANALYSES)) {
    it(`« ${slug} » : trois parties, 250 à 450 mots`, () => {
      for (const p of [a.contexte, a.ecriture, a.aQui]) assert.ok(mots(p) >= 50, `partie trop courte (${mots(p)} mots)`);
      const total = mots(a.contexte) + mots(a.ecriture) + mots(a.aQui);
      assert.ok(total >= 250 && total <= 450, `${total} mots`);
      const tout = `${a.contexte} ${a.ecriture} ${a.aQui}`;
      assert.doesNotMatch(tout, /\b(acheter|achetez|promo|meilleur rapport|en stock|petit prix|bon prix)\b/i, "pas de vocabulaire de vente");
      for (const m of tout.matchAll(/\/(livre|bd|auteur|pays)\/([a-z0-9-]+)/g)) if (m[1] !== "auteur" && m[1] !== "pays") assert.ok(slugs.has(m[2]), `lien vers une fiche absente : ${m[0]}`);
    });
  }
});

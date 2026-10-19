/**
 * Tests de la page « Top 10 » : exactement 10 livres publiés par sujet, textes complets, liens internes valides.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { COUNTRIES } from "../src/lib/countries";
import { allAuthors, allBooks } from "../src/lib/demo";
import { AMAZON_ASINS } from "../src/lib/demo/amazon-asins";
import { TOP10S } from "../src/lib/top10/sujets";

const published = new Map(allBooks.filter((b) => b.isPublished).map((b) => [b.slug, b]));
const conseils = new Set(readdirSync(join(import.meta.dirname, "..", "content", "conseils")).map((f) => f.replace(/\.md$/, "")));

/** ISBN-13 (978…) → ISBN-10, pour vérifier les ASIN des livres papier. */
function isbn10(isbn: string): string {
  const d = isbn.replace(/[^0-9X]/gi, "");
  if (d.length === 10) return d;
  const core = d.slice(3, 12);
  const sum = [...core].reduce((s, c, i) => s + (10 - i) * Number(c), 0);
  const check = (11 - (sum % 11)) % 11;
  return core + (check === 10 ? "X" : String(check));
}

/** Un chemin interne pointe-t-il vers une page du site ? */
function exists(path: string): boolean {
  const [, section, slug] = path.split("/");
  if (!slug) return ["livres", "bd", "auteurs", "pays", "conseils", "top-10"].includes(section);
  if (section === "livre") return published.get(slug)?.kind === "livre";
  if (section === "bd") return published.get(slug)?.kind === "bd";
  if (section === "auteur") return allAuthors.some((a) => a.slug === slug);
  if (section === "pays") return COUNTRIES.some((c) => c.slug === slug);
  if (section === "conseils") return conseils.has(slug);
  if (section === "top-10") return TOP10S.some((t) => t.slug === slug);
  return false;
}

describe("Top 10", () => {
  it("adresses et onglets uniques", () => {
    const slugs = TOP10S.map((t) => t.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    assert.equal(new Set(TOP10S.map((t) => t.tab)).size, slugs.length);
    for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  for (const t of TOP10S) {
    describe(t.slug, () => {
      it("exactement 10 livres publiés, sans doublon", () => {
        assert.equal(t.items.length, 10);
        const slugs = t.items.map((i) => i.slug);
        assert.equal(new Set(slugs).size, 10);
        for (const s of slugs) assert.ok(published.has(s), `livre absent ou non publié : ${s}`);
      });

      it("titre « Top 10 des … », description de 70 à 160 caractères, intro de 2 ou 3 phrases", () => {
        assert.match(t.title, /^Top 10 des /);
        assert.ok(t.description.length >= 70 && t.description.length <= 160, `${t.description.length} caractères`);
        const sentences = t.intro.split(/(?<=[.!?])\s+/).length;
        assert.ok(sentences >= 2 && sentences <= 3, `${sentences} phrases`);
      });

      it("chaque livre a de quoi remplir « Pourquoi le lire »", () => {
        for (const i of t.items) {
          if (i.why) assert.ok(i.why.length >= 120 && i.why.length <= 500, `${i.slug} : ${i.why.length} caractères`);
          else assert.ok((published.get(i.slug)?.whyRead.length ?? 0) >= 2, `${i.slug} : fiche sans « Pourquoi le lire »`);
        }
      });

      it("3 questions fréquentes et un « Par où commencer »", () => {
        assert.equal(t.faq.length, 3);
        assert.ok(t.start.length > 40);
      });

      it("liens internes vers des pages existantes", () => {
        const text = [t.start, ...t.faq.map((f) => f.a)].join(" ");
        for (const [, path] of text.matchAll(/\]\((\/[^)\s]*)\)/g)) assert.ok(exists(path), `lien cassé : ${path}`);
      });

      it("ni prix ni note dans les textes", () => {
        assert.doesNotMatch(JSON.stringify(t), /\d+(,\d+)?\s?€|étoile|★|\/\s?(5|10)\b/);
      });
    });
  }
});

describe("ASIN Amazon vérifiés", () => {
  it("chaque ASIN correspond à l'ISBN de l'édition de la fiche", () => {
    for (const [slug, asin] of Object.entries(AMAZON_ASINS)) {
      const book = published.get(slug);
      assert.ok(book, `livre inconnu : ${slug}`);
      assert.ok(book.isbn, `${slug} : pas d'ISBN sur la fiche`);
      assert.equal(asin, isbn10(book.isbn), slug);
      assert.equal(book.amazonAsin, asin, `${slug} : ASIN non appliqué`);
    }
  });
});

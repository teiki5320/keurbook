/**
 * Tests des pages « Nos sélections » : uniquement des livres publiés du site, données complètes et cohérentes.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { allBooks } from "../src/lib/demo";
import { AMAZON_ASINS } from "../src/lib/demo/amazon-asins";
import { SELECTIONS } from "../src/lib/selections";

const published = new Map(allBooks.filter((b) => b.isPublished && b.kind === "livre").map((b) => [b.slug, b]));

/** ISBN-13 (978…) → ISBN-10, pour vérifier les ASIN des livres papier. */
function isbn10(isbn13: string): string {
  const core = isbn13.replace(/[^0-9]/g, "").slice(3, 12);
  const sum = [...core].reduce((s, d, i) => s + (10 - i) * Number(d), 0);
  const check = (11 - (sum % 11)) % 11;
  return core + (check === 10 ? "X" : String(check));
}

describe("Nos sélections", () => {
  it("adresses uniques, en minuscules sans accent", () => {
    const slugs = SELECTIONS.map((s) => s.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  for (const s of SELECTIONS) {
    describe(s.slug, () => {
      it("description de 70 à 160 caractères, titre en italique cohérent", () => {
        assert.ok(s.description.length >= 70 && s.description.length <= 160, `${s.description.length} caractères`);
        if (s.titleItalic) assert.ok(s.title.endsWith(s.titleItalic));
        assert.match(s.updated, /^\d{4}-\d{2}-\d{2}$/);
      });

      it("uniquement des livres publiés du site, sans doublon", () => {
        const slugs = s.items.map((i) => i.slug);
        assert.equal(new Set(slugs).size, slugs.length);
        for (const slug of slugs) assert.ok(published.has(slug), `livre absent ou non publié : ${slug}`);
      });

      it("chaque livre a une envie connue et un texte « Pourquoi le lire »", () => {
        for (const i of s.items) {
          assert.ok(s.envies[i.envie], `${i.slug} : envie inconnue « ${i.envie} »`);
          assert.ok(i.why.length >= 120 && i.why.length <= 500, `${i.slug} : ${i.why.length} caractères`);
        }
        for (const key of Object.keys(s.envies)) assert.ok(s.items.some((i) => i.envie === key), `envie sans livre : ${key}`);
      });

      it("trois portes d'entrée prises dans la sélection", () => {
        assert.equal(s.highlights.length, 3);
        for (const h of s.highlights) assert.ok(s.items.some((i) => i.slug === h.slug), `hors sélection : ${h.slug}`);
      });

      it("liens internes du guide et de la FAQ vers des pages existantes", () => {
        const text = [...s.guide.map((g) => g.a), ...s.faq.map((f) => f.a)].join(" ");
        for (const [, path] of text.matchAll(/\]\((\/[^)\s]*)\)/g)) {
          const m = path.match(/^\/livre\/(.+)$/);
          if (m) assert.ok(published.has(m[1]), `lien vers un livre absent : ${path}`);
          else assert.ok(["/pays", "/auteurs", "/livres", "/conseils", "/selections"].includes(path) || /^\/(pays|auteur|conseils)\/[a-z0-9-]+$/.test(path), `lien inattendu : ${path}`);
        }
      });

      it("ni prix ni note dans les textes", () => {
        const text = JSON.stringify(s);
        assert.doesNotMatch(text, /\d+(,\d+)?\s?€|étoile|★|\/\s?(5|10)\b/);
      });
    });
  }
});

describe("ASIN Amazon vérifiés", () => {
  it("chaque ASIN correspond à l'ISBN-10 de l'édition de la fiche", () => {
    for (const [slug, asin] of Object.entries(AMAZON_ASINS)) {
      const book = published.get(slug);
      assert.ok(book, `livre inconnu : ${slug}`);
      assert.ok(book.isbn, `${slug} : pas d'ISBN sur la fiche`);
      assert.equal(asin, isbn10(book.isbn), slug);
      assert.equal(book.amazonAsin, asin, `${slug} : ASIN non appliqué`);
    }
  });
});

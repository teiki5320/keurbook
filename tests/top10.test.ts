/**
 * Tests de la page « Top 10 » : exactement 10 livres publiés par sujet, textes complets, liens internes valides.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { ageFromSheet } from "../src/lib/book-utils";
import { COUNTRIES } from "../src/lib/countries";
import { allAuthors, allBooks } from "../src/lib/demo";
import { AMAZON_ASINS, AMAZON_INDISPONIBLES } from "../src/lib/demo/amazon-asins";
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

      it("chaque livre a son propre « Pourquoi le lire » (3 ou 4 phrases)", () => {
        for (const i of t.items) {
          assert.ok(i.why, `${i.slug} : texte « Pourquoi le lire » manquant`);
          assert.ok(i.why.length >= 120 && i.why.length <= 500, `${i.slug} : ${i.why.length} caractères`);
          const n = i.why.split(/(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-ÞÉ«])/).length;
          assert.ok(n >= 3 && n <= 4, `${i.slug} : ${n} phrases`);
        }
      });

      it("l'intro dit comment le classement est fait et nomme le n° 1", () => {
        assert.match(t.intro, /class/);
        const first = published.get(t.items[0].slug)!;
        assert.ok(t.intro.includes(first.title), `l'intro ne cite pas le n° 1 (${first.title})`);
      });

      it("image de partage présente", () => {
        assert.ok(existsSync(join(import.meta.dirname, "..", "public", "top10", `${t.slug}.jpg`)), "lancer : npx tsx scripts/images-top10.ts");
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
        // Notes du type « 4/5 », « ★ » ou « 3 étoiles » (le mot seul, comme dans « Ma Sœur-Étoile », est permis).
        assert.doesNotMatch(JSON.stringify(t), /\d+(,\d+)?\s?€|★|\d\s?étoiles?\b|\d\s?\/\s?(5|10)\b/);
      });
    });
  }
});

describe("Doublons entre onglets", () => {
  it("un livre apparaît dans 2 onglets au plus", () => {
    const count = new Map<string, number>();
    for (const t of TOP10S) for (const i of t.items) count.set(i.slug, (count.get(i.slug) ?? 0) + 1);
    for (const [slug, n] of count) assert.ok(n <= 2, `${slug} : ${n} onglets`);
  });
  it("deux onglets partagent 2 livres au plus", () => {
    for (const [a, ta] of TOP10S.entries())
      for (const tb of TOP10S.slice(a + 1)) {
        const common = ta.items.filter((i) => tb.items.some((j) => j.slug === i.slug)).map((i) => i.slug);
        assert.ok(common.length <= 2, `${ta.slug} / ${tb.slug} : ${common.join(", ")}`);
      }
  });
  it("le n° 1 de chaque onglet a un lien Amazon direct (sauf si sa vérification l'a trouvé plus vendu neuf)", () => {
    // Exception datée : un ASIN passé en « indisponibles » par npm run verifier-produits (édition de la fiche
    // seulement d'occasion) ; le bouton mène alors à la recherche, en attendant une édition neuve vérifiée.
    for (const t of TOP10S) {
      const slug = t.items[0].slug;
      if (AMAZON_INDISPONIBLES[slug]) continue;
      assert.ok(published.get(slug)?.amazonAsin, `${t.slug} : n° 1 sans ASIN`);
    }
  });
});

describe("Tops par âge", () => {
  const tab = (slug: string) => TOP10S.find((t) => t.slug === slug)!.items.map((i) => published.get(i.slug)!);
  it("« Pour enfants » : uniquement des livres et BD jeunesse", () => {
    for (const b of tab("livres-africains-enfants")) assert.equal(b.audience, "jeunesse", b.slug);
  });
  it("« Pour ados » : uniquement des livres ado, 10 titres différents (un tome par série)", () => {
    const books = tab("livres-africains-ados");
    for (const b of books) assert.equal(b.audience, "ado", b.slug);
    assert.equal(new Set(books.map((b) => b.title)).size, 10);
  });
  it("âge conseillé seulement s'il est écrit dans la fiche", () => {
    assert.equal(ageFromSheet(published.get("akissi")!), "Dès 6 ans");
    assert.equal(ageFromSheet(published.get("un-enfant-d-afrique")!), "De 10 à 14 ans");
    assert.equal(ageFromSheet(published.get("l-enfant-noir")!), null);
  });
});

describe("ASIN Amazon vérifiés", () => {
  it("chaque ASIN correspond à l'ISBN de l'édition de la fiche", () => {
    for (const [slug, asin] of Object.entries(AMAZON_ASINS)) {
      const book = published.get(slug);
      assert.ok(book, `livre inconnu : ${slug}`);
      assert.ok(book.isbn, `${slug} : pas d'ISBN sur la fiche`);
      // ISBN 979… : pas d'ISBN-10, l'ASIN Amazon (B0…) a été vérifié sur la page de cet ISBN-13.
      if (book.isbn.startsWith("979")) assert.match(asin, /^B0[A-Z0-9]{8}$/, slug);
      else assert.equal(asin, isbn10(book.isbn), slug);
      assert.equal(book.amazonAsin, asin, `${slug} : ASIN non appliqué`);
    }
  });
});

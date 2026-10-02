/**
 * Tests des contenus : livres, BD, auteurs et pays cohérents entre eux, règles de docs/REDACTION.md.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { authorSlugsOf, bookCountry, creators } from "../src/lib/book-utils";
import { COUNTRIES, SUBSAHARAN_CODES } from "../src/lib/countries";
import { allAuthors, allBooks } from "../src/lib/demo";
import { isTheme } from "../src/lib/themes";

const books = allBooks.filter((b) => b.isPublished);
const authorMap = new Map(allAuthors.map((a) => [a.slug, a]));
const countryCodes = new Set(COUNTRIES.map((c) => c.code));
const subsaharan = new Set<string>(SUBSAHARAN_CODES);

/** Contrôle de l'ISBN-10 ou ISBN-13. */
function validIsbn(raw: string): boolean {
  const s = raw.replace(/[-\s]/g, "").toUpperCase();
  if (/^\d{9}[\dX]$/.test(s)) {
    const sum = [...s].reduce((acc, ch, i) => acc + (ch === "X" ? 10 : Number(ch)) * (10 - i), 0);
    return sum % 11 === 0;
  }
  if (/^\d{13}$/.test(s)) {
    const sum = [...s].reduce((acc, ch, i) => acc + Number(ch) * (i % 2 ? 3 : 1), 0);
    return sum % 10 === 0;
  }
  return false;
}

const dupes = (list: string[]) => list.filter((s, i) => list.indexOf(s) !== i);

describe("Livres et BD", () => {
  it("slugs uniques", () => assert.deepEqual(dupes(allBooks.map((b) => b.slug)), []));
  it("au moins 60 livres et 10 BD", () => {
    assert.ok(books.filter((b) => b.kind === "livre").length >= 60);
    assert.ok(books.filter((b) => b.kind === "bd").length >= 10);
  });
  for (const b of books) {
    it(`« ${b.slug} » est complet et cohérent`, () => {
      assert.match(b.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, "slug en minuscules, sans accents");
      assert.ok(creators(b).length > 0, "au moins un auteur");
      assert.ok(authorSlugsOf(b).length > 0, "au moins un auteur avec une fiche");
      for (const s of authorSlugsOf(b)) assert.ok(authorMap.has(s), `fiche auteur inconnue : ${s}`);
      assert.ok(bookCountry(b, authorMap), "pays du livre introuvable");
      assert.equal(b.kind === "bd", b.genre === "bd", "genre « bd » réservé aux BD");
      assert.ok(b.summary.length >= 150 && b.summary.length <= 1000, `résumé de ${b.summary.length} caractères`);
      assert.ok(b.whyRead.length >= 2 && b.whyRead.length <= 3, "2 ou 3 raisons de le lire");
      assert.ok(b.themes.length >= 1 && b.themes.every(isTheme), "thèmes valides");
      if (b.quote) assert.ok(b.quote.text.length <= 200, "citation de 2 lignes au maximum");
      assert.ok(b.year >= 1900 && b.year <= 2026, `année ${b.year}`);
      if (b.isbn) assert.ok(validIsbn(b.isbn), `ISBN invalide : ${b.isbn}`);
      if (b.amazonAsin) assert.match(b.amazonAsin, /^[0-9A-Z]{10}$/, "ASIN de 10 caractères");
      if (b.originalLanguage) assert.ok(b.contributors.some((c) => c.role === "traducteur"), "traducteur à indiquer pour une traduction");
      assert.match(b.addedAt, /^\d{4}-\d{2}-\d{2}$/);
    });
  }
});

describe("Auteurs", () => {
  it("slugs uniques", () => assert.deepEqual(dupes(allAuthors.map((a) => a.slug)), []));
  for (const a of allAuthors) {
    it(`« ${a.slug} » est complet et cohérent`, () => {
      assert.ok(countryCodes.has(a.countryCode), `pays absent de countries.ts : ${a.countryCode}`);
      assert.ok(subsaharan.has(a.countryCode), `pays hors Afrique subsaharienne : ${a.countryCode}`);
      assert.ok(a.bio.length >= 200, "biographie trop courte");
      const own = books.filter((b) => authorSlugsOf(b).includes(a.slug));
      assert.ok(own.length > 0, "aucun livre sur le site");
      if (a.startWith) assert.ok(own.some((b) => b.slug === a.startWith), `« par où commencer » hors de ses livres : ${a.startWith}`);
    });
  }
});

describe("Pays", () => {
  it("codes uniques et en Afrique subsaharienne", () => {
    assert.deepEqual(dupes(COUNTRIES.map((c) => c.code)), []);
    for (const c of COUNTRIES) assert.ok(subsaharan.has(c.code), c.code);
  });
  for (const c of COUNTRIES) {
    it(`« ${c.slug} » : livres conseillés du pays`, () => {
      assert.ok(c.description.length > 0, "présentation manquante");
      assert.ok(c.startWith.length <= 3);
      for (const s of c.startWith) {
        const b = books.find((x) => x.slug === s);
        assert.ok(b, `livre inconnu : ${s}`);
        assert.equal(bookCountry(b!, authorMap), c.code, `${s} n'est pas un livre du pays`);
      }
    });
  }
});

describe("Compléments (extras)", async () => {
  const { AUTHOR_FACTS, BOOK_ADAPTATIONS, BOOK_QUOTES } = await import("../src/lib/demo/extras");
  const bookSlugs = new Set(allBooks.map((b) => b.slug));
  it("les anecdotes visent des auteurs du site, 4 au plus, phrases courtes", () => {
    for (const [slug, facts] of Object.entries(AUTHOR_FACTS)) {
      assert.ok(authorMap.has(slug), `auteur inconnu : ${slug}`);
      assert.ok(facts.length >= 1 && facts.length <= 4, `${slug} : ${facts.length} anecdotes`);
      for (const f of facts) assert.ok(f.length <= 260, `${slug} : anecdote trop longue`);
    }
  });
  it("les citations visent des livres du site et font moins de 200 caractères", () => {
    for (const [slug, q] of Object.entries(BOOK_QUOTES)) {
      assert.ok(bookSlugs.has(slug), `livre inconnu : ${slug}`);
      assert.ok(q.text.length > 0 && q.text.length < 200, `${slug} : citation de ${q.text.length} caractères`);
    }
  });
  it("les adaptations visent des livres du site, sans doublon", () => {
    for (const [slug, list] of Object.entries(BOOK_ADAPTATIONS)) {
      assert.ok(bookSlugs.has(slug), `livre inconnu : ${slug}`);
      const book = allBooks.find((b) => b.slug === slug)!;
      const keys = (book.adaptations ?? []).map((a) => `${a.kind}|${a.title}|${a.year}`);
      assert.equal(new Set(keys).size, keys.length, `${slug} : adaptation en double`);
      for (const a of list) assert.ok(a.year > 1890 && a.year < 2030, `${slug} : année ${a.year}`);
    }
  });
});

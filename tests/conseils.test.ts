/**
 * Tests de la rubrique Conseils : en-têtes complets, livres cités et liens internes valides
 * à la date de publication de chaque article, publication programmée.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { DESCRIPTION_MAX, DESCRIPTION_MIN, internalLinks, isPublished, parseConseil, todayInParis, type Conseil } from "../src/lib/conseils/article";
import { COUNTRIES } from "../src/lib/countries";
import { allAuthors, allBooks } from "../src/lib/demo";

const root = join(import.meta.dirname, "..");
const dir = join(root, "content", "conseils");
const conseils: Conseil[] = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8")));
const bySlug = new Map(conseils.map((c) => [c.slug, c]));
const published = allBooks.filter((b) => b.isPublished);
const livres = new Set(published.filter((b) => b.kind === "livre").map((b) => b.slug));
const bd = new Set(published.filter((b) => b.kind === "bd").map((b) => b.slug));
const authors = new Set(allAuthors.map((a) => a.slug));

/** Vrai si le lien interne mène à une page existante le jour où l'article paraît. */
function validAt(path: string, date: string): boolean {
  const [, section, slug] = path.split("/");
  if (["", "livres", "bd", "auteurs", "pays", "conseils", "pile-a-lire"].includes(path.slice(1))) return true;
  if (section === "livre") return livres.has(slug);
  if (section === "bd") return bd.has(slug);
  if (section === "auteur") return authors.has(slug);
  if (section === "pays") return COUNTRIES.some((c) => c.slug === slug);
  if (section === "conseils") {
    const target = bySlug.get(slug);
    return Boolean(target && target.date <= date);
  }
  return false;
}

describe("Conseils : en-têtes", () => {
  it("contient au moins un article", () => assert.ok(conseils.length > 0));
  for (const c of conseils) {
    it(`« ${c.slug} » a un en-tête complet`, () => {
      assert.match(c.title, /\?$/, "le titre doit être la question (terminée par « ? »)");
      assert.ok(c.description.length >= DESCRIPTION_MIN && c.description.length <= DESCRIPTION_MAX, `description de ${c.description.length} caractères (attendu ${DESCRIPTION_MIN} à ${DESCRIPTION_MAX})`);
      assert.match(c.date, /^\d{4}-\d{2}-\d{2}$/, "date au format AAAA-MM-JJ");
      assert.ok([1, 3, 5].includes(new Date(`${c.date}T12:00:00Z`).getUTCDay()), "publication un lundi, un mercredi ou un vendredi");
      assert.ok(c.resume.length > 0, "réponse courte (resume) obligatoire");
      assert.ok(c.body.length > 0, "corps de l'article vide");
    });
  }
});

describe("Conseils : livres cités et liens internes", () => {
  for (const c of conseils) {
    it(`« ${c.slug} » ne pointe que vers des pages existantes au ${c.date}`, () => {
      for (const path of internalLinks(c.body)) assert.ok(validAt(path, c.date), `lien invalide : ${path}`);
      for (const s of c.livres) assert.ok(livres.has(s) || bd.has(s), `livre inconnu : ${s}`);
    });
  }
});

describe("Conseils : publication programmée", () => {
  const future = parseConseil("article-futur", "---\ntitle: Question future ?\ndescription: x\ndate: 2099-01-05\ntheme: decouvrir\nresume: x\n---\nTexte.");
  it("un article daté du futur n'est pas publié", () => assert.equal(isPublished(future, todayInParis()), false));
  it("un article est publié le jour même (heure de Paris)", () => assert.equal(isPublished(future, "2099-01-05"), true));
  it("la date du jour à Paris passe minuit à l'heure française", () => assert.equal(todayInParis(new Date("2026-01-04T23:30:00Z")), "2026-01-05"));
});

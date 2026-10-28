/**
 * Tests des articles complets des actus : contrôle d'un article, choix du lien d'une carte,
 * page de secours (id lu dans l'adresse) et fiches liées.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { articleValide, idsIndexArticles, fichesDesTags, idDepuisRecherche, lienActu, nettoyerArticle, nomDomaine, slugValide, type Actu } from "../src/lib/veille";

const exemple = JSON.parse(readFileSync(join(import.meta.dirname, "fixtures", "article-exemple.json"), "utf8"));
const ID = exemple.id as string;

const actu = (x: Partial<Actu> = {}): Actu => ({
  id: ID,
  titre: exemple.titre,
  resume: "Un résumé réécrit de deux phrases, pour le test.",
  source_nom: "SenePlus",
  source_url: exemple.source_url,
  publie_le: exemple.publie_le,
  image: exemple.image,
  ...x,
});

describe("articles des actus", () => {
  it("accepte un article conforme au schéma v1", () => {
    assert.ok(articleValide(exemple));
    const propre = nettoyerArticle(exemple);
    assert.equal(propre?.slug, exemple.slug);
    assert.equal(propre?.blocs[0].intertitre, null);
  });

  it("écarte un article incomplet ou dangereux", () => {
    assert.ok(!articleValide(null));
    assert.ok(!articleValide({ ...exemple, blocs: [] }));
    assert.ok(!articleValide({ ...exemple, id: "abc" }));
    assert.ok(!articleValide({ ...exemple, slug: "Pas Une Adresse" }));
    assert.ok(!articleValide({ ...exemple, slug: "article" }), "adresse réservée à la page de secours");
    assert.ok(!articleValide({ ...exemple, source_url: "https://www.amazon.fr/dp/2070000000" }));
    assert.ok(!articleValide({ ...exemple, source_url: "javascript:alert(1)" }));
    assert.ok(!articleValide({ ...exemple, image: { ...exemple.image, url: "https://www.seneplus.com/photo.jpg" } }), "jamais l'image de la source");
    assert.ok(!articleValide({ ...exemple, autres_sources: ["javascript:alert(1)"] }));
  });

  it("retire les liens Amazon des autres sources ; date de rédaction par défaut", () => {
    const a = nettoyerArticle({ ...exemple, autres_sources: ["https://amzn.to/x", "https://www.rfi.fr/a"], redige_le: "" });
    assert.deepEqual(a?.autres_sources, ["https://www.rfi.fr/a"]);
    assert.equal(a?.redige_le, exemple.publie_le);
  });

  it("adresses valides", () => {
    assert.ok(slugValide("colloque-ucad-boubacar-boris-diop"));
    assert.ok(!slugValide("aucun-article"));
    assert.ok(!slugValide("a--b"));
    assert.ok(!slugValide("x".repeat(81)));
  });
});

describe("index de tous les articles", () => {
  it("lit les ids, sans doublon ni id mal formé", () => {
    const index = { version: 1, site: "keurbook", articles: [{ id: ID, slug: exemple.slug }, { id: ID }, { id: "../x" }, null, { slug: "sans-id" }] };
    assert.deepEqual(idsIndexArticles(index), [ID]);
  });

  it("index absent ou cassé : aucun id", () => {
    assert.deepEqual(idsIndexArticles(null), []);
    assert.deepEqual(idsIndexArticles("<html>"), []);
    assert.deepEqual(idsIndexArticles({ articles: "rien" }), []);
  });
});

describe("lien d'une carte d'actu", () => {
  const avecArticle = actu({ slug: exemple.slug, article_url: `https://teiki5320.github.io/veille/articles/keurbook/${ID}.json` });

  it("page construite : /actus/<slug>", () => {
    assert.deepEqual(lienActu(avecArticle, { [ID]: exemple.slug }), { href: `/actus/${exemple.slug}`, externe: false });
  });

  it("article paru après la construction : page de secours", () => {
    assert.deepEqual(lienActu(avecArticle, {}), { href: `/actus/article?id=${ID}`, externe: false });
  });

  it("pas encore d'article : la source, dans un nouvel onglet", () => {
    assert.deepEqual(lienActu(actu(), {}), { href: exemple.source_url, externe: true });
  });

  it("article hébergé ailleurs que sur la veille : ignoré", () => {
    assert.equal(lienActu(actu({ article_url: "https://exemple.com/a.json" })).externe, true);
  });
});

describe("page de secours", () => {
  it("lit l'id dans l'adresse", () => {
    assert.equal(idDepuisRecherche(`?id=${ID}`), ID);
    assert.equal(idDepuisRecherche(`?id=${ID.toUpperCase()}`), ID);
  });

  it("id absent ou mal formé : null (message « Article introuvable »)", () => {
    assert.equal(idDepuisRecherche(""), null);
    assert.equal(idDepuisRecherche("?id=123"), null);
    assert.equal(idDepuisRecherche("?id=../../etc/passwd"), null);
  });

  it("relie seulement les fiches auteurs existantes", () => {
    const fiches = fichesDesTags(["auteur:mariama-ba", "auteur:inconnu", "pays:sn", "auteur:mariama-ba"], { "mariama-ba": "Mariama Bâ" });
    assert.deepEqual(fiches, [{ href: "/auteur/mariama-ba", nom: "Mariama Bâ" }]);
    assert.deepEqual(fichesDesTags(undefined, {}), []);
  });

  it("nom lisible d'une autre source", () => {
    assert.equal(nomDomaine("https://www.jeuneafrique.com/a/b"), "jeuneafrique.com");
  });
});

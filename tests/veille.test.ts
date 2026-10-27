/**
 * Tests de la veille actus : nettoyage du fichier, filtre par auteur, vignettes, âge, et fiches publiques des auteurs.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { allAuthors } from "../src/lib/demo";
import { actuValide, ageActu, filtrerParTag, imageCarree, nettoyerFichier, type Actu } from "../src/lib/veille";

const actu = (x: Partial<Actu> = {}): Actu => ({
  id: "77e46856dab6a4307130380b1548c7b66b4f5a25",
  titre: "Un essai sur une chanteuse",
  resume: "Un résumé réécrit de deux phrases, pour le test.",
  source_nom: "RFI",
  source_url: "https://www.rfi.fr/fr/culture/article",
  publie_le: "2026-10-25T23:03:49.000Z",
  image: {
    url: "https://teiki5320.github.io/veille/images/keurbook/77e46856dab6a4307130380b1548c7b66b4f5a25.webp",
    source: "openverse",
    credit: "Amy Guth",
    licence: "CC BY 2.0",
    page: "https://www.flickr.com/photos/92025495@N00/5330476015",
    alt: "Des livres dans une librairie",
    largeur: 1600,
    hauteur: 900,
  },
  ...x,
});

describe("veille actus", () => {
  it("garde les actus complètes et écarte les liens Amazon et les images d'ailleurs", () => {
    assert.ok(actuValide(actu()));
    assert.ok(!actuValide(actu({ source_url: "https://www.amazon.fr/dp/2070000000?tag=keurbookfr-21" })));
    assert.ok(!actuValide(actu({ source_url: "https://amzn.to/abc" })));
    assert.ok(!actuValide(actu({ source_url: "javascript:alert(1)" })));
    assert.ok(!actuValide(actu({ image: { ...actu().image, url: "https://exemple.com/photo.webp" } })));
    assert.ok(!actuValide(null));
  });

  it("nettoie un fichier et trie du plus récent au plus ancien ; fichier cassé = null", () => {
    const f = nettoyerFichier({ version: 3, site: "keurbook", genere_le: "2026-10-27T00:00:00Z", actus: [actu({ id: "a".repeat(40), publie_le: "2026-10-20T00:00:00Z" }), actu(), { id: "x" }] });
    assert.equal(f?.actus.length, 2);
    assert.equal(f?.actus[0].id, actu().id);
    assert.equal(nettoyerFichier("<html>"), null);
    assert.equal(nettoyerFichier({ actus: "rien" }), null);
  });

  it("filtre par fiche auteur", () => {
    const liste = [actu({ tags: ["auteur:mariama-ba"] }), actu({ id: "b".repeat(40) })];
    assert.equal(filtrerParTag(liste, "auteur:mariama-ba").length, 1);
    assert.equal(filtrerParTag(liste, "auteur:personne").length, 0);
    assert.equal(filtrerParTag(liste).length, 2);
  });

  it("vignette carrée : -carre.webp pour une photo, la même carte SVG sinon", () => {
    assert.match(imageCarree(actu().image), /-carre\.webp$/);
    const carte = { ...actu().image, source: "carte" as const, url: "https://teiki5320.github.io/veille/cartes/keurbook/x.svg" };
    assert.equal(imageCarree(carte), carte.url);
  });

  it("âge lisible", () => {
    const now = Date.parse("2026-10-27T12:00:00Z");
    assert.equal(ageActu("2026-10-27T09:00:00Z", now), "il y a 3 h");
    assert.equal(ageActu("2026-10-26T10:00:00Z", now), "hier");
    assert.equal(ageActu("2026-10-24T10:00:00Z", now), "il y a 3 jours");
    assert.equal(ageActu("pas une date", now), "");
  });

  it("les tags des auteurs respectent le schéma de la veille", () => {
    for (const a of allAuthors) assert.match(`auteur:${a.slug}`, /^[a-z]+:[a-z0-9-]+$/, a.slug);
    for (const a of allAuthors) assert.match(a.countryCode, /^[A-Z]{2}$/, a.slug);
  });
});

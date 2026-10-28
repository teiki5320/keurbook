/**
 * Titres des pages (60 caractères au plus) et fiches voisines « en boucle » (liens « À lire aussi »).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bookPageTitle } from "../src/lib/book-utils";
import { suivantsEnBoucle } from "../src/lib/boucle";
import { allAuthors, allBooks } from "../src/lib/demo";
import { couperTexte, pageMetadata, TITRE_MAX, titrePage } from "../src/lib/metadata";
import { TOP10S } from "../src/lib/top10/sujets";

describe("Titres de page", () => {
  it("un titre trop long est coupé en fin de mot, avec « … »", () => {
    const long = "Comment choisir un roman africain pour un adolescent qui n'aime pas lire du tout";
    const t = titrePage(long);
    assert.ok(t.length <= TITRE_MAX, t);
    assert.ok(t.endsWith("…"));
    assert.ok(long.startsWith(t.slice(0, -1)), "coupé sur un mot entier");
    assert.equal(couperTexte("Court", 60), "Court");
  });
  it("le suffixe « | Keurbook » n'est gardé que s'il tient", () => {
    assert.equal(titrePage("Auteurs africains"), "Auteurs africains | Keurbook");
    assert.equal(titrePage("Accueil", true), "Accueil");
  });
  it("les métadonnées d'une page ne dépassent jamais 60 caractères", () => {
    const m = pageMetadata({ title: "x".repeat(40) + " " + "y".repeat(40), description: "d", path: "/" });
    const title = m.title as { absolute: string };
    assert.ok(title.absolute.length <= TITRE_MAX, title.absolute);
  });
  it("toutes les fiches livres, BD, auteurs et top 10 ont un titre de 60 caractères au plus", () => {
    const titres = [
      ...allBooks.filter((b) => b.isPublished).map((b) => titrePage(bookPageTitle(b, false))),
      ...allAuthors.map((a) => titrePage(`${a.name} : biographie et livres`)),
      ...TOP10S.map((t) => titrePage(t.title)),
    ];
    const trop = titres.filter((t) => t.length > TITRE_MAX);
    assert.deepEqual(trop, []);
  });
});

describe("Fiches voisines en boucle", () => {
  const liste = ["a", "b", "c", "d", "e"];
  it("les suivantes, en revenant au début", () => {
    assert.deepEqual(suivantsEnBoucle(liste, (x) => x === "d", 3), ["e", "a", "b"]);
    assert.deepEqual(suivantsEnBoucle(liste, (x) => x === "a", 2), ["b", "c"]);
  });
  it("jamais l'élément courant, même dans une petite liste", () => {
    assert.deepEqual(suivantsEnBoucle(["a", "b"], (x) => x === "a", 3), ["b"]);
  });
  it("chaque élément reçoit exactement n liens de ses voisins", () => {
    const recus = new Map(liste.map((x) => [x, 0]));
    for (const x of liste) for (const y of suivantsEnBoucle(liste, (z) => z === x, 3)) recus.set(y, recus.get(y)! + 1);
    assert.deepEqual([...new Set(recus.values())], [3]);
  });
});

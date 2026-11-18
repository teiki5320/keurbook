/**
 * Tests du flux RSS (src/lib/rss.ts) : format, échappement, ordre et nombre d'éléments.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fluxRss, type ElementRss } from "../src/lib/rss";

const element = (n: number, sur: Partial<ElementRss> = {}): ElementRss => ({
  titre: `Article ${n}`,
  lien: `https://keurbook.com/actus/article-${n}`,
  description: `Résumé ${n}`,
  date: `2026-10-${String(n).padStart(2, "0")}T08:00:00.000Z`,
  ...sur,
});

describe("Flux RSS", () => {
  const flux = (elements: ElementRss[]) => fluxRss({ titre: "Keurbook", lien: "https://keurbook.com", description: "Livres africains", adresseFlux: "https://keurbook.com/feed.xml", elements });

  it("RSS 2.0 valide, avec le lien vers lui-même et la langue", () => {
    const xml = flux([element(1)]);
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<rss version="2\.0"/);
    assert.match(xml, /<atom:link href="https:\/\/keurbook\.com\/feed\.xml" rel="self" type="application\/rss\+xml"\/>/);
    assert.match(xml, /<language>fr<\/language>/);
    assert.match(xml, /<item><title>Article 1<\/title><link>https:\/\/keurbook\.com\/actus\/article-1<\/link><guid isPermaLink="true">https:\/\/keurbook\.com\/actus\/article-1<\/guid>/);
    assert.match(xml, /<pubDate>Thu, 01 Oct 2026 08:00:00 GMT<\/pubDate>/);
  });

  it("échappe les caractères spéciaux du XML", () => {
    const xml = flux([element(1, { titre: "Maroc & Sénégal : <finale>", description: "« Il a dit \"oui\" »" })]);
    assert.match(xml, /<title>Maroc &amp; Sénégal : &lt;finale&gt;<\/title>/);
    assert.match(xml, /<description>« Il a dit &quot;oui&quot; »<\/description>/);
  });

  it("du plus récent au plus ancien, 30 éléments au plus", () => {
    const xml = flux(Array.from({ length: 31 }, (_, i) => element(i + 1 > 28 ? 28 : i + 1)));
    assert.equal((xml.match(/<item>/g) ?? []).length, 30);
    const dates = [...xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map((m) => Date.parse(m[1]));
    assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
  });

  it("image de l'élément en media:content quand elle existe", () => {
    const xml = flux([element(1, { image: "https://keurbook.com/og/actus/abc.jpg" }), element(2)]);
    assert.match(xml, /xmlns:media="http:\/\/search\.yahoo\.com\/mrss\/"/);
    assert.equal((xml.match(/<media:content url="https:\/\/keurbook\.com\/og\/actus\/abc\.jpg" medium="image"\/>/g) ?? []).length, 1);
  });
});

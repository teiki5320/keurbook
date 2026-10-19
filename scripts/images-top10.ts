/**
 * Images de partage (og:image) de la page « Top 10 » : les 3 premières couvertures du top et son titre, 1200 × 630.
 * Usage : npx tsx scripts/images-top10.ts   → public/top10/<slug>.jpg (à relancer quand un top change).
 */
import sharp from "sharp";
import { allBooks } from "../src/lib/demo";
import { TOP10S } from "../src/lib/top10/sujets";

const W = 1200;
const H = 630;
const COVER_H = 450;
const COVER_W = 300;

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Coupe le titre en lignes d'environ `max` caractères. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  return line ? [...lines, line] : lines;
}

async function main() {
  for (const top of TOP10S) {
    const covers = top.items.slice(0, 3).map(({ slug }) => {
      const book = allBooks.find((b) => b.slug === slug);
      const image = book?.cover ?? book?.illustration;
      if (!image) throw new Error(`${top.slug} : pas d'image pour ${slug}`);
      return `public${image}`;
    });
    // Couvertures en éventail, de la n° 3 (au fond) à la n° 1 (devant).
    const layers = await Promise.all(
      covers.map(async (file, i) => ({
        input: await sharp(file).resize(COVER_W, COVER_H, { fit: "cover" }).toBuffer(),
        left: 70 + i * 120,
        top: (H - COVER_H) / 2 + (i === 0 ? 0 : 18),
      })),
    );
    const subject = top.title.replace(/^Top 10 des /, "");
    const lines = wrap(subject[0].toUpperCase() + subject.slice(1), 17).slice(0, 4);
    const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="680" y="170" font-family="Georgia, serif" font-size="30" letter-spacing="6" fill="#d6a24a">TOP 10</text>
      ${lines.map((l, i) => `<text x="680" y="${236 + i * 60}" font-family="Georgia, serif" font-size="50" fill="#efe9dd">${escape(l)}</text>`).join("")}
      <text x="680" y="${H - 70}" font-family="Georgia, serif" font-style="italic" font-size="32" fill="#a9a195">Keurbook</text>
    </svg>`;
    await sharp({ create: { width: W, height: H, channels: 3, background: "#141311" } })
      .composite([...[...layers].reverse(), { input: Buffer.from(svg), left: 0, top: 0 }])
      .jpeg({ quality: 82 })
      .toFile(`public/top10/${top.slug}.jpg`);
    console.log(`public/top10/${top.slug}.jpg`);
  }
}

main();

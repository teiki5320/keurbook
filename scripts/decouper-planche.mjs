/**
 * Découpe une planche OpenArt (2 ou 4 couvertures séparées par des marges claires) en couvertures 600 px (webp, 2:3).
 * Usage : node scripts/decouper-planche.mjs planche.png <colonnes> <lignes> slug1 slug2 …
 * (ordre de lecture : de gauche à droite, puis de haut en bas). Sortie : public/illustrations/<slug>.webp
 * Avec KEURBOOK_FORMAT=conseil : images d'articles 1200×805 (3:2) dans public/conseils/<slug>.webp
 */
import sharp from "sharp";

const [file, cols, rows, ...slugs] = process.argv.slice(2);
const C = Number(cols), R = Number(rows);
const conseil = process.env.KEURBOOK_FORMAT === "conseil";
const RATIO = conseil ? 1200 / 805 : 2 / 3;
const [OW, OH, DIR] = conseil ? [1200, 805, "public/conseils"] : [600, 900, "public/illustrations"];
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: ch } = info;
const px = (x, y) => { const i = (y * W + x) * ch; return [data[i], data[i + 1], data[i + 2]]; };
// Pixel « de marge » : clair et peu coloré (papier crème).
const pale = ([r, g, b]) => Math.min(r, g, b) > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
const colPale = (x, y0, y1) => { let n = 0; for (let y = y0; y < y1; y += 2) n += pale(px(x, y)); return n / ((y1 - y0) / 2); };
const rowPale = (y, x0, x1) => { let n = 0; for (let x = x0; x < x1; x += 2) n += pale(px(x, y)); return n / ((x1 - x0) / 2); };

/** Coupe la plus « claire » autour de chaque séparation attendue (k/n de la taille). */
function cuts(n, size, score) {
  const out = [0];
  for (let k = 1; k < n; k++) {
    const mid = Math.round((k * size) / n), span = Math.round(size * 0.08);
    let best = mid, bestS = -1;
    for (let p = mid - span; p <= mid + span; p++) { const s = score(p); if (s > bestS) { bestS = s; best = p; } }
    out.push(best);
  }
  out.push(size);
  return out;
}
const xs = cuts(C, W, (x) => colPale(x, 0, H));
const ys = cuts(R, H, (y) => rowPale(y, 0, W));

let i = 0;
for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
  let x0 = xs[c], x1 = xs[c + 1], y0 = ys[r], y1 = ys[r + 1];
  // On retire les marges claires autour du dessin (au plus 6 % par côté : un ciel crème n'est pas une marge).
  const mx = Math.round((x1 - x0) * 0.06), my = Math.round((y1 - y0) * 0.06);
  const [ax, bx, ay, by] = [x0 + mx, x1 - mx, y0 + my, y1 - my];
  while (x0 < ax && colPale(x0, y0, y1) > 0.97) x0++;
  while (x1 > bx && colPale(x1 - 1, y0, y1) > 0.97) x1--;
  while (y0 < ay && rowPale(y0, x0, x1) > 0.97) y0++;
  while (y1 > by && rowPale(y1 - 1, x0, x1) > 0.97) y1--;
  // Petite marge de sécurité, puis recadrage centré au format voulu (2:3 pour les couvertures).
  x0 += 4; x1 -= 4; y0 += 4; y1 -= 4;
  let w = x1 - x0, h = y1 - y0;
  if (w / h > RATIO) { const nw = Math.round(h * RATIO); x0 += Math.round((w - nw) / 2); w = nw; }
  else { const nh = Math.round(w / RATIO); y0 += Math.round((h - nh) / 2); h = nh; }
  const slug = slugs[i++];
  if (!slug) break;
  await sharp(file).extract({ left: x0, top: y0, width: w, height: h }).resize(OW, OH).webp({ quality: 80 }).toFile(`${DIR}/${slug}.webp`);
  console.log(slug, `${w}×${h}`);
}

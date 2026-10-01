/**
 * Géométrie de la carte de l'Afrique en particules (reprise de Keur Cook).
 * Sans dépendance à Three.js : les points des pays posés sur la carte utilisent la même projection.
 */
import { COUNTRY_SHAPES } from "./country-shapes";

/** Contour simplifié de l'Afrique (longitude, latitude), dans le sens horaire depuis Tanger. */
const AFRICA: Array<[number, number]> = [
  [-5.9, 35.8], [-1.9, 35.1], [3.0, 36.8], [9.8, 37.3], [11.1, 36.9], [10.2, 34.3], [11.5, 33.1], [15.2, 32.3],
  [19.0, 30.3], [20.1, 32.1], [23.0, 32.6], [25.1, 31.6], [29.9, 31.2], [32.3, 31.3], [32.5, 29.9], [33.6, 27.2],
  [35.5, 23.9], [37.2, 19.6], [38.6, 18.0], [39.5, 15.6], [41.2, 13.9], [42.7, 13.0], [43.2, 11.6], [44.9, 10.4],
  [47.5, 11.1], [51.3, 11.8], [51.0, 10.4], [49.8, 7.5], [47.8, 4.5], [45.3, 2.0], [42.5, -0.4], [40.9, -2.3],
  [39.7, -4.1], [39.3, -6.8], [39.7, -10.0], [40.5, -10.5], [40.6, -14.5], [39.0, -17.0], [34.9, -19.8], [35.5, -22.0],
  [35.5, -24.0], [32.6, -25.9], [31.0, -29.9], [28.0, -32.7], [25.6, -34.0], [20.0, -34.8], [18.4, -34.0], [17.9, -31.5],
  [15.2, -26.7], [14.5, -22.9], [11.8, -17.3], [13.4, -12.6], [13.2, -8.8], [12.3, -6.0], [11.9, -4.8], [8.7, -0.7],
  [9.4, 0.4], [9.8, 3.0], [9.7, 4.0], [8.5, 4.5], [6.0, 4.3], [3.4, 6.4], [-0.2, 5.5], [-2.1, 4.7],
  [-4.0, 5.3], [-7.7, 4.4], [-10.8, 6.3], [-13.2, 8.5], [-13.7, 9.5], [-15.6, 11.9], [-17.5, 14.7], [-16.0, 18.1],
  [-17.0, 20.8], [-16.0, 23.7], [-14.5, 26.1], [-12.9, 27.9], [-9.6, 30.4], [-9.8, 31.5], [-7.6, 33.6], [-6.8, 34.0],
];
const MADAGASCAR: Array<[number, number]> = [
  [49.3, -12.0], [50.5, -15.5], [49.4, -17.8], [47.1, -24.9], [45.2, -25.6], [43.7, -22.5], [43.3, -21.5], [44.4, -16.2], [47.2, -15.0], [48.0, -13.5],
];

/** Passage (longitude, latitude) → coordonnées du nuage : la carte fait 3,5 unités de haut, centrée. */
export const MAP_SCALE = 3.5 / 72.1;
export const MAP_CENTER: [number, number] = [16.9, 1.25];
export const projectMap = (lon: number, lat: number): [number, number] => [(lon - MAP_CENTER[0]) * MAP_SCALE, (lat - MAP_CENTER[1]) * MAP_SCALE];

function inside(poly: Array<[number, number]>, x: number, y: number) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** Point de la carte : 70 % à l'intérieur du continent, 30 % sur le contour (effet de trait). */
export function africaPoint(): [number, number] {
  if (Math.random() < 0.3) {
    const poly = Math.random() < 0.93 ? AFRICA : MADAGASCAR;
    const k = Math.floor(Math.random() * poly.length);
    const [a, b] = [poly[k], poly[(k + 1) % poly.length]];
    const t = Math.random();
    return projectMap(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t);
  }
  for (;;) {
    const lon = -18 + Math.random() * 70, lat = -35 + Math.random() * 73;
    if (inside(AFRICA, lon, lat) || inside(MADAGASCAR, lon, lat)) return projectMap(lon, lat);
  }
}

/** Position d'un lieu dans l'ancre du nuage, en % (la carte occupe 3,7 unités = 100 % de la hauteur). */
export function mapPercent(lon: number, lat: number) {
  const [x, y] = projectMap(lon, lat);
  return { left: 50 + (x / 3.7) * 100, top: 50 - (y / 3.7) * 100 };
}

// ------------------------------------------------------------ Formes des pays


/** Taille maximale d'un pays dans le nuage (unités ; l'ancre mesure 3,7 unités de côté). */
const COUNTRY_SIZE = 3.2;

interface CountryFrame {
  rings: Array<Array<[number, number]>>;
  /** (longitude, latitude) → coordonnées du nuage, pays centré et agrandi. */
  project: (lon: number, lat: number) => [number, number];
  box: [number, number, number, number];
}

const frames = new Map<string, CountryFrame>();

function countryFrame(code: string): CountryFrame | null {
  const rings = COUNTRY_SHAPES[code];
  if (!rings) return null;
  const cached = frames.get(code);
  if (cached) return cached;
  const pts = rings.flat();
  const [minX, maxX] = [Math.min(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[0]))];
  const [minY, maxY] = [Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[1]))];
  // Correction de la longitude selon la latitude, pour garder les proportions du pays.
  const k = Math.cos((((minY + maxY) / 2) * Math.PI) / 180);
  const scale = COUNTRY_SIZE / Math.max((maxX - minX) * k, maxY - minY);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const frame: CountryFrame = {
    rings,
    project: (lon, lat) => [(lon - cx) * k * scale, (lat - cy) * scale],
    box: [minX, maxX, minY, maxY],
  };
  frames.set(code, frame);
  return frame;
}

/** N points de la forme d'un pays (30 % sur le contour), en coordonnées du nuage (x, y, z). */
export function countryPoints(code: string, N: number): Float32Array | null {
  const f = countryFrame(code);
  if (!f) return null;
  const out = new Float32Array(N * 3);
  const [minX, maxX, minY, maxY] = f.box;
  const edges = f.rings.flatMap((r) => r.map((p, i) => [p, r[(i + 1) % r.length]] as const));
  for (let i = 0; i < N; i++) {
    let lon: number, lat: number;
    if (Math.random() < 0.3) {
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      const t = Math.random();
      lon = a[0] + (b[0] - a[0]) * t;
      lat = a[1] + (b[1] - a[1]) * t;
    } else {
      do {
        lon = minX + Math.random() * (maxX - minX);
        lat = minY + Math.random() * (maxY - minY);
      } while (!f.rings.some((r) => inside(r, lon, lat)));
    }
    const [x, y] = f.project(lon, lat);
    out.set([x, y, (Math.random() - 0.5) * 0.12], i * 3);
  }
  return out;
}

/** Tracé SVG du pays, dans le repère de l'ancre (viewBox « -1.85 -1.85 3.7 3.7 »). */
export function countryPath(code: string): string {
  const f = countryFrame(code);
  if (!f) return "";
  return f.rings
    .map((r) => "M" + r.map(([lon, lat]) => { const [x, y] = f.project(lon, lat); return `${x.toFixed(3)} ${(-y).toFixed(3)}`; }).join("L") + "Z")
    .join("");
}

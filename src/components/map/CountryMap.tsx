import Link from "next/link";

interface MapCountry {
  slug: string;
  name: string;
  lon: number;
  lat: number;
  books: number;
  bd: number;
}

// Cadre de l'Afrique subsaharienne (projection simple longitude / latitude).
const W = 640;
const H = 640;
const LON = [-20, 52] as const;
const LAT = [-36, 26] as const;
const x = (lon: number) => ((lon - LON[0]) / (LON[1] - LON[0])) * W;
const y = (lat: number) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

/**
 * Carte des pays : un point par pays qui a du contenu, plus gros selon le nombre de livres.
 * Version provisoire, à remplacer par la carte du design définitif.
 */
export function CountryMap({ countries, highlight }: { countries: MapCountry[]; highlight?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xl" role="img" aria-label="Carte des pays d'Afrique subsaharienne présents sur Keurbook">
      <rect x="0" y="0" width={W} height={H} rx="24" className="fill-accent-soft/60" />
      {countries.map((c) => {
        const r = 6 + Math.min(14, (c.books + c.bd) * 1.5);
        const on = c.slug === highlight;
        return (
          <Link key={c.slug} href={`/pays/${c.slug}`}>
            <g className="group">
              <title>{`${c.name} — ${c.books + c.bd} titre${c.books + c.bd > 1 ? "s" : ""}`}</title>
              <circle cx={x(c.lon)} cy={y(c.lat)} r={r} className={on ? "fill-ink" : "fill-accent opacity-80 transition group-hover:fill-ink"} />
              <text x={x(c.lon)} y={y(c.lat) + r + 14} textAnchor="middle" className="fill-ink text-[13px]">
                {c.name.length > 16 ? c.name.replace("République démocratique du Congo", "RD Congo") : c.name}
              </text>
            </g>
          </Link>
        );
      })}
    </svg>
  );
}

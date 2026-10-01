/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import { withBase } from "@/lib/config";

/** Teintes sombres des couvertures typographiques (design « Nuit »). */
const TONES = ["#5a2e22", "#23343a", "#3d3a2a", "#2d2438", "#1f3a2e", "#4a3a22"];

/** Teinte stable par titre : un même livre garde toujours la même couleur. */
function toneFor(title: string) {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/**
 * Couverture du livre, ou à défaut une couverture typographique (titre + auteur)
 * tant que l'image n'est pas obtenue par un moyen autorisé.
 */
export function BookCover({ title, creators, cover, className = "" }: { title: string; creators: string; cover: string | null; className?: string }) {
  if (cover) return <img src={withBase(cover)} alt={`Couverture de ${title}`} className={`aspect-[2/3] w-full rounded-md object-cover shadow-lg shadow-black/40 ${className}`} loading="lazy" />;
  return (
    <div
      role="img"
      aria-label={`${title}, ${creators}`}
      style={{ backgroundColor: toneFor(title) }}
      className={`flex aspect-[2/3] w-full flex-col justify-between rounded-md p-3 shadow-lg shadow-black/40 ring-1 ring-ink/10 ring-inset sm:p-4 ${className}`}
    >
      <span className="line-clamp-2 text-[9px] tracking-[0.14em] text-accent uppercase">{creators}</span>
      <span className="font-serif text-lg leading-none text-ink italic sm:text-2xl">{title}</span>
    </div>
  );
}

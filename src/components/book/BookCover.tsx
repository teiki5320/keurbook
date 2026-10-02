/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import { withBase } from "@/lib/config";

/** Teintes sombres des couvertures typographiques (design « Nuit »). */
const TONES = ["#5a2e22", "#23343a", "#3d3a2a", "#2d2438", "#1f3a2e", "#4a3a22", "#6b4e17"];

/** Teinte stable par titre : un même livre garde toujours la même couleur. */
function toneFor(title: string) {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/**
 * Couverture du livre :
 * 1. la vraie couverture si on l'a obtenue par un moyen autorisé ;
 * 2. sinon l'illustration Keurbook (collage wax) avec le titre et l'auteur posés par le site,
 *    la signature de collection et l'effet de tranche, pour qu'on voie un livre ;
 * 3. sinon une couverture typographique.
 */
export function BookCover({
  title,
  creators,
  cover,
  illustration = null,
  className = "",
  priority = false,
}: {
  title: string;
  creators: string;
  cover: string | null;
  illustration?: string | null;
  className?: string;
  /** Image principale de la page : chargée tout de suite, en priorité. */
  priority?: boolean;
}) {
  if (!cover && illustration)
    return (
      <div
        style={{ backgroundColor: toneFor(title) }}
        className={`@container relative aspect-[2/3] w-full overflow-hidden rounded-[3px_6px_6px_3px] shadow-xl shadow-black/40 ${className}`}
      >
        {/* Le texte alternatif porte le titre et l'auteur ; le titre posé par-dessus est masqué aux lecteurs d'écran. */}
        <img
          src={withBase(illustration)}
          alt={`${title}, ${creators} : couverture illustrée par Keurbook`}
          className="absolute inset-0 size-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        {/* Bandeau du titre en haut, signature en bas */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-paper/90 via-paper/55 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[20%] bg-linear-to-t from-paper/80 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 flex flex-col items-center px-[8%] pt-[9%] text-center">
          <span className="line-clamp-2 text-[max(6px,4.2cqw)] leading-snug tracking-[0.2em] text-accent uppercase">{creators}</span>
          <span className="mt-[4%] line-clamp-3 font-serif text-[max(11px,12.5cqw)] leading-[0.98] text-balance text-ink">{title}</span>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-[4%] flex flex-col items-center gap-[1.5cqw]">
          <span className="block h-px w-[9%] bg-accent" />
          <span className="font-serif text-[max(6px,4.4cqw)] text-ink/85 italic">Keurbook</span>
        </div>
        {/* Tranche du livre */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-[5%] bg-linear-to-r from-black/55 via-white/15 to-black/0" />
      </div>
    );
  if (cover) return <img src={withBase(cover)} alt={`Couverture de ${title}`} className={`aspect-[2/3] w-full rounded-md object-cover shadow-xl shadow-black/40 ${className}`} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />;
  return (
    <div
      role="img"
      aria-label={`${title}, ${creators}`}
      style={{ backgroundColor: toneFor(title) }}
      className={`@container flex aspect-[2/3] w-full flex-col justify-between rounded-md p-[9%] shadow-xl ring-1 shadow-black/40 ring-ink/10 ring-inset ${className}`}
    >
      <span className="line-clamp-2 text-[max(7px,5cqw)] leading-snug tracking-[0.14em] text-accent uppercase">{creators}</span>
      <span className="font-serif text-[max(12px,14cqw)] leading-[0.98] text-ink italic">{title}</span>
    </div>
  );
}

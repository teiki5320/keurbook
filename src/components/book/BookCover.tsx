/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import { withBase } from "@/lib/config";

/**
 * Couverture du livre, ou à défaut une couverture typographique (titre + auteur)
 * tant que l'image n'est pas obtenue par un moyen autorisé.
 */
export function BookCover({ title, creators, cover, className = "" }: { title: string; creators: string; cover: string | null; className?: string }) {
  if (cover) return <img src={withBase(cover)} alt={`Couverture de ${title}`} className={`aspect-[2/3] w-full rounded-md object-cover shadow ${className}`} loading="lazy" />;
  return (
    <div
      role="img"
      aria-label={`${title}, ${creators}`}
      className={`flex aspect-[2/3] w-full flex-col justify-between rounded-md border border-line bg-accent-soft p-3 shadow-sm ${className}`}
    >
      <span className="font-serif text-sm leading-snug font-semibold text-ink sm:text-base">{title}</span>
      <span className="text-xs text-muted">{creators}</span>
    </div>
  );
}

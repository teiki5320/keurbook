/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import Link from "next/link";
import { initials } from "@/lib/book-utils";
import { withBase } from "@/lib/config";

/** Photo ronde de l'auteur (libre de droits), ou ses initiales. */
export function AuthorAvatar({ name, photo, className = "size-10 text-sm" }: { name: string; photo: string | null; className?: string }) {
  if (photo) return <img src={withBase(photo)} alt="" className={`shrink-0 rounded-full object-cover object-top grayscale brightness-90 ${className}`} loading="lazy" />;
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-white font-serif text-muted ${className}`}>
      {initials(name)}
    </span>
  );
}

/** Vignette portrait (auteurs proches, auteurs d'un pays). */
export function AuthorTile({ slug, name, photo, subtitle }: { slug: string; name: string; photo: string | null; subtitle?: string | null }) {
  return (
    <Link href={`/auteur/${slug}`} className="group relative block h-40 overflow-hidden rounded-md bg-white sm:h-56">
      {photo ? (
        <img src={withBase(photo)} alt="" className="size-full object-cover object-top grayscale brightness-75 transition group-hover:brightness-95" loading="lazy" />
      ) : (
        <span aria-hidden className="flex size-full items-center justify-center pb-8 font-serif text-5xl text-faint">
          {initials(name)}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-paper/90 to-transparent p-3 pt-12">
        <span className="block font-serif text-[19px] leading-none group-hover:text-accent">{name}</span>
        {subtitle && <span className="mt-1 block text-[11px] text-muted">{subtitle}</span>}
      </span>
    </Link>
  );
}

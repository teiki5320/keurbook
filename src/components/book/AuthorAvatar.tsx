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

/**
 * Vignette portrait (galerie, auteurs proches) : en gris, le portrait prend ses couleurs au survol
 * (et, sur écran tactile, quand il passe au milieu de l'écran). Couleur de l'époque : variable CSS --era.
 */
export function AuthorTile({
  slug,
  name,
  photo,
  coverImage = null,
  subtitle,
}: {
  slug: string;
  name: string;
  photo: string | null;
  /** Sans photo : couverture illustrée de son livre, à la place des initiales. */
  coverImage?: string | null;
  subtitle?: string | null;
}) {
  const image = photo ?? coverImage;
  return (
    <Link
      href={`/auteur/${slug}`}
      className="group relative block h-40 overflow-hidden rounded-md bg-white ring-(--era,var(--color-accent)) transition duration-500 hover:ring-2 focus-visible:ring-2 focus-visible:outline-none sm:h-56"
    >
      {image ? (
        <img
          src={withBase(image)}
          alt=""
          className={`portrait-vivant size-full object-cover ${photo ? "object-top" : "object-center"} brightness-75 grayscale transition duration-700 group-hover:scale-[1.04] group-hover:brightness-95 group-hover:grayscale-0 group-focus-visible:brightness-95 group-focus-visible:grayscale-0`}
          loading="lazy"
        />
      ) : (
        <span aria-hidden className="flex size-full items-center justify-center pb-8 font-serif text-5xl text-faint">
          {initials(name)}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-paper/90 to-transparent p-3 pt-12">
        <span className="block font-serif text-[19px] leading-none group-hover:text-(--era,var(--color-accent))">{name}</span>
        {subtitle && <span className="mt-1 block text-[11px] text-muted">{subtitle}</span>}
      </span>
    </Link>
  );
}

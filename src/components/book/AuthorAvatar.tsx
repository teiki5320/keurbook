/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import { initials } from "@/lib/book-utils";

/** Photo ronde de l'auteur (libre de droits), ou ses initiales. */
export function AuthorAvatar({ name, photo, className = "size-10 text-sm" }: { name: string; photo: string | null; className?: string }) {
  if (photo) return <img src={photo} alt="" className={`shrink-0 rounded-full object-cover object-top ${className}`} loading="lazy" />;
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif font-bold ${className}`}>
      {initials(name)}
    </span>
  );
}

/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import { imageCarree, type Actu, type LienCarte as Lien } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienCarte } from "./LienCarte";
import { LienSource } from "./LienSource";

/**
 * Actu en vignette : image carrée (la carte générée est recadrée), puis le texte en plus compact.
 * Toute la carte ouvre « lien ». Sur grand écran, dans une colonne étroite (moins de 24 rem) : image et titre plus petits, sans résumé.
 */
export function ActuVignette({ actu, lien, Titre = "h3" }: { actu: Actu; lien: Lien; Titre?: "h2" | "h3" }) {
  return (
    <article className="group relative @container flex w-full min-w-0 gap-4 rounded-xl border border-line bg-white p-3 sm:p-4">
      <img
        src={imageCarree(actu.image)}
        alt={actu.image.alt}
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
        className="aspect-square w-24 shrink-0 self-start rounded-lg bg-line object-cover sm:w-28 lg:@max-sm:w-[76px]"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Titre className="font-serif text-[21px] leading-[1.1] break-words group-hover:text-accent lg:@max-sm:text-[18px]">
          <LienCarte lien={lien}>{actu.titre}</LienCarte>
        </Titre>
        <p className="line-clamp-3 text-[13.5px] lg:line-clamp-2 lg:@max-sm:hidden leading-snug text-muted">{actu.resume}</p>
        <div className="mt-auto space-y-1.5">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="relative z-10" />
        </div>
      </div>
    </article>
  );
}

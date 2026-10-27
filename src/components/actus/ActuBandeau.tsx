/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import type { Actu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienSource } from "./LienSource";

/** Actu à la une : image 16:9, titre, résumé, source et crédit. */
export function ActuBandeau({ actu, prioritaire = false, Titre = "h3" }: { actu: Actu; prioritaire?: boolean; Titre?: "h2" | "h3" }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white">
      <img
        src={actu.image.url}
        alt={actu.image.alt}
        width={actu.image.largeur}
        height={actu.image.hauteur}
        loading={prioritaire ? "eager" : "lazy"}
        decoding="async"
        className="aspect-video w-full bg-line object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <Titre className="font-serif text-[26px] leading-[1.08] sm:text-[32px]">{actu.titre}</Titre>
        <p className="text-[15px] leading-relaxed text-ink/80">{actu.resume}</p>
        <div className="mt-auto pt-1">
          <LienSource actu={actu} />
          <CreditImage image={actu.image} className="mt-1" />
        </div>
      </div>
    </article>
  );
}

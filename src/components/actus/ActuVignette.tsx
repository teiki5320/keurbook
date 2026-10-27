/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import { imageCarree, type Actu } from "@/lib/veille";
import { CreditImage } from "./CreditImage";
import { LienSource } from "./LienSource";

/** Actu en vignette : image carrée (la carte générée est recadrée), puis le texte en plus compact. */
export function ActuVignette({ actu, Titre = "h3" }: { actu: Actu; Titre?: "h2" | "h3" }) {
  return (
    <article className="flex min-w-0 gap-4 rounded-xl border border-line bg-white p-3 sm:p-4">
      <img
        src={imageCarree(actu.image)}
        alt={actu.image.alt}
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
        className="aspect-square w-24 shrink-0 self-start rounded-lg bg-line object-cover sm:w-28"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Titre className="font-serif text-[21px] leading-[1.1] break-words">{actu.titre}</Titre>
        <p className="line-clamp-3 text-[13.5px] leading-snug text-muted">{actu.resume}</p>
        <LienSource actu={actu} />
        <CreditImage image={actu.image} />
      </div>
    </article>
  );
}

import type { ImageActu } from "@/lib/veille";

/** Crédit obligatoire de l'image : « Photo : auteur · licence » (lien vers la page d'origine), ou « Illustration : Keurbook ». */
export function CreditImage({ image, className = "" }: { image: ImageActu; className?: string }) {
  if (image.source === "carte") return <p className={`text-[11.5px] text-faint ${className}`}>Illustration : Keurbook</p>;
  const texte = [image.credit, image.licence].filter(Boolean).join(" · ");
  return (
    <p className={`text-[11.5px] break-words text-faint ${className}`}>
      Photo :{" "}
      {image.page ? (
        <a href={image.page} target="_blank" rel="noopener nofollow" className="underline decoration-line-strong underline-offset-2 hover:text-ink">
          {texte}
        </a>
      ) : (
        texte
      )}
    </p>
  );
}

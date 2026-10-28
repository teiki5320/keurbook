import Link from "next/link";
import type { LienCarte as Lien } from "@/lib/veille";

/**
 * Titre d'une carte d'actu, dont le lien couvre toute la carte (la carte doit être en `relative`).
 * Le lien du crédit photo reste cliquable au-dessus (voir CreditImage).
 */
export function LienCarte({ lien, children }: { lien: Lien; children: React.ReactNode }) {
  const etendu = "after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-accent";
  if (lien.externe) {
    return (
      <a href={lien.href} target="_blank" rel="noopener nofollow" className={etendu}>
        {children}
        <span className="sr-only"> (article d’origine, nouvel onglet)</span>
      </a>
    );
  }
  return (
    <Link href={lien.href} className={etendu}>
      {children}
    </Link>
  );
}

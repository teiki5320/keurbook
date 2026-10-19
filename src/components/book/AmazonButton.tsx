import { formatPrice } from "@/lib/format";

/** Bouton « Acheter sur Amazon · prix » (lien partenaire, nouvel onglet). */
export function AmazonButton({ href, priceCents, small = false, className = "", label = "Acheter sur Amazon" }: { href: string; priceCents: number | null; small?: boolean; className?: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer" className={`${small ? "btn-primary px-3 py-1.5 text-xs" : "btn-primary"} ${className}`}>
      {label}{priceCents != null ? ` · ${formatPrice(priceCents)}` : ""}
    </a>
  );
}

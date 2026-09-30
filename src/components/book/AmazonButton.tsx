import { formatPrice } from "@/lib/format";

/** Bouton « Acheter sur Amazon · prix » (lien partenaire, nouvel onglet). */
export function AmazonButton({ href, priceCents, small = false }: { href: string; priceCents: number | null; small?: boolean }) {
  return (
    <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer" className={small ? "btn-primary px-3 py-1.5 text-xs" : "btn-primary"}>
      Acheter sur Amazon{priceCents != null ? ` · ${formatPrice(priceCents)}` : ""}
    </a>
  );
}

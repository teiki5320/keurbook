/** Mention « Lien partenaire » posée à côté de chaque bouton Amazon. */
export function PartnerNote({ className = "" }: { className?: string }) {
  return <span className={`text-[11px] whitespace-nowrap text-faint ${className}`}>Lien partenaire</span>;
}

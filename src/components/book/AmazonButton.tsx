/**
 * Bouton « Voir sur Amazon » (lien partenaire, nouvel onglet). Aucun prix affiché : seul celui d'Amazon fait foi
 * (même libellé que les autres sites Keur). Toujours au moins 44 px de haut (min-h-11), même en petite taille, pour le doigt.
 */
export function AmazonButton({ href, title, small = false, className = "" }: { href: string; title: string; small?: boolean; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={`Voir sur Amazon : ${title}, lien partenaire (nouvel onglet)`}
      className={`${small ? "btn-primary min-h-11 px-4 py-2 text-[13px]" : "btn-primary min-h-11"} ${className}`}
    >
      Voir sur Amazon
    </a>
  );
}

/**
 * Petites lignes posées juste sous chaque bouton Amazon : lien partenaire, puis (si la couverture affichée
 * est une illustration Keurbook) rappel que l'édition vendue a sa propre couverture.
 */
export function AmazonNote({ illustrated = false, className = "" }: { illustrated?: boolean; className?: string }) {
  return (
    <div className={`mt-2 space-y-1 text-[11px] leading-snug text-faint ${className}`}>
      <p>Lien partenaire Amazon. Prix, disponibilité et vendeur sont indiqués sur Amazon.</p>
      {illustrated && <p>Couverture illustrée par Keurbook : l&apos;édition vendue a sa propre couverture.</p>}
    </div>
  );
}

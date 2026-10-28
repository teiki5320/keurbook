/**
 * Lien e-mail entouré de <!--email_off--> … <!--email_on--> : Cloudflare ne le masque pas,
 * donc n'ajoute pas à la page son script « email-decode », qui bloquait l'affichage (environ 1 s sur téléphone).
 */
export function EmailLink({ email, className }: { email: string; className?: string }) {
  const cls = className ? ` class="${className}"` : "";
  return <span dangerouslySetInnerHTML={{ __html: `<!--email_off--><a href="mailto:${email}"${cls}>${email}</a><!--email_on-->` }} />;
}

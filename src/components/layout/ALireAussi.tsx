import Link from "next/link";

/**
 * « À lire aussi » : quelques liens texte vers les fiches voisines (choisies en boucle, voir src/lib/boucle.ts).
 * Volontairement sobre (pas d'image, pas de préchargement) pour ne pas alourdir la page.
 */
export function ALireAussi({ titre = "À lire aussi", liens }: { titre?: string; liens: Array<{ href: string; nom: string; detail?: string }> }) {
  if (liens.length === 0) return null;
  return (
    <nav aria-label={titre} className="container-page mt-12">
      <h2 className="eyebrow">{titre}</h2>
      <ul className="mt-3 flex flex-col gap-2 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-8">
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href} prefetch={false} className="underline decoration-line-strong underline-offset-4 hover:text-accent">
              {l.nom}
            </Link>
            {l.detail && <span className="text-muted"> · {l.detail}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

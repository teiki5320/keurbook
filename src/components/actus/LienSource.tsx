import { ageActu, type Actu } from "@/lib/veille";

/**
 * « Source : RFI · il y a 3 h » : le nom de la source reste toujours affiché sur la carte, en texte
 * (toute la carte est déjà un lien : vers l'article sur le site, ou vers la source s'il n'est pas encore écrit).
 */
// L'âge (« il y a 3 h ») est calculé à la construction puis recalculé dans le navigateur : écart attendu, pas d'erreur React.
export function LienSource({ actu }: { actu: Actu }) {
  const age = ageActu(actu.publie_le);
  return (
    <p className="text-[13px]">
      <span className="font-medium text-accent">Source : {actu.source_nom}</span>
      {age && (
        <time dateTime={actu.publie_le} className="text-faint" suppressHydrationWarning>
          {" "}
          · {age}
        </time>
      )}
    </p>
  );
}

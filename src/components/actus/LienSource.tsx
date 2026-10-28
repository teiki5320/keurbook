"use client";

import { useSyncExternalStore } from "react";
import { ageActu, type Actu } from "@/lib/veille";

/**
 * « Source : RFI · il y a 3 h » : le nom de la source reste toujours affiché sur la carte, en texte
 * (toute la carte est déjà un lien : vers l'article sur le site, ou vers la source s'il n'est pas encore écrit).
 * L'âge est calculé dans le navigateur, après l'affichage : celui de la construction du site serait faux quelques heures plus tard.
 */
const rien = () => () => {};

export function LienSource({ actu }: { actu: Actu }) {
  // Faux pendant la construction et l'hydratation, vrai ensuite : l'âge n'apparaît qu'une fois la page affichée.
  const monte = useSyncExternalStore(rien, () => true, () => false);
  const age = monte ? ageActu(actu.publie_le) : "";
  return (
    <p className="text-[13px]">
      <span className="font-medium text-accent">Source : {actu.source_nom}</span>
      {age && (
        <time dateTime={actu.publie_le} className="text-faint">
          {` · ${age}`}
        </time>
      )}
    </p>
  );
}

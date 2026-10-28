import { getActusConstruction, getConstruits } from "@/lib/data/veille-articles";
import { BlocActusClient, type PropsBlocActus } from "./BlocActusClient";

/**
 * Bloc d'actus (accueil, page Actus, fiches auteurs) : les actus lues à la construction du site sont écrites dans la page,
 * puis remplacées dans le navigateur par la version du jour ; la liste des pages d'articles construites est écrite aussi.
 */
export function BlocActus(props: Omit<PropsBlocActus, "construits">) {
  return <BlocActusClient {...props} construits={getConstruits()} initiales={getActusConstruction()} />;
}

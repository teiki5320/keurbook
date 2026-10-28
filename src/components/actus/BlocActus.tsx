import { getConstruits } from "@/lib/data/veille-articles";
import { BlocActusClient, type PropsBlocActus } from "./BlocActusClient";

/**
 * Bloc d'actus (accueil, page Actus, fiches auteurs) : les actus sont lues en direct dans le navigateur ;
 * la liste des pages d'articles construites avec le site est écrite dans la page au moment de la construction.
 */
export function BlocActus(props: Omit<PropsBlocActus, "construits">) {
  return <BlocActusClient {...props} construits={getConstruits()} />;
}

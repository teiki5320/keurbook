"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chargerFichier, filtrerParTag, lienActu, type Actu, type FichierActus } from "@/lib/veille";
import { ActuBandeau } from "./ActuBandeau";
import { ActuVignette } from "./ActuVignette";

export interface PropsBlocActus {
  /** Titre du bloc (« Actus du livre ») ; absent sur la page /actus, qui a déjà le sien. */
  titre?: string;
  /** Petit sur-titre doré au-dessus du titre. */
  surtitre?: string;
  limite: number;
  /** Seulement les actus liées à une fiche, ex. « auteur:mariama-ba ». */
  tag?: string;
  /** Lien « Toutes les actus → ». */
  lien?: { href: string; label: string };
  /** Bandeau chargé tout de suite (accueil) ; sinon images en chargement différé. */
  prioritaire?: boolean;
  /** Affiche la date de mise à jour du fichier (page /actus). */
  avecMiseAJour?: boolean;
  /** Texte affiché quand il n'y a aucune actu (sinon le bloc n'apparaît pas). */
  siVide?: string;
  className?: string;
  /** Pages d'articles construites avec le site : id de l'actu → adresse (/actus/<slug>/). */
  construits?: Record<string, string>;
  /** Actus lues à la construction du site : écrites dans la page (lecteurs sans JavaScript, moteurs de recherche), puis remplacées par la version du jour. */
  initiales?: Actu[];
}

/** « 27 octobre à 12 h 05 », heure de Paris. */
function dateHeure(d: Date): string {
  const jour = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" });
  const [h, m] = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).split(":");
  return `${jour} à ${Number(h)} h ${m}`;
}

/**
 * Bloc d'actus lu en direct depuis la veille : la 1re en bandeau, les suivantes en vignettes.
 * Chaque carte ouvre l'article complet sur le site (voir lienActu).
 * Aucune actu, ou fichier injoignable : rien n'est affiché (ou le texte « siVide »).
 */
export function BlocActusClient({ titre, surtitre, limite, tag, lien, prioritaire = false, avecMiseAJour = false, siVide, className = "", construits = {}, initiales = [] }: PropsBlocActus) {
  const [fichier, setFichier] = useState<FichierActus | null | undefined>(initiales.length ? { version: 1, site: "keurbook", genere_le: "", actus: initiales } : undefined);

  useEffect(() => {
    let actif = true;
    // Fichier injoignable : on garde les actus écrites dans la page.
    chargerFichier().then((f) => actif && setFichier((avant) => f ?? avant));
    return () => {
      actif = false;
    };
  }, []);

  if (fichier === undefined) return null;
  const actus = filtrerParTag(fichier?.actus ?? [], tag).slice(0, limite);
  if (actus.length === 0) return siVide ? <p className={`text-[15px] text-muted ${className}`}>{siVide}</p> : null;

  const [une, ...suite] = actus;
  // Peu d'actus (accueil, fiche auteur) : le bandeau à gauche, les vignettes en colonne à droite.
  // Beaucoup (page /actus) : le bandeau sur toute la largeur, puis les vignettes sur deux colonnes ;
  // un nombre impair laisse la dernière seule : elle prend toute la ligne (jamais de case vide).
  const large = limite > 4;
  const Titre = titre ? "h3" : "h2";
  const miseAJour = fichier?.genere_le ? new Date(fichier.genere_le) : null;

  return (
    <section className={className} aria-label={titre ?? "Actus"}>
      {titre && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            {surtitre && <p className="eyebrow">{surtitre}</p>}
            <h2 className={`${surtitre ? "mt-2 " : ""}font-serif text-[34px] leading-none sm:text-5xl`}>{titre}</h2>
          </div>
          {lien && (
            <Link href={lien.href} className="shrink-0 text-[13px] text-accent hover:text-ink">
              {lien.label}
            </Link>
          )}
        </div>
      )}
      {avecMiseAJour && miseAJour && !Number.isNaN(miseAJour.getTime()) && (
        <p className="mb-5 text-[13px] text-faint">
          Mis à jour le{" "}
          <time dateTime={fichier!.genere_le}>
            {dateHeure(miseAJour)}
          </time>
        </p>
      )}
      {!large && suite.length === 1 ? (
        // Deux actus seulement : sur grand écran, deux bandeaux côte à côte de même hauteur
        // (une vignette seule, étirée à la hauteur du bandeau, aurait l'air vide).
        <div className="grid gap-4 lg:grid-cols-2">
          <ActuBandeau actu={une} lien={lienActu(une, construits)} prioritaire={prioritaire} Titre={Titre} />
          <div className="min-w-0 lg:hidden">
            <ActuVignette actu={suite[0]} lien={lienActu(suite[0], construits)} Titre={Titre} />
          </div>
          <div className="hidden min-w-0 lg:block">
            <ActuBandeau actu={suite[0]} lien={lienActu(suite[0], construits)} Titre={Titre} />
          </div>
        </div>
      ) : (
        // À côté des vignettes (55 % / 45 %), les deux colonnes finissent à la même hauteur :
        // l'image du bandeau prend la hauteur restante, les vignettes se partagent la colonne à parts égales.
        <div className={large ? "space-y-4" : `grid gap-4 ${suite.length ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]" : ""}`}>
          <ActuBandeau actu={une} lien={lienActu(une, construits)} prioritaire={prioritaire} Titre={Titre} colonne={!large && suite.length > 0} horizontal={large} />
          {suite.length > 0 && (
            <ul className={large ? "grid gap-4 md:grid-cols-2 md:[&>:last-child:nth-child(odd)]:col-span-2" : "grid gap-4 lg:auto-rows-fr"}>
              {suite.map((a) => (
                <li key={a.id} className="flex min-w-0">
                  <ActuVignette actu={a} lien={lienActu(a, construits)} Titre={Titre} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

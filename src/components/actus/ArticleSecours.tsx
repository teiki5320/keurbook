"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chargerArticle, chargerFichier, fichesDesTags, idDepuisRecherche, lienActu, type Actu, type ArticleActu, type LienCarte } from "@/lib/veille";
import { ArticleActuVue } from "./ArticleActuVue";

type Etat = { etape: "chargement" } | { etape: "introuvable" } | { etape: "pret"; article: ArticleActu; autres: Array<{ actu: Actu; lien: LienCarte }> };

/**
 * Page de secours : lit l'id dans l'adresse (« ?id=… »), puis l'article sur la veille, dans le navigateur.
 * Id inconnu ou veille injoignable : message simple et lien vers /actus.
 */
export function ArticleSecours({ auteurs, construits }: { auteurs: Record<string, string>; construits: Record<string, string> }) {
  const [etat, setEtat] = useState<Etat>({ etape: "chargement" });

  useEffect(() => {
    let actif = true;
    const id = idDepuisRecherche(window.location.search);
    (async () => {
      if (!id) return actif && setEtat({ etape: "introuvable" });
      const [article, fichier] = await Promise.all([chargerArticle(id), chargerFichier()]);
      if (!actif) return;
      if (!article) return setEtat({ etape: "introuvable" });
      document.title = `${article.titre} | Keurbook`;
      const autres = (fichier?.actus ?? [])
        .filter((a) => a.id !== id)
        .slice(0, 3)
        .map((actu) => ({ actu, lien: lienActu(actu, construits) }));
      setEtat({ etape: "pret", article, autres });
    })();
    return () => {
      actif = false;
    };
  }, [construits]);

  if (etat.etape === "pret") return <ArticleActuVue article={etat.article} fiches={fichesDesTags(etat.article.tags, auteurs)} autres={etat.autres} />;
  return (
    <div className="container-page max-w-3xl py-16" aria-live="polite">
      {etat.etape === "chargement" ? (
        <p className="text-[15px] text-muted">Chargement de l&apos;article…</p>
      ) : (
        <>
          <h1 className="font-serif text-[40px] leading-none sm:text-5xl">Article introuvable</h1>
          <p className="mt-4 text-[15px] text-muted">Cet article n&apos;existe pas ou n&apos;est plus en ligne.</p>
          <Link href="/actus" className="btn-primary mt-6">
            Voir toutes les actus
          </Link>
        </>
      )}
    </div>
  );
}

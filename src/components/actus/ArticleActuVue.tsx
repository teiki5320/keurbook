/* eslint-disable @next/next/no-img-element -- images de la veille, servies telles quelles */
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/layout/Section";
import { siteConfig } from "@/lib/config";
import { nomDomaine, type Actu, type ArticleActu, type LienCarte } from "@/lib/veille";
import { ActuVignette } from "./ActuVignette";
import { CreditImage } from "./CreditImage";

/** « 28 octobre 2026 », heure de Paris. */
function dateLongue(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
}

interface Props {
  article: ArticleActu;
  /** Fiches existantes du site liées à l'article (tags « auteur:<slug> »). */
  fiches: Array<{ href: string; nom: string }>;
  /** 3 autres actus, avec le lien de leur carte. */
  autres: Array<{ actu: Actu; lien: LienCarte }>;
}

/**
 * Article complet d'une actu : page construite /actus/<slug>/ et page de secours /actus/article/?id=….
 * Texte réécrit par la veille (jamais le texte d'origine), source et crédit de l'image toujours visibles.
 * Pas de lien Amazon sur ces pages.
 */
export function ArticleActuVue({ article, fiches, autres }: Props) {
  const lienExterne = { target: "_blank", rel: "noopener nofollow", className: "font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:text-ink" } as const;
  return (
    <>
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Actus", href: "/actus" }, { name: article.titre }]} />
      <article className="container-page max-w-3xl">
        <header className="mx-auto max-w-[680px]">
          <p className="eyebrow mt-8">
            <Link href="/actus" className="hover:text-ink">
              Actus du livre
            </Link>
          </p>
          <h1 className="mt-3 font-serif text-[40px] leading-[1.02] text-balance break-words sm:text-[56px]">{article.titre}</h1>
          <p className="mt-6 border-l-2 border-accent pl-5 text-[18px] leading-relaxed font-medium text-ink sm:text-[19px]">{article.chapo}</p>
          <p className="mt-5 text-[13px] text-faint">
            <time dateTime={article.publie_le}>{dateLongue(article.publie_le)}</time> · {article.lecture_min} min de lecture
          </p>
        </header>

        <figure className="mt-7">
          <img
            src={article.image.url}
            alt={article.image.alt}
            width={article.image.largeur}
            height={article.image.hauteur}
            fetchPriority="high"
            decoding="async"
            className="aspect-video w-full rounded-lg bg-line object-cover"
          />
          <figcaption className="mt-2">
            <CreditImage image={article.image} />
          </figcaption>
        </figure>

        <div className="prose-text mx-auto mt-8 max-w-[680px] text-[17px]">
          {article.blocs.map((b, i) => (
            <section key={i}>
              {b.intertitre && <h2>{b.intertitre}</h2>}
              {b.paragraphes.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <aside aria-labelledby="sources" className="mx-auto mt-10 max-w-[680px] rounded-xl border border-line bg-white p-5 text-[14.5px] leading-relaxed text-ink/85">
          <h2 id="sources" className="eyebrow">
            Sources
          </h2>
          <p className="mt-2">
            Article rédigé par {siteConfig.name} à partir de :{" "}
            <a href={article.source_url} {...lienExterne}>
              {article.source_nom} <span aria-hidden>↗</span>
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            {(article.autres_sources ?? []).map((u) => (
              <span key={u}>
                {", "}
                <a href={u} {...lienExterne}>
                  {nomDomaine(u)} <span aria-hidden>↗</span>
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </span>
            ))}
            .
          </p>
        </aside>

        {fiches.length > 0 && (
          <ul className="mx-auto mt-6 flex max-w-[680px] flex-wrap gap-2">
            {fiches.map((f) => (
              <li key={f.href}>
                <Link href={f.href} className="tag">
                  Lire la fiche de {f.nom} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>

      {/* Publicité : même emplacement « article » que les conseils, une seule annonce, en fin d'article. */}
      <div className="container-page max-w-3xl">
        <AdSlot placement="article" />
      </div>

      {autres.length > 0 && (
        <section className="container-page mt-14" aria-labelledby="autres-actus">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="autres-actus" className="section-title">
              Autres actus
            </h2>
            <Link href="/actus" className="text-[13px] whitespace-nowrap text-muted hover:text-accent">
              Toutes les actus →
            </Link>
          </div>
          <ul className="grid gap-4 lg:grid-cols-3">
            {autres.map(({ actu, lien }) => (
              <li key={actu.id} className="flex min-w-0">
                <ActuVignette actu={actu} lien={lien} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

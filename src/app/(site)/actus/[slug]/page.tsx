import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleActuVue } from "@/components/actus/ArticleActuVue";
import { suivantsEnBoucle } from "@/lib/boucle";
import { siteConfig } from "@/lib/config";
import { getActusConstruction, getArticleActu, getArticlesActus, getConstruits, getNomsAuteurs } from "@/lib/data/veille-articles";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { clip, pageMetadata } from "@/lib/metadata";
import { fichesDesTags, lienActu, type Actu } from "@/lib/veille";

/** Adresse factice quand la veille n'a encore aucun article (l'export statique refuse une liste vide) : page 404, hors sitemap. */
const AUCUN = "aucun-article";

/** Une page par article de la veille lu à la construction (2 fois par jour, voir .github/workflows/deploy.yml). */
export function generateStaticParams() {
  const slugs = getArticlesActus().map((a) => ({ slug: a.slug }));
  return slugs.length ? slugs : [{ slug: AUCUN }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/actus/[slug]">): Promise<Metadata> {
  const article = getArticleActu((await params).slug);
  if (!article) return {};
  // Les réseaux sociaux n'affichent pas les images SVG (cartes générées) : image de partage du site dans ce cas.
  const photo = !article.image.url.endsWith(".svg");
  return pageMetadata({
    title: article.titre,
    description: clip(article.chapo, 160),
    path: `/actus/${article.slug}`,
    type: "article",
    publishedTime: article.publie_le,
    image: photo ? article.image.url : null,
    imageAlt: article.image.alt,
  });
}

export default async function ArticleActuPage({ params }: PageProps<"/actus/[slug]">) {
  if (getMaintenance().enabled) return null;
  const article = getArticleActu((await params).slug);
  if (!article) notFound();
  const construits = getConstruits();
  const url = `${siteConfig.url}/actus/${article.slug}`;

  // Autres actus : les 3 articles construits qui suivent celui-ci, en boucle (chaque article reçoit ainsi
  // des liens des autres, pas seulement les plus récents), complétés au besoin par les actus sans page.
  // Un article dont l'actu est sortie du fichier de la veille garde sa carte (titre, chapo, image de l'article).
  const actus = getActusConstruction();
  const actuDe = new Map(actus.map((a) => [a.id, a]));
  const suivants: Actu[] = suivantsEnBoucle(getArticlesActus(), (a) => a.id === article.id, 3)
    .filter((a) => a.id !== article.id)
    .map((a) => actuDe.get(a.id) ?? { id: a.id, titre: a.titre, resume: a.chapo, source_nom: a.source_nom, source_url: a.source_url, publie_le: a.publie_le, image: a.image, slug: a.slug });
  const autres = [...suivants, ...actus.filter((a) => !construits[a.id] && a.id !== article.id)]
    .slice(0, 3)
    .map((actu) => ({ actu, lien: lienActu(actu, construits) }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.titre,
      description: article.chapo,
      datePublished: article.publie_le,
      dateModified: article.redige_le,
      inLanguage: "fr",
      image: [article.image.url],
      url,
      mainEntityOfPage: url,
      wordCount: article.mots,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/keurbook-logo.png` } },
      isBasedOn: article.source_url,
    },
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: "Actus", url: `${siteConfig.url}/actus` },
      { name: article.titre, url },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ArticleActuVue article={article} fiches={fichesDesTags(article.tags, getNomsAuteurs())} autres={autres} />
    </>
  );
}

import type { Metadata } from "next";
import { ArticleSecours } from "@/components/actus/ArticleSecours";
import { getConstruits, getNomsAuteurs } from "@/lib/data/veille-articles";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Article",
  description: "Article complet d'une actu du livre africain, rédigé par Keurbook à partir de sa source.",
  path: "/actus/article",
  noindex: true,
});

/**
 * Page de secours /actus/article/?id=… : article d'une actu parue après la dernière construction du site,
 * lu dans le navigateur. Pas indexée (noindex) et absente du sitemap ; la vraie page /actus/<slug>/ arrive
 * à la construction suivante.
 */
export default function ArticleSecoursPage() {
  if (getMaintenance().enabled) return null;
  return <ArticleSecours auteurs={getNomsAuteurs()} construits={getConstruits()} />;
}

import type { Metadata } from "next";
import { Top10View } from "@/components/top10/Top10View";
import { getMaintenance } from "@/lib/data/settings";
import { getTop10Books, getTop10s } from "@/lib/data/top10";
import { pageMetadata } from "@/lib/metadata";

const first = getTop10s()[0];

/** /top-10 ouvre le premier onglet ; l'adresse canonique est celle de cet onglet (pas de contenu en double pour Google). */
export const metadata: Metadata = {
  ...pageMetadata({ title: "Top 10", description: first.description, path: `/top-10/${first.slug}` }),
  title: { absolute: `${first.title} | Keurbook` },
};

export default async function Top10IndexPage() {
  if (getMaintenance().enabled) return null;
  return <Top10View tops={getTop10s()} top={first} books={await getTop10Books(first)} />;
}

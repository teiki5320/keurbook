import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/Section";
import { PileList } from "@/components/pile/PileList";
import { getAllBooks, toCards } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Ma pile à lire",
  description: "Les livres et BD que vous avez mis de côté sur Keurbook, gardés dans votre navigateur, sans compte.",
  path: "/pile-a-lire",
  noindex: true,
});

export default async function PilePage() {
  if (getMaintenance().enabled) return null;
  return (
    <>
      <PageHeader title="Ma pile à lire" intro="Les livres que vous avez mis de côté. Ils restent dans ce navigateur, sans compte." />
      <Suspense>
        <PileList books={await toCards(await getAllBooks())} />
      </Suspense>
    </>
  );
}

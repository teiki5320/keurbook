import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetail } from "@/components/book/BookDetail";
import { creatorNames } from "@/lib/book-utils";
import { getBookBySlug, getBookPageTitle, getBooks } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { clip, pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return (await getBooks("bd")).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/bd/[slug]">): Promise<Metadata> {
  const book = await getBookBySlug((await params).slug, "bd");
  if (!book) return {};
  return pageMetadata({
    title: await getBookPageTitle(book),
    description: clip(`${book.title} (${book.year}) , BD de ${creatorNames(book)} : ${book.summary}`),
    path: `/bd/${book.slug}`,
    image: book.cover,
    type: "book",
  });
}

export default async function BdPage({ params }: PageProps<"/bd/[slug]">) {
  if (getMaintenance().enabled) return null;
  const book = await getBookBySlug((await params).slug, "bd");
  if (!book) notFound();
  return <BookDetail book={book} />;
}

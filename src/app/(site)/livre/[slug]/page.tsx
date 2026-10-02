import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetail } from "@/components/book/BookDetail";
import { creatorNames } from "@/lib/book-utils";
import { getBookBySlug, getBookPageTitle, getBooks } from "@/lib/data/books";
import { getMaintenance } from "@/lib/data/settings";
import { clip, pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return (await getBooks("livre")).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/livre/[slug]">): Promise<Metadata> {
  const book = await getBookBySlug((await params).slug, "livre");
  if (!book) return {};
  return pageMetadata({
    title: await getBookPageTitle(book),
    description: clip(`${book.title} (${book.year}) de ${creatorNames(book)} : ${book.summary}`),
    path: `/livre/${book.slug}`,
    image: book.cover,
    type: "book",
  });
}

export default async function BookPage({ params }: PageProps<"/livre/[slug]">) {
  if (getMaintenance().enabled) return null;
  const book = await getBookBySlug((await params).slug, "livre");
  if (!book) notFound();
  return <BookDetail book={book} />;
}

import Link from "next/link";
import type { BookCardData } from "@/lib/data/books";
import { PileButton } from "../pile/PileButton";
import { AmazonButton } from "./AmazonButton";
import { BookCover } from "./BookCover";

export function BookCard({ book, showBuy = false }: { book: BookCardData; showBuy?: boolean }) {
  return (
    <article className="group relative flex flex-col">
      <Link href={book.path} className="block">
        <BookCover title={book.title} creators={book.creators} cover={book.cover} className="transition group-hover:-translate-y-1" />
      </Link>
      <div className="absolute top-2 right-2">
        <PileButton slug={book.slug} compact />
      </div>
      <h3 className="mt-3 font-serif leading-snug font-semibold">
        <Link href={book.path} className="hover:text-accent">
          {book.title}
        </Link>
      </h3>
      <p className="text-sm text-muted">
        {book.creators}
        {book.countryName ? ` · ${book.countryName}` : ""}
      </p>
      {showBuy && (
        <div className="mt-3">
          <AmazonButton href={book.amazonUrl} priceCents={book.priceCents} small />
        </div>
      )}
    </article>
  );
}

export function BookGrid({ books, showBuy = false }: { books: BookCardData[]; showBuy?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {books.map((b) => (
        <BookCard key={b.slug} book={b} showBuy={showBuy} />
      ))}
    </div>
  );
}

/** Rangée défilante (accueil). */
export function BookRow({ books }: { books: BookCardData[] }) {
  return (
    <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2">
      {books.map((b) => (
        <div key={b.slug} className="w-36 shrink-0 snap-start sm:w-44">
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}

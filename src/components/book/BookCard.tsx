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
      <h3 className="mt-3 font-serif text-[19px] leading-[1.05]">
        <Link href={book.path} className="hover:text-accent">
          {book.title}
        </Link>
      </h3>
      <p className="mt-1 text-xs text-muted">{book.creators}</p>
      <p className="mt-0.5 text-[11px] text-faint">
        {book.countryName ? `${book.countryName} · ` : ""}
        {book.year}
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
      {books.map((b) => (
        <BookCard key={b.slug} book={b} showBuy={showBuy} />
      ))}
    </div>
  );
}

/** Rangée défilante (accueil). */
export function BookRow({ books }: { books: BookCardData[] }) {
  return (
    <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:gap-5 sm:px-6">
      {books.map((b) => (
        <div key={b.slug} className="w-32 shrink-0 snap-start sm:w-44">
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}

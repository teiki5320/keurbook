/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import Link from "next/link";
import { withBase } from "@/lib/config";
import type { Conseil } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { formatDate } from "@/lib/format";

export function ConseilCard({ conseil }: { conseil: Conseil }) {
  return (
    <article className="border-t border-line">
      <Link href={`/conseils/${conseil.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6">
        {conseil.image ? (
          <img
            src={withBase(conseil.image)}
            alt=""
            loading="lazy"
            className="aspect-[3/2] w-24 rounded object-cover transition duration-500 group-hover:scale-[1.03] sm:w-48"
          />
        ) : (
          <span />
        )}
        <span>
          <span className="eyebrow block">
            {CONSEIL_CATEGORIES[conseil.theme]} <span className="text-faint">· {formatDate(conseil.date)}</span>
          </span>
          <span className="mt-2 block font-serif text-2xl leading-[1.1] italic group-hover:text-accent sm:text-[28px]">{conseil.title}</span>
          <span className="mt-2 line-clamp-2 block max-w-2xl text-sm text-muted">{conseil.resume}</span>
        </span>
        <span aria-hidden className="text-accent">→</span>
      </Link>
    </article>
  );
}

export function ConseilGrid({ conseils }: { conseils: Conseil[] }) {
  return (
    <div className="border-b border-line">
      {conseils.map((c) => (
        <ConseilCard key={c.slug} conseil={c} />
      ))}
    </div>
  );
}

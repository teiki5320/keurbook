import Link from "next/link";
import type { Conseil } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { formatDate } from "@/lib/format";

export function ConseilCard({ conseil }: { conseil: Conseil }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white p-5">
      <p className="text-xs tracking-wide text-accent uppercase">{CONSEIL_CATEGORIES[conseil.theme]}</p>
      <h3 className="mt-2 font-serif text-lg leading-snug font-semibold">
        <Link href={`/conseils/${conseil.slug}`} className="hover:text-accent">
          {conseil.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{conseil.resume}</p>
      <p className="mt-4 text-xs text-muted">{formatDate(conseil.date)}</p>
    </article>
  );
}

export function ConseilGrid({ conseils }: { conseils: Conseil[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {conseils.map((c) => (
        <ConseilCard key={c.slug} conseil={c} />
      ))}
    </div>
  );
}

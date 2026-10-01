"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { BookCardData } from "@/lib/data/books";
import { siteConfig } from "@/lib/config";
import { usePile } from "@/lib/pile";
import { BookCover } from "../book/BookCover";

/** Position et rotation des couvertures empilées (4 au plus). */
const FAN = [
  { left: "2%", top: "10%", rot: "-8deg" },
  { left: "28%", top: "0%", rot: "4deg" },
  { left: "52%", top: "12%", rot: "-3deg" },
  { left: "16%", top: "24%", rot: "9deg" },
];

/**
 * Ma pile à lire. Une liste partagée arrive par l'adresse (?l=slug1,slug2) :
 * on l'affiche et on propose de l'ajouter à sa propre pile.
 */
export function PileList({ books }: { books: BookCardData[] }) {
  const { slugs, toggle, addAll } = usePile();
  const params = useSearchParams();
  const [copied, setCopied] = useState(false);
  const bySlug = new Map(books.map((b) => [b.slug, b]));
  const shared = (params.get("l") ?? "").split(",").filter((s) => bySlug.has(s));
  const mine = slugs.flatMap((s) => bySlug.get(s) ?? []);

  const shareUrl = `${siteConfig.url}/pile-a-lire?l=${mine.map((b) => b.slug).join(",")}`;
  const shareText = `Ma pile à lire sur ${siteConfig.name} : ${shareUrl}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  return (
    <div className="container-page max-w-3xl">
      {shared.length > 0 && (
        <section className="mb-10 rounded-xl border border-accent p-5">
          <h2 className="eyebrow">Une pile à lire vous a été partagée</h2>
          <ul className="mt-2">
            {shared.map((s) => (
              <li key={s} className="border-b border-line py-2.5">
                <Link href={bySlug.get(s)!.path} className="font-serif text-xl hover:text-accent">
                  {bySlug.get(s)!.title}
                </Link>{" "}
                <span className="text-xs text-muted">— {bySlug.get(s)!.creators}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="btn-primary mt-4 w-full py-3.5 sm:w-auto" onClick={() => addAll(shared)}>
            Ajouter à ma pile à lire
          </button>
        </section>
      )}

      {mine.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div aria-hidden className="relative h-24 w-32">
            <span className="absolute top-0 left-2 h-[86px] w-[60px] -rotate-[8deg] rounded border border-dashed border-line-strong" />
            <span className="absolute top-1 left-12 h-[86px] w-[60px] rotate-6 rounded border border-dashed border-line-strong" />
          </div>
          <p className="mt-6 font-serif text-[28px] italic">Votre pile à lire est vide.</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">Ajoutez des livres avec le bouton « Ajouter à ma pile à lire » des fiches.</p>
          <Link href="/livres" className="mt-5 text-sm text-accent hover:text-ink">
            Voir les livres →
          </Link>
        </div>
      ) : (
        <>
          <p className="text-[13px] text-faint">
            {mine.length} {mine.length > 1 ? "livres" : "livre"}, gardés dans ce navigateur. Pas de compte.
          </p>

          <div aria-hidden className="relative mx-auto mt-6 h-64 max-w-sm">
            {mine.slice(0, 4).map((b, i) => (
              <div key={b.slug} className="absolute w-32" style={{ left: FAN[i].left, top: FAN[i].top, transform: `rotate(${FAN[i].rot})` }}>
                <BookCover title={b.title} creators={b.creators} cover={b.cover} className="shadow-2xl shadow-black/70" />
              </div>
            ))}
          </div>

          <ul className="mt-8 border-b border-line">
            {mine.map((b) => (
              <li key={b.slug} className="flex items-center justify-between gap-3 border-t border-line py-4">
                <div className="min-w-0">
                  <Link href={b.path} className="font-serif text-[21px] leading-tight hover:text-accent">
                    {b.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted">{b.creators}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <a href={b.amazonUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="text-[13px] text-accent hover:text-ink">
                    Amazon →
                  </a>
                  <button type="button" onClick={() => toggle(b.slug)} className="rounded-full p-1.5 text-faint hover:text-ink" aria-label={`Retirer ${b.title} de ma pile à lire`}>
                    <X className="size-4" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 py-3.5">
              Partager sur WhatsApp
            </a>
            <button type="button" className="btn-secondary py-3.5" onClick={copy}>
              {copied ? "Lien copié" : "Copier"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

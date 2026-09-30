"use client";

import { Share2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { BookCardData } from "@/lib/data/books";
import { siteConfig } from "@/lib/config";
import { usePile } from "@/lib/pile";
import { AmazonButton } from "../book/AmazonButton";
import { BookCover } from "../book/BookCover";

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
    <div className="container-page">
      {shared.length > 0 && (
        <section className="mb-10 rounded-xl border border-accent bg-accent-soft p-5">
          <h2 className="font-serif text-xl font-semibold">Une pile à lire vous a été partagée</h2>
          <ul className="mt-3 list-disc pl-5 text-sm">
            {shared.map((s) => (
              <li key={s}>
                <Link href={bySlug.get(s)!.path} className="underline">
                  {bySlug.get(s)!.title}
                </Link>{" "}
                — {bySlug.get(s)!.creators}
              </li>
            ))}
          </ul>
          <button type="button" className="btn-primary mt-4" onClick={() => addAll(shared)}>
            Ajouter à ma pile à lire
          </button>
        </section>
      )}

      {mine.length === 0 ? (
        <div className="py-12 text-center text-muted">
          <p>Votre pile à lire est vide.</p>
          <p className="mt-2">
            Ajoutez des livres avec le bouton « Ajouter à ma pile à lire » des fiches.{" "}
            <Link href="/livres" className="text-accent underline">
              Voir les livres
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="mr-auto text-sm text-muted">
              {mine.length} {mine.length > 1 ? "titres" : "titre"}
            </p>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Share2 className="size-4" aria-hidden /> Partager sur WhatsApp
            </a>
            <button type="button" className="btn-secondary" onClick={copy}>
              {copied ? "Lien copié" : "Copier le lien"}
            </button>
          </div>
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {mine.map((b) => (
              <li key={b.slug} className="flex items-center gap-4 p-4">
                <Link href={b.path} className="w-16 shrink-0">
                  <BookCover title={b.title} creators={b.creators} cover={b.cover} />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={b.path} className="font-serif font-semibold hover:text-accent">
                    {b.title}
                  </Link>
                  <p className="text-sm text-muted">{b.creators}</p>
                </div>
                <AmazonButton href={b.amazonUrl} priceCents={b.priceCents} small />
                <button type="button" onClick={() => toggle(b.slug)} className="rounded-full p-2 text-muted hover:text-ink" aria-label={`Retirer ${b.title} de ma pile à lire`}>
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou n'est plus disponible sur Keurbook.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-page flex min-h-[70dvh] flex-col justify-center py-16">
        <p className="font-serif text-[160px] leading-[0.8] text-accent italic sm:text-[220px]">404</p>
        <h1 className="mt-6 font-serif text-[44px] leading-none sm:text-6xl">Page introuvable</h1>
        <p className="mt-3 max-w-md text-[15px] text-muted">Cette page n&apos;existe pas ou n&apos;est plus disponible.</p>
        <div className="mt-8 flex max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row">
          <Link href="/livres" className="btn-primary py-4">
            Voir les livres
          </Link>
          <Link href="/" className="btn-secondary py-4">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

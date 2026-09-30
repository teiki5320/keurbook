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
      <section className="flex min-h-[60dvh] items-center justify-center px-4 py-16 text-center">
        <div>
          <p className="font-serif text-7xl font-bold text-accent">404</p>
          <h1 className="mt-4 font-serif text-3xl font-bold">Page introuvable</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">Cette page n&apos;existe pas ou n&apos;est plus disponible.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/livres" className="btn-primary">
              Voir les livres
            </Link>
            <Link href="/" className="btn-secondary">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

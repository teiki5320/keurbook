import Link from "next/link";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { CookieSettingsButton } from "../compliance/CookieBanner";
import { NAV } from "./nav";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-page grid gap-8 py-10 text-sm sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-muted">{siteConfig.tagline}, en français.</p>
        </div>
        <nav aria-label="Rubriques" className="flex flex-col gap-2">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accent">
              {n.label}
            </Link>
          ))}
          <Link href="/pile-a-lire" className="hover:text-accent">
            Ma pile à lire
          </Link>
        </nav>
        <nav aria-label="Informations légales" className="flex flex-col gap-2">
          <Link href="/mentions-legales" className="hover:text-accent">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-accent">Confidentialité</Link>
          <Link href="/conditions" className="hover:text-accent">Conditions d&apos;utilisation</Link>
          <CookieSettingsButton className="text-left hover:text-accent" />
          <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-accent">{siteConfig.contactEmail}</a>
        </nav>
      </div>
      <p className="container-page border-t border-line py-4 text-xs text-muted">{AMAZON_DISCLOSURE}</p>
    </footer>
  );
}

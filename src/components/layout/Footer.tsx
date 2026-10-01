import Link from "next/link";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { CookieSettingsButton } from "../compliance/CookieBanner";
import { NAV, SECONDARY_NAV } from "./nav";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-12 text-sm sm:grid-cols-3">
        <div>
          <p className="font-serif text-4xl leading-none">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-muted">{siteConfig.tagline}, en français.</p>
        </div>
        <nav aria-label="Rubriques" className="flex flex-col gap-2.5">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-serif text-xl leading-none hover:text-accent">
              {n.label}
            </Link>
          ))}
          <Link href="/pile-a-lire" className="font-serif text-xl leading-none hover:text-accent">
            Ma pile <i>à lire</i>
          </Link>
          {SECONDARY_NAV.map((n) => (
            <Link key={n.href} href={n.href} className="mt-1 text-muted hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Informations légales" className="flex flex-col gap-2 text-muted">
          <Link href="/mentions-legales" className="hover:text-ink">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-ink">Confidentialité</Link>
          <Link href="/conditions" className="hover:text-ink">Conditions d&apos;utilisation</Link>
          <CookieSettingsButton className="text-left hover:text-ink" />
          <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-ink">{siteConfig.contactEmail}</a>
        </nav>
      </div>
      <p className="container-page border-t border-line py-5 text-[11px] leading-relaxed text-faint">{AMAZON_DISCLOSURE}</p>
    </footer>
  );
}

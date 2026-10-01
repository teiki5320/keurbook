"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, withBase } from "@/lib/config";
import { PileCount } from "../pile/PileCount";
import { NAV, SECONDARY_NAV } from "./nav";

/** En-tête : liens en ligne sur grand écran, bouton « Menu » plein écran sur mobile. */
export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur">
        <div className="container-page flex h-16 items-center gap-8">
          <Link href="/" onClick={close} className="flex items-center gap-2.5 font-serif text-[28px] leading-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/brand/keurbook-embleme-nuit.webp")} alt="" width={36} height={36} className="size-9" />
            {siteConfig.name}
          </Link>
          <nav aria-label="Menu principal" className="hidden gap-6 text-sm text-ink/80 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/pile-a-lire" className="ml-auto hidden items-center font-serif text-xl hover:text-accent md:inline-flex">
            Ma pile <i className="ml-1.5">à lire</i>
            <PileCount />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className={`ml-auto rounded-full border px-3 py-1.5 text-[13px] md:hidden ${open ? "border-accent text-accent" : "border-ink/40"}`}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </header>
      {open && (
        <div id="menu-mobile" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-5 pt-20 pb-6 md:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={close} className="border-b border-line py-3 font-serif text-[46px] leading-none hover:text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/pile-a-lire" onClick={close} className="mt-6 flex items-center justify-between rounded-xl bg-white px-5 py-4 font-serif text-2xl">
            <span>
              Ma pile <i>à lire</i>
            </span>
            <PileCount />
          </Link>
          <nav aria-label="Listes" className="mt-6 flex gap-5 text-sm text-muted">
            {SECONDARY_NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={close} className="hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-10 text-xs text-muted">
            <Link href="/mentions-legales" onClick={close}>Mentions légales</Link>
            <Link href="/confidentialite" onClick={close}>Confidentialité</Link>
            <Link href="/conditions" onClick={close}>Conditions</Link>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </div>
        </div>
      )}
    </>
  );
}

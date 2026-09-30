"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CONSENT_COOKIE = "kb_consent";
export const OPEN_CONSENT_EVENT = "keurbook:open-cookie-settings";

interface Consent {
  necessary: true;
  date: string;
}

function readConsent(): Consent | null {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
}

function writeConsent() {
  const value: Consent = { necessary: true, date: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // Durée de conservation du choix : 6 mois (recommandation CNIL).
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${60 * 60 * 24 * 182}; Path=/; SameSite=Lax${secure}`;
}

/** Bouton à placer n'importe où (pied de page) pour rouvrir les préférences. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookies
    </button>
  );
}

/**
 * Information sur les cookies : le site ne dépose que des cookies nécessaires
 * (pile à lire en stockage local, mémorisation de ce message), aucun cookie de mesure
 * d'audience ni publicitaire ; aucun consentement n'est donc à recueillir.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lecture du cookie après montage uniquement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Bannière ouverte : on réserve sa hauteur en bas de page pour qu'elle ne cache rien
  // (liens légaux de l'écran de maintenance, pied de page).
  useEffect(() => {
    if (!open || !banner.current) return;
    const el = banner.current;
    const apply = () => (document.body.style.paddingBottom = `${el.offsetHeight}px`);
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div ref={banner} role="region" aria-label="Information sur les cookies" className="fixed inset-x-0 bottom-0 z-[55] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-xl sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          <strong className="text-ink">Cookies</strong> — Ce site n&apos;utilise qu&apos;un stockage local pour votre
          pile à lire et un cookie pour mémoriser ce message. Aucun cookie de mesure d&apos;audience ni publicitaire. Les boutons « Acheter sur Amazon » ouvrent
          Amazon.fr, qui dépose ses propres cookies.{" "}
          <Link href="/confidentialite#cookies" className="underline">En savoir plus</Link>
        </p>
        <button
          type="button"
          className="btn-primary shrink-0"
          onClick={() => {
            writeConsent();
            setOpen(false);
          }}
        >
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}

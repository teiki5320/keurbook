"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Les autres sites de la maison TOA KEUR (Keurbook, le site courant, n'y figure pas). */
const SITES = [
  { nom: "Keur Cook", texte: "la cuisine africaine", href: "https://keurcook.com/" },
  { nom: "Keur Déco", texte: "la déco africaine", href: "https://keurdeco.com/" },
  { nom: "Keurfoot", texte: "le foot africain", href: "https://keurfoot.com/" },
  { nom: "Keur Kado", texte: "les cadeaux africains", href: "https://keurkado.com/" },
  { nom: "Keur Bible", texte: "les objets chrétiens et l'art chrétien afro", href: "https://keurbible.com/" },
];

/** Menu déroulant « Les sites Keur » : liste flottante sur ordinateur, liste dépliée dans le menu mobile. */
export function SitesKeur({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const racine = useRef<HTMLDivElement>(null);
  const id = useId();

  // Échap ferme (et rend le focus au bouton) ; un clic à l'extérieur ferme aussi.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      racine.current?.querySelector<HTMLElement>("button")?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (racine.current && !racine.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const lien = "block px-4 py-2.5 text-sm hover:text-accent focus-visible:text-accent";
  return (
    <div ref={racine} className={mobile ? "mt-6" : "relative"}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className={
          mobile
            ? "flex w-full items-center justify-between rounded-xl border border-line px-5 py-3 text-left font-serif text-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            : "inline-flex items-center gap-1.5 text-sm text-ink/80 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        }
      >
        Les sites Keur
        <span aria-hidden="true" className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <ul
          id={id}
          className={
            mobile
              ? "mt-2 overflow-hidden rounded-xl border border-line bg-white"
              : "absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg"
          }
        >
          {SITES.map((s) => (
            <li key={s.href}>
              <a href={s.href} className={lien} data-umami-event="Menu sites Keur" data-umami-event-site={s.nom}>
                <span className="font-medium">{s.nom}</span> <span className="text-muted">— {s.texte}</span>
              </a>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <a href="https://toakeur.com/" className={lien} data-umami-event="Menu sites Keur" data-umami-event-site="toakeur.com">Toute la maison : toakeur.com</a>
          </li>
        </ul>
      )}
    </div>
  );
}

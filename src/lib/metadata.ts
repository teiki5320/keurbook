import type { Metadata } from "next";
import { siteConfig } from "./config";

/** Image de partage par défaut (1200 × 630, logo Keurbook), pour les pages sans image propre. */
export const DEFAULT_SHARE_IMAGES: Array<{ url: string; width: number; height: number; alt: string }> = [
  { url: "/brand/keurbook-partage.jpg", width: 1200, height: 630, alt: "Keurbook, les auteurs d'Afrique subsaharienne à la une" },
];

interface PageMetadataInput {
  title: string;
  description: string;
  /** Chemin de la page (« /livres »), utilisé pour l'adresse canonique et le partage. */
  path: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article" | "book" | "profile";
  publishedTime?: string;
  noindex?: boolean;
  /** Titre utilisé tel quel, sans le suffixe « | Keurbook » (accueil). */
  absoluteTitle?: boolean;
}

/**
 * Métadonnées d'une page : titre, description, adresse canonique et aperçu de partage.
 * Next.js remplace entièrement le bloc openGraph du layout dès qu'une page en définit un : on le reconstruit ici.
 */
export function pageMetadata({ title, description, path, image, imageAlt, type = "website", publishedTime, noindex, absoluteTitle }: PageMetadataInput): Metadata {
  // Titre complet limité à 60 caractères (au-delà, Google le coupe) : sans le suffixe s'il est trop long,
  // et coupé proprement en fin de mot si le titre seul dépasse encore.
  const fullTitle = titrePage(title, absoluteTitle);
  const absolute = fullTitle !== `${title} | ${siteConfig.name}`;
  const images = image ? [{ url: image, alt: imageAlt ?? title }] : DEFAULT_SHARE_IMAGES;
  return {
    title: absolute ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: type === "book" || type === "profile" ? "website" : type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    // Grande image autorisée dans Google Discover et les résultats (« max-image-preview:large »).
    robots: noindex ? { index: false, follow: true, "max-image-preview": "large" } : { "max-image-preview": "large" },
  };
}

/** Texte coupé proprement pour une description (≤ max caractères ; Google en montre environ 155). */
export function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Longueur maximale d'une balise title (au-delà, Google coupe le titre). */
export const TITRE_MAX = 60;

/** Coupe un texte trop long au dernier mot entier et ajoute « … » (au plus `max` caractères). Modèle : Keur Déco. */
export function couperTexte(texte: string, max: number): string {
  if (texte.length <= max) return texte;
  const coupe = texte.slice(0, max - 1);
  const espace = coupe.lastIndexOf(" ");
  return `${(espace > max / 2 ? coupe.slice(0, espace) : coupe).replace(/[\s,;:.!?«»–—-]+$/, "")}…`;
}

/** Balise title complète : « titre | Keurbook » si cela tient en 60 caractères, sinon le titre seul (coupé à 60). */
export function titrePage(title: string, sansSuffixe = false): string {
  const suffixed = `${title} | ${siteConfig.name}`;
  return !sansSuffixe && suffixed.length <= TITRE_MAX ? suffixed : couperTexte(title, TITRE_MAX);
}

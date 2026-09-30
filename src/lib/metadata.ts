import type { Metadata } from "next";
import { siteConfig } from "./config";

/**
 * Image de partage par défaut (1200 × 630), pour les pages sans image propre.
 * À fournir avec le design (public/brand/keurbook-partage.jpg) ; en attendant, pas d'image.
 */
export const DEFAULT_SHARE_IMAGES: Array<{ url: string; width: number; height: number; alt: string }> = [];

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
  // Titre complet limité à ~65 caractères (au-delà, Google le coupe) : sans le suffixe s'il est trop long.
  const suffixed = `${title} | ${siteConfig.name}`;
  const absolute = absoluteTitle || suffixed.length > 65;
  const fullTitle = absolute ? title : suffixed;
  const images = image ? [{ url: image, alt: imageAlt ?? title }] : DEFAULT_SHARE_IMAGES;
  return {
    title: absolute ? { absolute: title } : title,
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
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Texte coupé proprement pour une description (≤ max caractères). */
export function clip(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

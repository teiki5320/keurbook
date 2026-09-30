import type { ThemeKey } from "./themes";

// ------------------------------------------------------------------ Livres et BD

/** Livre ou bande dessinée : les deux ont la même fiche, la BD a sa propre rubrique (/bd). */
export type BookKind = "livre" | "bd";

/** Genre d'un livre (filtre de /livres). Les BD ont toutes le genre « bd ». */
export type Genre = "roman" | "nouvelles" | "poesie" | "theatre" | "essai" | "recit" | "contes" | "jeunesse" | "bd";

export type Audience = "adulte" | "ado" | "jeunesse";

export type ContributorRole = "auteur" | "scenariste" | "dessinateur" | "traducteur";

export interface Contributor {
  role: ContributorRole;
  /** Nom affiché. */
  name: string;
  /**
   * Fiche auteur (slug, voir src/lib/demo/authors*.ts), seulement pour les auteurs d'Afrique subsaharienne
   * (ou de sa diaspora). null pour un traducteur ou un coauteur non africain : nom affiché sans lien.
   */
  authorSlug: string | null;
}

export interface Award {
  /** Nom du prix, ex. « Prix Goncourt ». */
  name: string;
  year: number;
}

export interface Quote {
  /** 2 lignes au maximum (droit de citation). */
  text: string;
  /** Précision facultative (chapitre, personnage…). */
  source: string | null;
}

export interface Book {
  slug: string;
  kind: BookKind;
  title: string;
  subtitle: string | null;
  contributors: Contributor[];
  genre: Genre;
  audience: Audience;
  themes: ThemeKey[];
  /** Résumé écrit par nous, 3 à 5 phrases, sans dévoiler la fin. */
  summary: string;
  /** « Pourquoi le lire » : 2 ou 3 raisons courtes. */
  whyRead: string[];
  quote: Quote | null;
  /** Année de première parution (en français, ou en langue originale pour une traduction). */
  year: number;
  /** Langue d'origine pour une traduction (« anglais »), null si le livre est écrit en français. */
  originalLanguage: string | null;
  /** Éditeur de l'édition conseillée (celle vers laquelle mène Amazon). */
  publisher: string;
  pages: number | null;
  isbn: string | null;
  format: "poche" | "grand-format" | "album" | null;
  awards: Award[];
  /**
   * ASIN Amazon.fr vérifié à la main (pour un livre papier : l'ISBN-10). Sans lui, le bouton mène
   * à une recherche Amazon (titre + auteur), toujours avec le tag partenaire.
   */
  amazonAsin: string | null;
  /** Prix indicatif relevé sur Amazon (centimes), null tant qu'il n'est pas relevé. */
  priceCents: number | null;
  /** Couverture (/covers/<slug>.webp), null tant qu'elle n'est pas obtenue par un moyen autorisé. */
  cover: string | null;
  /** BD : planches autorisées par l'éditeur. */
  plates?: string[];
  featured: boolean;
  /** Date d'ajout au site (AAAA-MM-JJ) : sert au tri « Nouveautés ». */
  addedAt: string;
  isPublished: boolean;
}

// ------------------------------------------------------------------ Auteurs

export interface Author {
  slug: string;
  name: string;
  birthYear: number | null;
  deathYear: number | null;
  /** Pays d'origine (code, voir src/lib/countries.ts). */
  countryCode: string;
  /** Pour la diaspora : « Né à Paris, d'origine camerounaise ». null sinon. */
  origin: string | null;
  /** Biographie, 4 à 6 phrases. */
  bio: string;
  /** Photo libre de droits uniquement, avec crédit. */
  photo: string | null;
  photoCredit: string | null;
  /** Page source de la photo (Wikimedia Commons), liée depuis le crédit. */
  photoSource?: string | null;
  /** « Par où commencer » : slug d'un livre du site. */
  startWith: string | null;
  /** Autres titres, sans fiche sur le site : « Titre (année) ». */
  otherTitles: string[];
  awards: Award[];
}

// ------------------------------------------------------------------ Pays

export interface Country {
  code: string;
  slug: string;
  name: string;
  /** Complément « de … » avec le bon article : « du Sénégal », « de Côte d'Ivoire », « d'Éthiopie ». */
  of: string;
  /** Présentation de la littérature du pays, 3 à 5 phrases. */
  description: string;
  /** « Par où commencer » : 3 slugs de livres du pays (au plus). */
  startWith: string[];
  /** Position sur la carte (longitude, latitude). */
  lon: number;
  lat: number;
}

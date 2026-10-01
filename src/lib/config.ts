/**
 * Configuration générale du site.
 * Les valeurs propres à l'entreprise se règlent via les variables d'environnement (voir .env.example).
 */
/** Hébergeur du site : Cloudflare Pages. */
const defaultHost = { name: "Cloudflare", full: "Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis — cloudflare.com" };

/**
 * Sous-dossier du site (« /keurbook » sur GitHub Pages, vide sur keurbook.com).
 * next/link l'ajoute tout seul ; pour les images et le HTML des articles, passer par withBase().
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Chemin interne (« /authors/x.jpg ») préfixé du sous-dossier du site. */
export const withBase = (path: string) => (path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path);

/** Version provisoire (GitHub Pages) : pages non indexées par les moteurs de recherche. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Keurbook",
  tagline: "Une ode aux écrivains d'Afrique subsaharienne",
  description:
    "Une ode aux écrivains d'Afrique subsaharienne et de sa diaspora : leurs vies, leurs œuvres et leurs livres en français, du roman à la BD.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://keurbook.com").replace(/\/$/, ""),
  locale: "fr_FR",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@keurbook.com",
};

/** Informations légales de l'éditeur, affichées dans les mentions légales et les conditions d'utilisation. */
export const legalConfig = {
  companyName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME || "ALOHASH",
  legalForm: process.env.NEXT_PUBLIC_LEGAL_FORM || "SAS (société par actions simplifiée) au capital de 200 €",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "587 La Petite Sigonnière, 85190 Maché, France",
  siret: process.env.NEXT_PUBLIC_LEGAL_SIRET || "938 522 596 00015",
  rcs: process.env.NEXT_PUBLIC_LEGAL_RCS || "RCS La Roche-sur-Yon 938 522 596",
  vat: process.env.NEXT_PUBLIC_LEGAL_VAT || "FR16 938 522 596",
  director: process.env.NEXT_PUBLIC_LEGAL_DIRECTOR || "",
  phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || "",
  host: process.env.NEXT_PUBLIC_LEGAL_HOST || defaultHost.full,
  hostName: process.env.NEXT_PUBLIC_LEGAL_HOST_NAME || defaultHost.name,
};

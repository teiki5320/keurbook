import type { NextConfig } from "next";

/**
 * Site 100 % statique (dossier out/), publié sur Cloudflare Pages par
 * .github/workflows/deploy.yml. Les en-têtes de sécurité et les redirections
 * sont servis par Cloudflare : voir public/_headers et public/_redirects.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;

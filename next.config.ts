import type { NextConfig } from "next";

/**
 * Site 100 % statique (dossier out/).
 * - Cloudflare Pages (keurbook.com) : .github/workflows/deploy.yml ; en-têtes et redirections dans public/_headers et public/_redirects.
 * - GitHub Pages (version provisoire, teiki5320.github.io/keurbook) : .github/workflows/pages.yml,
 *   avec NEXT_PUBLIC_BASE_PATH=/keurbook (site servi dans un sous-dossier).
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;

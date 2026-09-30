import type { Metadata, Viewport } from "next";
import { Inter, Literata } from "next/font/google";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { siteConfig } from "@/lib/config";
import { DEFAULT_SHARE_IMAGES } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const literata = Literata({ variable: "--font-literata", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: DEFAULT_SHARE_IMAGES,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${literata.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded focus:bg-white focus:p-2">
          Aller au contenu
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

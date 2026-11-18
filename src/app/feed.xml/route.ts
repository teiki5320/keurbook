import { siteConfig } from "@/lib/config";
import { getConseils } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { getArticlesActus } from "@/lib/data/veille-articles";
import { fluxRss } from "@/lib/rss";

/** Flux RSS (/feed.xml), écrit une fois à la construction : derniers articles d'actus et conseils publiés. */
export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.url;
  // Site en maintenance : flux vide, comme le plan du site.
  const vide = getMaintenance().enabled;
  const actus = vide ? [] : getArticlesActus().map((a) => ({ titre: a.titre, lien: `${base}/actus/${a.slug}`, description: a.chapo, date: a.publie_le }));
  const conseils = vide
    ? []
    : getConseils().map((c) => ({
        titre: c.title,
        lien: `${base}/conseils/${c.slug}`,
        description: c.description,
        date: `${c.date}T06:00:00.000Z`,
        image: c.image?.startsWith("/") ? `${base}${c.image}` : null,
      }));
  const xml = fluxRss({
    titre: siteConfig.name,
    lien: base,
    description: "Dernières actus des livres et auteurs d'Afrique et derniers conseils de lecture de Keurbook.",
    adresseFlux: `${base}/feed.xml`,
    elements: [...actus, ...conseils],
  });
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book/BookCover";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { conseilSections } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { siteConfig } from "@/lib/config";
import { getAllBooks, toCards } from "@/lib/data/books";
import { getConseilBySlug, getConseils, getRelatedConseils, renderConseil } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { formatDate } from "@/lib/format";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getConseils().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) return {};
  return pageMetadata({ title: conseil.title, description: conseil.description, path: `/conseils/${conseil.slug}`, type: "article", publishedTime: conseil.date });
}

export default async function ConseilPage({ params }: PageProps<"/conseils/[slug]">) {
  if (getMaintenance().enabled) return null;
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) notFound();
  const books = await getAllBooks();
  const cited = await toCards(conseil.livres.flatMap((s) => books.filter((b) => b.slug === s)));
  const related = getRelatedConseils(conseil);
  const sections = conseilSections(conseil.body);
  const url = `${siteConfig.url}/conseils/${conseil.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: conseil.title,
      description: conseil.description,
      datePublished: conseil.date,
      inLanguage: "fr",
      url,
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: "Conseils", url: `${siteConfig.url}/conseils` },
      { name: conseil.title, url },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <article className="container-page max-w-3xl">
        <div className="flex justify-between pt-5 text-[13px]">
          <Link href="/conseils" className="text-ink/85 hover:text-accent">
            ← Conseils
          </Link>
          {/* 5. Date */}
          <time dateTime={conseil.date} className="text-faint">
            {formatDate(conseil.date)}
          </time>
        </div>
        {/* 1. Question */}
        <p className="eyebrow mt-10">
          <Link href={`/conseils#${conseil.theme}`} className="hover:text-ink">
            {CONSEIL_CATEGORIES[conseil.theme]}
          </Link>
        </p>
        <h1 className="mt-3 font-serif text-[44px] leading-none text-balance sm:text-6xl">{conseil.title}</h1>
        {/* 2. Réponse courte */}
        <p className="mt-8 border-l border-accent pl-5 text-[17px] leading-relaxed">
          <span className="sr-only">En bref : </span>
          {conseil.resume}
        </p>
        {sections.length > 2 && (
          <nav aria-label="Sommaire" className="mt-8 text-sm">
            <p className="eyebrow">Sommaire</p>
            <ol className="mt-2 border-b border-line">
              {sections.map((s, i) => (
                <li key={s.id} className="border-t border-line">
                  <a href={`#${s.id}`} className="flex gap-3 py-2.5 hover:text-accent">
                    <span className="text-faint">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* 3. Développement */}
        <div className="prose-text mt-8" dangerouslySetInnerHTML={{ __html: renderConseil(conseil.body) }} />

        {/* 4. Livres cités */}
        {cited.length > 0 && (
          <section className="mt-12" aria-labelledby="cites">
            <h2 id="cites" className="eyebrow">
              Livres cités
            </h2>
            <ul className="mt-3 space-y-2.5">
              {cited.map((b) => (
                <li key={b.slug} className="grid grid-cols-[56px_1fr_auto] items-center gap-4 rounded-lg bg-white p-2.5">
                  <Link href={b.path}>
                    <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                  </Link>
                  <div className="min-w-0">
                    <Link href={b.path} className="font-serif text-xl leading-[1.05] hover:text-accent">
                      {b.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">{b.creators}</p>
                  </div>
                  <a href={b.amazonUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="btn-primary px-3 py-2 text-xs">
                    Amazon
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* 6. Articles liés */}
      {related.length > 0 && (
        <Section title="À lire aussi" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={related} />
        </Section>
      )}
    </>
  );
}

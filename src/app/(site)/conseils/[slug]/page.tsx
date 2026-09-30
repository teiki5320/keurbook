import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookGrid } from "@/components/book/BookCard";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb, Section } from "@/components/layout/Section";
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
  const cited = conseil.livres.flatMap((s) => books.filter((b) => b.slug === s));
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
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Conseils", href: "/conseils" }, { name: conseil.title }]} />
      <article className="container-page mt-6">
        {/* 1. Question */}
        <p className="text-sm tracking-wide text-accent uppercase">
          <Link href={`/conseils#${conseil.theme}`}>{CONSEIL_CATEGORIES[conseil.theme]}</Link>
        </p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-bold sm:text-5xl">{conseil.title}</h1>
        {/* 5. Date */}
        <p className="mt-3 text-sm text-muted">
          Publié le <time dateTime={conseil.date}>{formatDate(conseil.date)}</time>
        </p>
        {/* 2. Réponse courte */}
        <p className="mt-6 max-w-3xl rounded-xl border border-line bg-white p-5 text-lg leading-relaxed">
          <strong>En bref : </strong>
          {conseil.resume}
        </p>
        {sections.length > 2 && (
          <nav aria-label="Sommaire" className="mt-6 max-w-3xl text-sm">
            <p className="font-semibold">Sommaire</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-accent">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {/* 3. Développement */}
        <div className="prose-text mt-8" dangerouslySetInnerHTML={{ __html: renderConseil(conseil.body) }} />
      </article>

      {/* 4. Livres cités */}
      {cited.length > 0 && (
        <Section title="Les livres de cet article">
          <BookGrid books={await toCards(cited)} showBuy />
        </Section>
      )}

      {/* 6. Articles liés */}
      {related.length > 0 && (
        <Section title="À lire aussi" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={related} />
        </Section>
      )}
    </>
  );
}

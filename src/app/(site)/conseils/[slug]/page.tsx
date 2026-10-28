import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { AmazonButton, AmazonNote } from "@/components/book/AmazonButton";
import { BookCover } from "@/components/book/BookCover";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { conseilSections, splitAtMiddleSection } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { siteConfig, withBase } from "@/lib/config";
import { getAllBooks, toCards } from "@/lib/data/books";
import { getConseilBySlug, getConseils, getRelatedConseils, renderConseil } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { formatDate } from "@/lib/format";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { conseilSrcSet } from "@/lib/images";

export function generateStaticParams() {
  return getConseils().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) return {};
  return pageMetadata({
    title: conseil.title,
    description: conseil.description,
    path: `/conseils/${conseil.slug}`,
    type: "article",
    publishedTime: conseil.date,
    image: conseil.image,
    imageAlt: `Illustration : ${conseil.title}`,
  });
}

export default async function ConseilPage({ params }: PageProps<"/conseils/[slug]">) {
  if (getMaintenance().enabled) return null;
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) notFound();
  const books = await getAllBooks();
  const citedBooks = conseil.livres.flatMap((s) => books.filter((b) => b.slug === s));
  const cited = await toCards(citedBooks, "conseil");
  /** Une phrase « pourquoi » par livre : la première raison « Pourquoi le lire » de sa fiche. */
  const why = new Map(citedBooks.map((b) => [b.slug, b.whyRead[0] ?? ""]));
  /** Encart du haut : les 3 premiers livres de l'article (les seuls avec un bouton Amazon, pour rester sobre). */
  const featured = cited.slice(0, 3);
  const related = getRelatedConseils(conseil);
  const sections = conseilSections(conseil.body);
  const [firstHalf, secondHalf] = splitAtMiddleSection(renderConseil(conseil.body));
  const url = `${siteConfig.url}/conseils/${conseil.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: conseil.title,
      description: conseil.description,
      datePublished: conseil.date,
      dateModified: conseil.date,
      inLanguage: "fr",
      image: `${siteConfig.url}${conseil.image ?? "/brand/keurbook-partage.jpg"}`,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      url,
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/keurbook-logo.png` },
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
        {conseil.image && (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(conseil.image)}
              srcSet={conseilSrcSet(conseil.image)}
              sizes="(min-width: 768px) 720px, 100vw"
              alt={`Illustration de l'article « ${conseil.title} »`}
              width={1200}
              height={800}
              fetchPriority="high"
              className="aspect-[3/2] w-full rounded-md object-cover shadow-2xl shadow-black/50"
            />
            <figcaption className="mt-2 text-[11px] text-faint">Illustration Keurbook (créée par intelligence artificielle).</figcaption>
          </figure>
        )}
        {/* 2. Réponse courte */}
        <p className="mt-8 border-l border-accent pl-5 text-[17px] leading-relaxed">
          <span className="sr-only">En bref : </span>
          {conseil.resume}
        </p>
        {/* Les livres de cet article : juste après « En bref », loin des publicités (milieu et fin de l'article). */}
        {featured.length > 0 && (
          <section className="mt-8 rounded-xl border border-line-strong p-4 sm:p-5" aria-labelledby="livres-article">
            <h2 id="livres-article" className="eyebrow">
              Les livres de cet article
            </h2>
            <ul className="mt-3 space-y-4">
              {featured.map((b) => (
                <li key={b.slug} className="grid grid-cols-[56px_1fr] items-start gap-4">
                  <Link href={b.path}>
                    <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                  </Link>
                  <div className="min-w-0">
                    <Link href={b.path} className="font-serif text-xl leading-[1.05] hover:text-accent">
                      {b.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">{b.creators}</p>
                    {why.get(b.slug) && <p className="mt-1.5 text-[13px] leading-snug text-ink/80">{why.get(b.slug)}</p>}
                    <div className="mt-2">
                      <AmazonButton href={b.amazonUrl} title={b.title} small />
                      <AmazonNote illustrated={!b.cover && !!b.illustration} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
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
        <div className="prose-text mt-8" dangerouslySetInnerHTML={{ __html: firstHalf }} />
        {secondHalf && (
          <>
            {/* Publicité : au milieu du texte, entre deux parties. */}
            <AdSlot placement="article" />
            <div className="prose-text" dangerouslySetInnerHTML={{ __html: secondHalf }} />
          </>
        )}

        {/* 4. Livres cités */}
        {cited.length > 0 && (
          <section className="mt-12" aria-labelledby="cites">
            <h2 id="cites" className="eyebrow">
              Livres cités
            </h2>
            <ul className="mt-3 space-y-2.5">
              {cited.map((b) => (
                <li key={b.slug} className="grid grid-cols-[56px_1fr] items-start gap-4 rounded-lg bg-white p-2.5">
                  <Link href={b.path}>
                    <BookCover title={b.title} creators={b.creators} cover={b.cover} illustration={b.illustration} />
                  </Link>
                  <div className="min-w-0">
                    <Link href={b.path} className="font-serif text-xl leading-[1.05] hover:text-accent">
                      {b.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">{b.creators}</p>
                    {why.get(b.slug) && <p className="mt-1.5 text-[13px] leading-snug text-ink/80">{why.get(b.slug)}</p>}
                    <Link href={b.path} className="mt-2 inline-block text-[13px] underline underline-offset-4 hover:text-accent">
                      Lire la fiche
                    </Link>
                  </div>
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

      {/* Publicité : en fin de page, après les articles liés (loin des boutons Amazon des livres cités). */}
      <div className="container-page">
        <AdSlot placement="article" />
      </div>
    </>
  );
}

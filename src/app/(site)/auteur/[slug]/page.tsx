/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmazonButton } from "@/components/book/AmazonButton";
import { BookGrid } from "@/components/book/BookCard";
import { AuthorAvatar } from "@/components/book/AuthorAvatar";
import { BookCover } from "@/components/book/BookCover";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Breadcrumb, Section } from "@/components/layout/Section";
import { initials, lifeYears } from "@/lib/book-utils";
import { siteConfig } from "@/lib/config";
import { getAuthorBySlug, getAuthors, getAuthorThemes, getBooksByAuthor, getCountry, getRelatedAuthors, toCard, toCards } from "@/lib/data/books";
import { getConseilsForBooks } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";
import { clip, pageMetadata } from "@/lib/metadata";
import { THEMES } from "@/lib/themes";

export async function generateStaticParams() {
  return (await getAuthors()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/auteur/[slug]">): Promise<Metadata> {
  const author = await getAuthorBySlug((await params).slug);
  if (!author) return {};
  const country = getCountry(author.countryCode);
  return pageMetadata({
    title: `${author.name} : biographie et livres`,
    description: clip(`${author.name}${country ? ` (${country.name})` : ""} : ${author.bio}`),
    path: `/auteur/${author.slug}`,
    image: author.photo,
    type: "profile",
  });
}

export default async function AuthorPage({ params }: PageProps<"/auteur/[slug]">) {
  if (getMaintenance().enabled) return null;
  const author = await getAuthorBySlug((await params).slug);
  if (!author) notFound();
  const [books, themes, related] = await Promise.all([getBooksByAuthor(author.slug), getAuthorThemes(author.slug), getRelatedAuthors(author)]);
  const country = getCountry(author.countryCode);
  const start = books.find((b) => b.slug === author.startWith) ?? books[0] ?? null;
  const startCard = start ? await toCard(start) : null;
  const conseils = getConseilsForBooks(books.map((b) => b.slug)).slice(0, 3);
  const url = `${siteConfig.url}/auteur/${author.slug}`;
  const years = lifeYears(author);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: author.name,
      url,
      description: author.bio,
      ...(author.birthYear ? { birthDate: String(author.birthYear) } : {}),
      ...(author.deathYear ? { deathDate: String(author.deathYear) } : {}),
      ...(country ? { nationality: { "@type": "Country", name: country.name } } : {}),
      ...(author.photo ? { image: `${siteConfig.url}${author.photo}` } : {}),
      ...(author.awards.length ? { award: author.awards.map((a) => `${a.name} ${a.year}`) } : {}),
    },
    breadcrumbLd([
      { name: "Accueil", url: siteConfig.url },
      { name: "Auteurs", url: `${siteConfig.url}/auteurs` },
      { name: author.name, url },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Breadcrumb items={[{ name: "Accueil", href: "/" }, { name: "Auteurs", href: "/auteurs" }, { name: author.name }]} />

      <div className="container-page mt-6 grid gap-8 md:grid-cols-[200px_1fr]">
        {/* 1. Photo (libre de droits) ou initiales */}
        <div className="mx-auto md:mx-0">
          {author.photo ? (
            <figure>
              <img src={author.photo} alt={`Portrait de ${author.name}`} className="size-44 rounded-full object-cover object-top" />
              {author.photoCredit && (
                <figcaption className="mt-2 max-w-44 text-center text-xs text-muted">
                  {author.photoSource ? (
                    <a href={author.photoSource} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {author.photoCredit}
                    </a>
                  ) : (
                    author.photoCredit
                  )}
                </figcaption>
              )}
            </figure>
          ) : (
            <span aria-hidden className="flex size-44 items-center justify-center rounded-full bg-accent-soft font-serif text-5xl font-bold">
              {initials(author.name)}
            </span>
          )}
        </div>
        <div>
          {/* 2, 3 : nom, années, pays */}
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">{author.name}</h1>
          <p className="mt-2 text-muted">
            {years && <span>{years} · </span>}
            {country && (
              <Link href={`/pays/${country.slug}`} className="hover:text-ink hover:underline">
                {country.name}
              </Link>
            )}
            {author.origin && <span> · {author.origin}</span>}
          </p>
          {/* 4. Biographie */}
          <p className="mt-6 max-w-2xl leading-relaxed">{author.bio}</p>
          {/* 8. Prix */}
          {author.awards.length > 0 && (
            <section className="mt-6" aria-labelledby="prix">
              <h2 id="prix" className="font-serif text-xl font-semibold">
                Prix littéraires
              </h2>
              <ul className="mt-2 space-y-1 text-sm">
                {author.awards.map((a) => (
                  <li key={`${a.name}-${a.year}`}>
                    {a.name} {a.year}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* 9. Thèmes récurrents */}
          {themes.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {themes.map((t) => (
                <Link key={t} href={`/livres?theme=${t}`} className="tag">
                  {THEMES[t]}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Par où commencer */}
      {startCard && (
        <Section title="Par où commencer">
          <div className="flex max-w-2xl gap-5 rounded-xl border border-line bg-white p-5">
            <Link href={startCard.path} className="w-28 shrink-0">
              <BookCover title={startCard.title} creators={startCard.creators} cover={startCard.cover} />
            </Link>
            <div>
              <Link href={startCard.path} className="font-serif text-xl font-semibold hover:text-accent">
                {startCard.title}
              </Link>
              <p className="text-sm text-muted">{start!.year}</p>
              <p className="mt-2 line-clamp-4 text-sm">{start!.summary}</p>
              <div className="mt-3">
                <AmazonButton href={startCard.amazonUrl} priceCents={startCard.priceCents} small />
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* 6. Ses livres sur le site */}
      {books.length > 0 && (
        <Section title={`Ses livres sur ${siteConfig.name}`}>
          <BookGrid books={await toCards(books)} />
        </Section>
      )}

      {/* 7. Autres titres */}
      {author.otherTitles.length > 0 && (
        <Section title="Autres titres">
          <ul className="list-disc space-y-1 pl-5">
            {author.otherTitles.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* 10. Auteurs proches */}
      {related.length > 0 && (
        <Section title="Auteurs proches">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/auteur/${a.slug}`} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 hover:border-ink">
                  <AuthorAvatar name={a.name} photo={a.photo} />
                  <span>
                    <span className="block font-semibold">{a.name}</span>
                    <span className="block text-xs text-muted">{getCountry(a.countryCode)?.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 11. Conseils liés */}
      {conseils.length > 0 && (
        <Section title="Dans nos conseils" href="/conseils" linkLabel="Tous les conseils">
          <ConseilGrid conseils={conseils} />
        </Section>
      )}
    </>
  );
}

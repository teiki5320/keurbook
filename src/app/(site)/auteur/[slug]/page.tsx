/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorTile } from "@/components/book/AuthorAvatar";
import { BookGrid } from "@/components/book/BookCard";
import { BookCover } from "@/components/book/BookCover";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Section } from "@/components/layout/Section";
import { initials, lifeYears } from "@/lib/book-utils";
import { siteConfig, withBase } from "@/lib/config";
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

  const meta = (
    <p className="eyebrow">
      {country && (
        <Link href={`/pays/${country.slug}`} className="hover:text-ink">
          {country.name}
        </Link>
      )}
      {years && ` · ${years}`}
    </p>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      {/* 1, 2, 3 : portrait pleine largeur, nom, pays, années */}
      {author.photo ? (
        <>
          <div className="relative h-[68svh] max-h-[820px] min-h-[460px] overflow-hidden">
            <img src={withBase(author.photo)} alt={`Portrait de ${author.name}`} className="absolute inset-0 size-full object-cover object-top brightness-[.8] grayscale" />
            <div className="absolute inset-0 bg-linear-to-b from-paper/50 via-transparent via-45% to-paper" />
            <div className="container-page relative flex h-full flex-col justify-between pt-5 pb-5">
              <Link href="/auteurs" className="text-[13px] text-ink/85 hover:text-accent">
                ← Auteurs
              </Link>
              <div>
                {meta}
                <h1 className="mt-2 font-serif text-[64px] leading-[0.9] sm:text-8xl">{author.name}</h1>
              </div>
            </div>
          </div>
          {author.photoCredit && (
            <p className="container-page text-[10px] text-faint">
              Photo :{" "}
              {author.photoSource ? (
                <a href={author.photoSource} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {author.photoCredit}
                </a>
              ) : (
                author.photoCredit
              )}
            </p>
          )}
        </>
      ) : (
        <header className="container-page pt-5">
          <Link href="/auteurs" className="text-[13px] text-ink/85 hover:text-accent">
            ← Auteurs
          </Link>
          <span aria-hidden className="mt-8 flex size-28 items-center justify-center rounded-full bg-white font-serif text-4xl text-muted">
            {initials(author.name)}
          </span>
          <div className="mt-6">
            {meta}
            <h1 className="mt-2 font-serif text-[64px] leading-[0.9] sm:text-8xl">{author.name}</h1>
          </div>
        </header>
      )}

      <div className="container-page max-w-3xl">
        {author.origin && <p className="mt-4 text-[13px] text-muted">{author.origin}</p>}
        {/* 4. Biographie */}
        <p className="mt-5 font-serif text-[22px] leading-[1.35] text-pretty text-ink/90 sm:text-[26px]">{author.bio}</p>

        {/* 5. Par où commencer */}
        {startCard && start && (
          <div className="mt-8 grid grid-cols-[84px_1fr] gap-4 rounded-xl bg-white p-4 sm:grid-cols-[112px_1fr] sm:gap-6 sm:p-5">
            <Link href={startCard.path}>
              <BookCover title={startCard.title} creators={startCard.creators} cover={startCard.cover} />
            </Link>
            <div className="flex flex-col justify-between">
              <div>
                <p className="eyebrow">Par où commencer</p>
                <Link href={startCard.path} className="mt-2 block font-serif text-[26px] leading-none hover:text-accent">
                  {startCard.title}
                </Link>
                <p className="mt-1 text-xs text-faint">{start.year}</p>
                <p className="mt-2 hidden text-sm text-muted sm:line-clamp-3">{start.summary}</p>
              </div>
              <a href={startCard.amazonUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="mt-3 text-[13px] text-accent hover:text-ink">
                Acheter sur Amazon →
              </a>
            </div>
          </div>
        )}

        {/* 8. Prix */}
        {author.awards.length > 0 && (
          <section className="mt-8 space-y-2" aria-labelledby="prix">
            <h2 id="prix" className="eyebrow">
              Prix littéraires
            </h2>
            {author.awards.map((a) => (
              <p key={`${a.name}-${a.year}`} className="flex items-center gap-4 rounded-md border border-line-strong p-4 font-serif text-xl leading-tight">
                <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-accent" />
                <span>
                  {a.name} <span className="text-faint">{a.year}</span>
                </span>
              </p>
            ))}
          </section>
        )}

        {/* 9. Thèmes récurrents */}
        {themes.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {themes.map((t) => (
              <Link key={t} href={`/livres?theme=${t}`} className="tag">
                {THEMES[t]}
              </Link>
            ))}
          </div>
        )}

        {/* 7. Autres titres */}
        {author.otherTitles.length > 0 && (
          <section className="mt-10" aria-labelledby="autres">
            <h2 id="autres" className="eyebrow">
              Ses autres titres
            </h2>
            <ul className="mt-3 space-y-1.5">
              {author.otherTitles.map((t) => {
                const m = t.match(/^(.*?)\s*(\(\d{4}\))$/);
                return (
                  <li key={t} className="font-serif text-[22px] leading-tight italic">
                    {m ? m[1] : t} {m && <span className="text-faint not-italic">{m[2]}</span>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>

      {/* 6. Ses livres sur le site */}
      {books.length > 1 && (
        <Section title={`Ses livres sur ${siteConfig.name}`}>
          <BookGrid books={await toCards(books)} />
        </Section>
      )}

      {/* 10. Auteurs proches */}
      {related.length > 0 && (
        <Section title="Auteurs proches">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((a) => (
              <li key={a.slug}>
                <AuthorTile slug={a.slug} name={a.name} photo={a.photo} subtitle={getCountry(a.countryCode)?.name} />
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

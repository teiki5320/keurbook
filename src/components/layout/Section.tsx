import Link from "next/link";

export function Section({ title, href, linkLabel = "Tout voir", children, id }: { title: string; href?: string; linkLabel?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="container-page mt-16">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="section-title">{title}</h2>
        {href && (
          <Link href={href} className="text-[13px] whitespace-nowrap text-muted hover:text-accent">
            {linkLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <header className="container-page pt-8 pb-6">
      <h1 className="font-serif text-[64px] leading-[0.9] sm:text-8xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-[15px] text-muted">{intro}</p>}
      {children}
    </header>
  );
}

export function Breadcrumb({ items }: { items: Array<{ name: string; href?: string }> }) {
  return (
    <nav aria-label="Fil d'Ariane" className="container-page pt-5 text-[13px] text-muted">
      <ol className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-1.5">
            {i > 0 && <span aria-hidden>·</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-faint">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

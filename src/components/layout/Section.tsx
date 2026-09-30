import Link from "next/link";

export function Section({ title, href, linkLabel = "Tout voir", children, id }: { title: string; href?: string; linkLabel?: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="container-page mt-14">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="section-title">{title}</h2>
        {href && (
          <Link href={href} className="text-sm font-medium whitespace-nowrap text-accent hover:text-ink">
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
    <header className="container-page pt-10 pb-6">
      <h1 className="font-serif text-4xl font-bold sm:text-5xl">{title}</h1>
      {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
      {children}
    </header>
  );
}

export function Breadcrumb({ items }: { items: Array<{ name: string; href?: string }> }) {
  return (
    <nav aria-label="Fil d'Ariane" className="container-page pt-6 text-sm text-muted">
      <ol className="flex flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-1">
            {i > 0 && <span aria-hidden>›</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

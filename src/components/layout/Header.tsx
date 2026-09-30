import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { PileCount } from "../pile/PileCount";
import { NAV } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <Link href="/" className="font-serif text-xl font-bold">
          {siteConfig.name}
        </Link>
        <nav aria-label="Menu principal" className="order-3 flex w-full gap-5 overflow-x-auto text-sm sm:order-none sm:w-auto">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap py-1 hover:text-accent">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/pile-a-lire" className="ml-auto text-sm font-medium hover:text-accent">
          Ma pile à lire <PileCount />
        </Link>
      </div>
    </header>
  );
}

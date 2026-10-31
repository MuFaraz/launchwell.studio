import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "WooCommerce fixes", href: "/#fixes" },
  { label: "Pricing", href: "/#estimate" },
  { label: "For agencies", href: "/white-label-web-development" },
  { label: "About", href: "/about" },
];

const cta: NavItem = { label: "Free website check", href: "/#check" };

export function Header() {
  return (
    <header className="on-ink sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="container-x relative flex h-16 items-center justify-between gap-6">
        <Logo variant="white" priority />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-quiet mx-2.5 py-1 text-[0.925rem] font-medium text-on-ink-muted transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={cta.href} className="btn btn-brand hidden min-h-10 px-4 py-2 text-sm sm:inline-flex">
            {cta.label}
          </Link>
          <MobileNav items={nav} cta={cta} />
        </div>
      </div>
    </header>
  );
}

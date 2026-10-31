import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export type NavItem = { label: string; href: string };

const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Fixes", href: "/fixes" },
  { label: "Pricing", href: "/#estimate" },
  { label: "For agencies", href: "/white-label-web-development" },
  { label: "About", href: "/about" },
];

const cta: NavItem = { label: "Free website check", href: "/#check" };

export function Header() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-line bg-bg/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <div className="container-x relative flex h-[4.25rem] items-center justify-between gap-6">
        <Logo variant="white" priority />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-quiet mx-2.5 py-1 text-[0.9rem] font-medium text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href={cta.href} className="btn btn-light hidden min-h-10 px-5 py-2 text-sm sm:inline-flex">
            {cta.label}
          </Link>
          <MobileNav items={nav} cta={cta} />
        </div>
      </div>
    </header>
  );
}

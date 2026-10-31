import Link from "next/link";
import { site, whatsappUrl } from "@/config/site";
import { wooProblems } from "@/content/woo-problems";
import { Logo } from "./logo";
import { Nap } from "./nap";
import { TrackedLink } from "./tracked-link";

// Cached so the year doesn't make every page render per request.
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const serviceLinks = [
  { label: "WooCommerce developer", href: "/woocommerce-developer" },
  { label: "WordPress website fixes", href: "/wordpress-website-fixes" },
  { label: "Shopify store setup", href: "/shopify-store-setup" },
  { label: "Website speed optimization", href: "/website-speed-optimization" },
  { label: "AI chatbot for your website", href: "/ai-chatbot-for-website" },
  { label: "White-label web development", href: "/white-label-web-development" },
];

const fixTitles: Record<string, string> = {
  "woocommerce-checkout-redirects-to-homepage": "Checkout redirects to homepage",
  "woocommerce-orders-pending-payment": "Orders stuck on pending payment",
  "woocommerce-slow-product-pages": "Slow product pages",
  "wordpress-update-broke-site": "Update broke the site",
  "woocommerce-emails-not-sending": "Order emails not sending",
};

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-on-ink-muted">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

const linkCls = "link-quiet text-white/85 hover:text-white";

export function Footer() {
  const social = [
    { label: "Fiverr (5.0★)", href: site.fiverr },
    { label: `Instagram`, href: site.instagram },
    { label: "Facebook", href: site.facebook },
    { label: "GitHub", href: site.github },
  ].filter((s) => s.href);

  return (
    <footer className="on-ink ink-texture border-t border-white/10 text-on-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="white" />
          <p className="mt-5 max-w-sm text-on-ink-muted">
            A small web studio run by {site.founder}. Websites and online stores that work properly.
          </p>
          <ul className="mt-6 space-y-2.5 text-[0.95rem]">
            <li>
              <TrackedLink lead="email" href={`mailto:${site.email}`} className="link break-all">
                {site.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                lead="whatsapp"
                href={whatsappUrl("Hi Launchwell, I found you on your website.")}
                target="_blank"
                rel="noopener"
                className="link"
              >
                WhatsApp {site.whatsappDisplay}
              </TrackedLink>
            </li>
            <li className="text-on-ink-muted">Replies within 24 hours.</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <Column title="Services">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
        </div>

        <div className="lg:col-span-3">
          <Column title="Fix guides">
            {wooProblems.map((p) => (
              <li key={p.slug}>
                <Link href={`/fixes/${p.slug}`} className={linkCls}>
                  {fixTitles[p.slug] ?? p.title}
                </Link>
              </li>
            ))}
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Studio">
            <li>
              <Link href="/about" className={linkCls}>
                About
              </Link>
            </li>
            <li>
              <Link href="/pakistan" className={linkCls}>
                Pakistan (PKR)
              </Link>
            </li>
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className={linkCls}>
                  {s.label}
                </a>
              </li>
            ))}
          </Column>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 pt-6 pb-24 text-sm text-on-ink-muted md:pb-6 lg:flex-row lg:items-center lg:justify-between">
          <Nap />
          <p className="shrink-0">
            © <Year /> {site.name} · Prices in USD unless marked
          </p>
        </div>
      </div>
    </footer>
  );
}

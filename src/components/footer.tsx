import Link from "next/link";
import { site, whatsappUrl } from "@/config/site";
import { Logo } from "./logo";
import { TrackedLink } from "./tracked-link";

// Cached so the year doesn't make every page render per request.
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const social = [
    { label: `Instagram ${site.instagramHandle}`, href: site.instagram },
    { label: "Facebook", href: site.facebook },
    { label: `Fiverr (${site.stats.fiverrRating}★, ${site.stats.fiverrReviews} reviews)`, href: site.fiverr },
  ].filter((s) => s.href);

  return (
    <footer className="on-ink border-t border-ink-line bg-ink text-on-ink">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Logo variant="white" />
          <p className="mt-5 max-w-sm text-on-ink-muted">
            A small web studio run by {site.founder}. Based in {site.city}, working with clients worldwide.
          </p>
        </div>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-on-ink-muted">Talk to us</h2>
          <ul className="mt-4 space-y-3">
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
            <li className="text-on-ink-muted">Replies within 24 hours, usually sooner.</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-on-ink-muted">Elsewhere</h2>
          <ul className="mt-4 space-y-3">
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className="link">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/agencies" className="link">
                For agencies
              </Link>
            </li>
            <li>
              <Link href="/pakistan" className="link">
                Pakistan (PKR prices)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="container-x flex flex-col gap-2 pt-6 pb-24 text-sm text-on-ink-muted sm:flex-row sm:justify-between md:pb-6">
          <p>
            © <Year /> {site.name}
          </p>
          <p>Prices in USD unless marked otherwise.</p>
        </div>
      </div>
    </footer>
  );
}

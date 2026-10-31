import type { Metadata } from "next";
import Link from "next/link";
import { CallButton } from "@/components/call-button";
import { FounderPhoto } from "@/components/founder-photo";
import { IconCheck } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Nap } from "@/components/nap";
import { PageHero } from "@/components/page-hero";
import { FiverrBadge } from "@/components/reviews";
import { SectionHeader } from "@/components/section-header";
import { TrackedLink } from "@/components/tracked-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { site, whatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "About Muhammad Faraz · Launchwell Studio" },
  description:
    "Muhammad Faraz is a full-stack developer with 6+ years and 20+ live projects, running Launchwell Studio from Karachi for clients worldwide.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", type: "profile" },
};

const answer = `Launchwell Studio is a small web studio in ${site.city}, ${site.country}, run by ${site.founder}, a full-stack developer with ${site.stats.years} years of experience and ${site.stats.liveProjects} live projects for clients in the US, UK and Canada. It builds and fixes WordPress, WooCommerce and Shopify sites, custom web apps and AI chatbots for clients worldwide.`;

const stack: { group: string; items: string[] }[] = [
  { group: "WordPress & ecommerce", items: ["WordPress", "WooCommerce", "Shopify", "PHP"] },
  { group: "Web apps", items: ["Next.js", "React", "NestJS", "Laravel", "TypeScript"] },
  { group: "Payments", items: ["Stripe", "PayPal", "Subscriptions", "Webhooks"] },
  { group: "AI", items: ["Claude (Anthropic)", "OpenAI", "Chatbots on your own content"] },
];

const principles = [
  { title: "Fixed price first", body: "You get the price, the timeline and what’s included in writing before any work starts." },
  { title: "You talk to the developer", body: "No account managers in between. The person answering your message is the person writing the code." },
  { title: "Milestones you approve", body: "Bigger projects are split into milestones, and you approve each one before its payment is released." },
  { title: "Honest advice", body: "If something isn’t worth paying for, or you can fix it yourself in ten minutes, we say so." },
  { title: "Reply within 24 hours", body: "Usually much sooner. Over email, WhatsApp or your project tool." },
  { title: "30 days of free bug fixes", body: "If something we built doesn’t work as agreed after launch, we fix it free for 30 days." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${site.url}/about`,
          name: `About ${site.founder} · Launchwell Studio`,
          about: { "@id": `${site.url}/#business` },
          mainEntity: { "@id": `${site.url}/#founder` },
        }}
      />

      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Launchwell Studio"
        title={`${site.founder}, full-stack developer and founder`}
        answer={answer}
        actions={
          <>
            <Link href="/#check" className="btn btn-brand">
              Get a free website check
            </Link>
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl("Hi Muhammad, I read your About page and I'd like to talk about a project.")}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-ink"
            >
              <WhatsAppIcon />
              WhatsApp
            </TrackedLink>
          </>
        }
        aside={<FounderPhoto className="mx-auto w-56 sm:w-64 lg:ml-auto lg:w-72" />}
      />

      <section aria-labelledby="story-title" className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow text-brand-ink">Experience</p>
            <h2 id="story-title" className="t-h2 mt-4">
              Six years of building and fixing real websites.
            </h2>
            <div className="t-lead mt-6 space-y-5 text-ink/85">
              <p>
                I’m {site.founder}. I’ve been building websites and web apps for over six years, mostly WordPress and
                WooCommerce, plus Shopify, Laravel, NestJS and Next.js. More than 20 projects I’ve worked on are live
                today, for clients in the US, UK and Canada.
              </p>
              <p>
                A lot of that work is fixing things: checkouts that redirect, payments that don’t confirm, updates that
                take a site down, pages that crawl on a phone. That’s where Launchwell’s fix guides come from.
              </p>
              <p>
                I started Launchwell to run projects the way I’d want as a client: a fixed price before work starts,
                timelines that hold, and a straight answer within a day, even when the honest answer is “you don’t need
                to pay for this”.
              </p>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-5" data-reveal>
            <dl className="card grid grid-cols-2 divide-x divide-line overflow-hidden">
              <div className="p-6">
                <dt className="text-sm text-muted">Experience</dt>
                <dd className="t-h2 mt-1">{site.stats.years} yrs</dd>
              </div>
              <div className="p-6">
                <dt className="text-sm text-muted">Live projects</dt>
                <dd className="t-h2 mt-1">{site.stats.liveProjects}</dd>
              </div>
            </dl>
            <FiverrBadge />
            <p className="text-sm text-muted">Clients in {site.clientCountries}.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="stack-title" className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="Stack" id="stack-title" title="What I build with." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s) => (
              <div key={s.group} className="card p-6" data-reveal>
                <h3 className="font-semibold">{s.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="How the studio works" id="how-title" title="Small on purpose." intro="One developer you can reach directly, working on a few projects at a time instead of many." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="card p-6" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}>
                <IconCheck className="text-brand-ink" />
                <h3 className="t-h3 mt-4">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="contact-title" className="on-ink ink-texture relative overflow-hidden py-20 text-white md:py-24">
        <div aria-hidden="true" className="glow -right-40 -bottom-40 h-[32rem] w-[32rem] opacity-70" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow text-brand">Contact</p>
            <h2 id="contact-title" className="t-h2 mt-4">
              Where to find me.
            </h2>
            <Nap className="mt-6 text-on-ink-muted" />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {[
                ["Fiverr", site.fiverr],
                ["GitHub", site.github],
                ["Instagram", site.instagram],
                ["Facebook", site.facebook],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener me" className="link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 xs:flex-row lg:col-span-5 lg:justify-end" data-reveal>
            <Link href="/#check" className="btn btn-brand">
              Get a free website check
            </Link>
            <CallButton />
          </div>
        </div>
      </section>
    </>
  );
}

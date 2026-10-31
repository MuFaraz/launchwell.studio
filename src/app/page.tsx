import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckSection } from "@/components/check-section";
import { Estimator } from "@/components/estimator";
import { FaqList } from "@/components/faq-list";
import { FounderPhoto } from "@/components/founder-photo";
import { HeroChat } from "@/components/hero-chat";
import { IconArrow, IconCheck } from "@/components/icons";
import { JsonLd, faqJsonLd } from "@/components/json-ld";
import { RecentWork } from "@/components/recent-work";
import { FiverrBadge, Reviews } from "@/components/reviews";
import { SectionHeader } from "@/components/section-header";
import { BoardArt, ChatArt, CheckoutArt, DashboardArt, ProductCardArt } from "@/components/service-art";
import { SpeedReport } from "@/components/speed-report";
import { ToolsStrip } from "@/components/tools-strip";
import { WooFixer } from "@/components/woo-fixer";
import { launchOffer } from "@/config/pricing";
import { site } from "@/config/site";
import { faqs } from "@/content/faq";
import { services, type ServiceArt } from "@/content/services";
import { wooProblems } from "@/content/woo-problems";

export const metadata: Metadata = {
  title: { absolute: "Launchwell Studio · WordPress & WooCommerce developer" },
  description:
    "WordPress, WooCommerce and Shopify sites built and fixed properly, plus web apps and AI chatbots. Fixed price first, reply within 24 hours.",
  alternates: { canonical: "/" },
};

const art: Record<ServiceArt, () => React.ReactElement> = {
  checkout: CheckoutArt,
  product: ProductCardArt,
  dashboard: DashboardArt,
  chat: ChatArt,
  board: BoardArt,
};

// Hero headline, word by word (the accent word is rendered in serif italic with the brand gradient).
const headline: { w: string; accent?: boolean }[] = [
  { w: "Websites" },
  { w: "&" },
  { w: "stores" },
  { w: "that" },
  { w: "actually", accent: true },
  { w: "work." },
];

const trust = ["Fixed price", "Reply in 24h", "30-day bug fixes"];

const steps = [
  { title: "Message us", body: "Email, WhatsApp or the form. Explain it in your own words; no brief template needed." },
  { title: "Clear quote in 24 hours", body: "A fixed price, a timeline and exactly what’s included. Nothing starts until you say yes." },
  { title: "Build with updates", body: "Progress on a private preview link, regular updates, and milestones you approve before paying." },
  { title: "Launch & support", body: "We test real orders and forms on the live site. Bugs in our work are fixed free for 30 days." },
];

const A = ({ children }: { children: React.ReactNode }) => <span className="accent">{children}</span>;

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="bg-grid" />
        <div aria-hidden="true" className="glow -top-56 -right-40 h-[44rem] w-[44rem]" />
        <div aria-hidden="true" className="glow glow-soft -bottom-80 -left-52 h-[32rem] w-[32rem]" />
        <div className="container-x relative grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:pt-24 lg:pb-28">
          <div>
            {launchOffer.enabled ? (
              <p className="rise pill">
                <span className="pill-chip">NEW</span>
                {launchOffer.text.replace(/\.$/, "")}
              </p>
            ) : null}
            <h1 id="hero-title" className="t-h1 mt-6">
              {headline.map(({ w, accent }, i) => (
                <span key={i}>
                  <span className={`rise rise-word ${accent ? "accent" : ""}`} style={{ ["--i" as string]: i + 1 }}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="t-lead rise mt-6 max-w-[34rem] text-muted md:text-lg" style={{ ["--i" as string]: 8 }}>
              WordPress, WooCommerce and Shopify, built and fixed by a developer who answers. Run by {site.founder}:{" "}
              {site.stats.years} years, {site.stats.liveProjects} live projects, a fixed price before any work starts.
            </p>
            <div className="rise mt-8 flex flex-col gap-3 xs:flex-row" style={{ ["--i" as string]: 10 }}>
              <Link href="#check" className="btn btn-primary">
                Get a free website check <span aria-hidden="true">→</span>
              </Link>
              <Link href="#estimate" className="btn btn-secondary">
                Estimate my project
              </Link>
            </div>
            <ul className="rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle" style={{ ["--i" as string]: 12 }}>
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-orange" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="rise mt-5 text-sm text-subtle" style={{ ["--i" as string]: 13 }}>
              <a href={site.fiverr} target="_blank" rel="noopener" className="link-quiet hover:text-fg">
                <span aria-hidden="true" className="text-orange">
                  ★{" "}
                </span>
                {site.stats.fiverrRating} on Fiverr · clients in {site.clientCountries}
              </a>
            </p>
          </div>

          <div>
            <HeroChat />
          </div>
        </div>
      </section>

      <ToolsStrip />

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="services-title"
            label="What we do"
            title={
              <>
                Five things, done <A>properly</A>.
              </>
            }
            intro="Most of our work is WordPress and WooCommerce. Every price is a real starting point, and you get a fixed quote before anything starts."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Art = art[s.art];
              return (
                <li
                  key={s.id}
                  className={`card card-lift flex flex-col p-5 sm:p-6 ${s.featured ? "md:col-span-2" : ""}`}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
                >
                  <Art />
                  <h3 className="t-h3 mt-6">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.intro}</p>
                  <ul
                    className={`mt-5 mb-6 space-y-2.5 text-[0.95rem] ${s.featured ? "lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0" : ""}`}
                  >
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 leading-snug text-fg/90">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                    <p className="text-[0.95rem] font-medium">{s.price}</p>
                    <Link href={s.href} className="link inline-flex items-center gap-1.5 text-sm font-medium">
                      {s.href.startsWith("/#") ? "Estimate yours" : "Learn more"}
                      <span className="sr-only"> about {s.title}</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── WooCommerce fixes ──────────────────────────────── */}
      <section id="fixes" aria-labelledby="fixes-title" className="relative scroll-mt-16 overflow-hidden border-y border-line py-20 md:py-28">
        <div aria-hidden="true" className="glow glow-soft top-20 -right-64 h-[30rem] w-[30rem] opacity-60" />
        <div className="container-x relative">
          <SectionHeader
            id="fixes-title"
            label="WooCommerce fixes"
            title={
              <>
                Store broken? Here’s what it <A>usually</A> is.
              </>
            }
            intro="Five problems that come up again and again. Pick the one that sounds like yours and see how we fix it."
          />
          <div className="mt-12" data-reveal>
            <Suspense>
              <WooFixer problems={wooProblems} />
            </Suspense>
          </div>
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="t-h2">
                Slow store? Let’s make it <A>load</A>.
              </h3>
              <p className="mt-4 text-muted">
                Every speed job starts with a baseline and ends with the same test run again, so you see exactly what
                changed, on a phone, not just a desktop score.
              </p>
              <Link href="/website-speed-optimization" className="link mt-5 inline-flex items-center gap-2 font-medium">
                How website speed optimization works <IconArrow className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7" data-reveal>
              <SpeedReport />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="reviews-title"
            label="What clients say"
            title={
              <>
                Rated 5.0 on Fiverr. In their own <A>words</A>.
              </>
            }
            action={<FiverrBadge />}
          />
          <div className="mt-12">
            <Reviews />
          </div>
        </div>
      </section>

      <RecentWork />

      {/* ── Estimator ──────────────────────────────────────── */}
      <section
        id="estimate"
        aria-labelledby="estimate-title"
        className="relative scroll-mt-16 overflow-hidden border-y border-line bg-surface py-20 md:py-28"
      >
        <div aria-hidden="true" className="glow glow-soft -right-48 -bottom-48 h-[36rem] w-[36rem] opacity-70" />
        <div className="container-x relative">
          <SectionHeader
            id="estimate-title"
            label="Project estimator"
            title={
              <>
                What will it <A>cost</A>? A range in 30 seconds.
              </>
            }
            intro="Pick what you need and a few details. The price updates as you go. No email needed to see it."
          />
          <div className="mt-12">
            <Suspense>
              <Estimator />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── How we work ────────────────────────────────────── */}
      <section id="process" aria-labelledby="process-title" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="process-title"
            label="How we work"
            title={
              <>
                Four steps. No <A>surprises</A>.
              </>
            }
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="card card-lift p-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <span className="grad-text text-3xl font-semibold tabular-nums">0{i + 1}</span>
                <h3 className="t-h3 mt-4">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3" data-reveal>
            <FounderPhoto className="w-44 sm:w-52 md:w-full md:max-w-64" />
          </div>
          <div className="md:col-span-8 lg:col-start-5" data-reveal>
            <p className="eyebrow">About</p>
            <h2 id="about-title" className="t-h2 mt-4">
              Hi, I’m {site.founder}.
            </h2>
            <div className="t-lead mt-5 space-y-4 text-muted">
              <p>
                I’ve been building websites and web apps for over six years, mostly WordPress and WooCommerce, plus
                Shopify, Laravel and Next.js. More than 20 projects I’ve worked on are live today, for clients in the US,
                UK and Canada.
              </p>
              <p>
                When you write to Launchwell, you’re talking to the person who writes the code: a fixed price before
                work starts, timelines that hold, and a straight answer within a day.
              </p>
            </div>
            <Link href="/about" className="link mt-6 inline-flex items-center gap-2 font-medium">
              More about me and how the studio works <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="faq-title"
              label="FAQ"
              title={
                <>
                  Questions people ask <A>before</A> they hire us.
                </>
              }
            />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CheckSection />
    </>
  );
}

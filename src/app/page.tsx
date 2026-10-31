import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckSection } from "@/components/check-section";
import { Estimator } from "@/components/estimator";
import { FaqList } from "@/components/faq-list";
import { FounderPhoto } from "@/components/founder-photo";
import { HeroShowcase } from "@/components/hero-showcase";
import { IconArrow, IconClock, IconShield, IconTag } from "@/components/icons";
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

const headline = ["Websites", "and", "online", "stores", "that", "work", "properly."];

const trust = [
  { Icon: IconTag, text: "Fixed price before we start" },
  { Icon: IconClock, text: "Reply within 24 hours" },
  { Icon: IconShield, text: "30-day free bug fixes" },
];

const steps = [
  { title: "Message us", body: "Email, WhatsApp or the form. Explain it in your own words; no brief template needed." },
  { title: "Clear quote in 24 hours", body: "A fixed price, a timeline and exactly what’s included. Nothing starts until you say yes." },
  { title: "Build with updates", body: "Progress on a private preview link, regular updates, and milestones you approve before paying." },
  { title: "Launch & support", body: "We test real orders and forms on the live site. Bugs in our work are fixed free for 30 days." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="on-ink ink-texture relative overflow-hidden text-white">
        <div aria-hidden="true" className="glow top-[-10%] right-[-15%] h-[42rem] w-[42rem] lg:right-[-8%]" />
        <div className="container-x relative grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-6">
            <p className="eyebrow rise text-on-ink-muted">WordPress · WooCommerce · Shopify · Web apps</p>
            <h1 id="hero-title" className="t-h1 mt-6">
              {headline.map((w, i) => (
                <span key={i}>
                  <span className={`rise rise-word ${i >= 5 ? "text-brand" : ""}`} style={{ ["--i" as string]: i + 1 }}>
                    {w}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="t-lead rise mt-6 max-w-xl text-on-ink-muted" style={{ ["--i" as string]: 8 }}>
              Built and fixed by a developer who answers. Launchwell is a small studio run by {site.founder}:{" "}
              {site.stats.years} years, {site.stats.liveProjects} live projects.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 xs:flex-row" style={{ ["--i" as string]: 9 }}>
              <Link href="#check" className="btn btn-brand">
                Get a free website check
              </Link>
              <Link href="#estimate" className="btn btn-ghost-ink">
                Estimate my project
              </Link>
            </div>
            <ul className="rise mt-8 grid gap-3 text-sm sm:grid-cols-3 sm:gap-4" style={{ ["--i" as string]: 10 }}>
              {trust.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-on-ink-muted">
                  <Icon className="shrink-0 text-brand" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="rise mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm" style={{ ["--i" as string]: 11 }}>
              {launchOffer.enabled ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1.5 font-semibold text-white">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {launchOffer.text}
                </span>
              ) : null}
              <a href={site.fiverr} target="_blank" rel="noopener" className="link-quiet text-on-ink-muted hover:text-white">
                <span aria-hidden="true" className="text-[#f2b630]">
                  ★{" "}
                </span>
                {site.stats.fiverrRating} on Fiverr · clients in {site.clientCountries}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroShowcase />
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
            title="Five things, done properly."
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
                  <ul className={`mt-5 mb-6 space-y-2.5 text-[0.975rem] ${s.featured ? "lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0" : ""}`}>
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 leading-snug">
                        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-ink" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                    <p className="text-[0.95rem] font-semibold">{s.price}</p>
                    <Link href={s.href} className="link inline-flex items-center gap-1.5 text-sm font-semibold">
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
      <section id="fixes" aria-labelledby="fixes-title" className="scroll-mt-16 border-y border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="fixes-title"
            label="WooCommerce fixes"
            title="Store broken? Here’s what it usually is."
            intro="Five problems that come up again and again. Pick the one that sounds like yours and see how we fix it."
          />
          <div className="mt-12" data-reveal>
            <Suspense>
              <WooFixer problems={wooProblems} />
            </Suspense>
          </div>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="t-h3">Slow store? We measure first.</h3>
              <p className="mt-3 text-muted">
                Every speed job starts with a baseline and ends with the same test run again, so you see exactly what
                changed, on a phone, not just a desktop score.
              </p>
              <Link href="/website-speed-optimization" className="link mt-5 inline-flex items-center gap-2 font-semibold">
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
            title="Rated 5.0 on Fiverr. In their words."
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
        className="on-ink ink-texture relative scroll-mt-16 overflow-hidden py-20 text-on-ink md:py-28"
      >
        <div aria-hidden="true" className="glow -right-48 -bottom-48 h-[40rem] w-[40rem] opacity-60" />
        <div className="container-x relative">
          <SectionHeader
            id="estimate-title"
            tone="dark"
            label="Project estimator"
            title="What will it cost? Get a range in 30 seconds."
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
          <SectionHeader id="process-title" label="How we work" title="Four steps. No surprises." />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="card p-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand/12 text-sm font-semibold text-brand-ink">
                  {i + 1}
                </span>
                <h3 className="t-h3 mt-5">{step.title}</h3>
                <p className="mt-2 text-[0.975rem] leading-relaxed text-muted">{step.body}</p>
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
            <p className="eyebrow text-brand-ink">About</p>
            <h2 id="about-title" className="t-h2 mt-4">
              Hi, I’m {site.founder}.
            </h2>
            <div className="t-lead mt-5 space-y-4 text-ink/80">
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
            <Link href="/about" className="link mt-6 inline-flex items-center gap-2 font-semibold">
              More about me and how the studio works <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="faq-title" label="FAQ" title="Questions people ask before they hire us." />
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

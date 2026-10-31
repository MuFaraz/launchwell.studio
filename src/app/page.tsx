import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CheckSection } from "@/components/check-section";
import { Estimator } from "@/components/estimator";
import { FaqList } from "@/components/faq-list";
import { JsonLd, businessJsonLd } from "@/components/json-ld";
import { RecentWork } from "@/components/recent-work";
import { Reviews } from "@/components/reviews";
import { SectionHeader } from "@/components/section-header";
import { WooFixer } from "@/components/woo-fixer";
import { launchOffer, startingPrices } from "@/config/pricing";
import { site } from "@/config/site";
import { faqs } from "@/content/faq";
import { services } from "@/content/services";
import { wooProblems } from "@/content/woo-problems";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "Message us",
    body: "Email, WhatsApp or the form below. Explain it in your own words. No brief template, no jargon needed.",
  },
  {
    title: "Clear quote in 24 hours",
    body: "A fixed price, a timeline and a list of exactly what’s included. Nothing starts until you say yes.",
  },
  {
    title: "Build with updates",
    body: "You follow progress on a private preview link and get regular updates. Questions get answered the same day.",
  },
  {
    title: "Launch & support",
    body: "We launch, test real orders and forms on the live site, and stay around. Bugs in our work are fixed free for 30 days.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={businessJsonLd()} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="container-x grid gap-12 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">WordPress · WooCommerce · Shopify · Web apps</p>
            <h1
              id="hero-title"
              className="mt-6 text-[clamp(2.5rem,6.4vw,5rem)] leading-[1.0] tracking-[-0.04em]"
            >
              Websites and online stores that <span className="mark">work properly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-muted">
              Built and fixed by a developer who answers. Launchwell is a small studio run by {site.founder}:{" "}
              {site.stats.years} years, {site.stats.liveProjects} live projects, a fixed price before any work
              starts.
            </p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <Link href="#check" className="btn btn-primary">
                Get a free website check
              </Link>
              <Link href="#estimate" className="btn btn-secondary">
                Estimate my project
              </Link>
            </div>
            {launchOffer.enabled ? (
              <p className="mt-6 inline-flex items-start gap-2 rounded-md border border-brand/50 bg-brand/10 px-3 py-2 text-sm font-bold">
                <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-ink" />
                {launchOffer.text}
              </p>
            ) : null}
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <a href={site.fiverr} target="_blank" rel="noopener" className="font-bold text-ink hover:underline">
                <span aria-hidden="true" className="text-brand-ink">
                  ★{" "}
                </span>
                {site.stats.fiverrRating} on Fiverr
              </a>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <span className="w-full sm:w-auto">clients in {site.clientCountries}</span>
            </p>
          </div>

          {/* A sample of what the free check reply looks like. */}
          <aside aria-label="Sample reply to a free website check" className="lg:col-span-5 lg:pt-4">
            <div className="relative rounded-lg border border-line bg-white shadow-[0_1px_0_rgba(11,16,32,0.04),0_20px_40px_-28px_rgba(11,16,32,0.35)]">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 text-sm">
                <span className="font-bold">Re: Free website check: yourstore.com</span>
                <span className="shrink-0 rounded border border-line px-1.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-muted uppercase">
                  Sample
                </span>
              </div>
              <div className="px-5 py-5 text-[0.95rem] leading-relaxed">
                <p>Hi Sarah, here are the 3 things I’d fix first:</p>
                <ol className="mt-4 space-y-4">
                  {[
                    [
                      "Your homepage banner is a 3 MB image.",
                      "Resize it and convert to WebP. It’s the main reason the page is slow on phones.",
                    ],
                    [
                      "Checkout only offers card payments.",
                      "Adding PayPal as a second option gives people a way to pay when their card is declined.",
                    ],
                    [
                      "Order emails go out from the server’s default mailer.",
                      "That’s why some land in spam. Set up SMTP with SPF and DKIM.",
                    ],
                  ].map(([what, why], i) => (
                    <li key={what} className="flex gap-3">
                      <span className="font-mono text-xs leading-[1.6rem] font-bold text-brand-ink">{i + 1}.</span>
                      <span>
                        <strong className="font-bold">{what}</strong> <span className="text-muted">{why}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-muted">Happy to do any of these for you, or you can do them yourself.</p>
                <p className="mt-3 font-bold">{site.founder}, Launchwell Studio</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────── */}
      <section id="services" aria-labelledby="services-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="services-title"
            index="01"
            label="What we do"
            title="Five things, done properly."
            intro="Most of our work is WordPress and WooCommerce. Every price below is a real starting point, and you get a fixed quote before anything starts."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`flex flex-col bg-white p-6 sm:p-8 ${s.featured ? "md:col-span-2 lg:grid lg:grid-cols-12 lg:gap-10" : ""}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}
              >
                <div className={s.featured ? "lg:col-span-5" : ""}>
                  <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className={`mt-3 ${s.featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.intro}</p>
                </div>
                <div className={`mt-6 flex flex-1 flex-col ${s.featured ? "lg:col-span-7 lg:mt-0" : ""}`}>
                  <ul className={`space-y-3 ${s.featured ? "lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0" : ""}`}>
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className={`flex gap-3 leading-snug ${s.featured ? "lg:flex-col lg:gap-3 lg:border-t lg:border-line lg:pt-4" : ""}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-[0.6em] h-px w-3 shrink-0 bg-brand-ink ${s.featured ? "lg:hidden" : ""}`}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                    <p className="font-bold">{s.price}</p>
                    {s.href ? (
                      <Link href={s.href} className="link text-sm font-bold">
                        How it works for agencies
                      </Link>
                    ) : (
                      <Link href="#estimate" className="link text-sm font-bold">
                        Estimate yours
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex flex-col gap-4 bg-paper-2 p-6 sm:p-8 md:col-span-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-bold">Not sure which one you need?</p>
                <p className="mt-1 text-muted">
                  Send us the site or the idea. We’ll tell you honestly what it needs, even if the answer is
                  “nothing yet”.
                </p>
              </div>
              <Link href="#check" className="btn btn-secondary shrink-0 self-start bg-white lg:self-auto">
                Get a free website check
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── WooCommerce fixes ──────────────────────────────── */}
      <section id="fixes" aria-labelledby="fixes-title" className="scroll-mt-16 border-t border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="fixes-title"
            index="02"
            label="WooCommerce fixes"
            title={
              <>
                Store broken? <span className="text-muted">Here’s what it usually is.</span>
              </>
            }
            intro="These five problems come up again and again. Pick the one that sounds like yours and see how we fix it."
          />
          <div className="mt-14" data-reveal>
            <Suspense>
              <WooFixer problems={wooProblems} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────── */}
      <section id="process" aria-labelledby="process-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="process-title"
            index="03"
            label="How we work"
            title="Four steps. No surprises."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="bg-white p-6 sm:p-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <p className="text-5xl font-extrabold tracking-tight text-brand-ink tabular-nums">{i + 1}</p>
                <h3 className="mt-6 text-xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 md:grid-cols-12" data-reveal>
            <p className="text-lg font-bold md:col-span-6 md:col-start-4">
              You get a fixed price before we start. On bigger projects, you approve each milestone before its
              payment is released.
            </p>
            <p className="text-muted md:col-span-3">
              Pay by bank transfer, Payoneer, Wise, or through Fiverr if you prefer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            id="reviews-title"
            index="04"
            label="What clients say"
            title={`${site.stats.fiverrRating} on Fiverr. In their words.`}
          />
          <div className="mt-14">
            <Reviews />
          </div>
        </div>
      </section>

      <RecentWork />

      {/* ── Estimator ──────────────────────────────────────── */}
      <section
        id="estimate"
        aria-labelledby="estimate-title"
        className="on-ink scroll-mt-16 bg-ink py-20 text-on-ink md:py-28"
      >
        <div className="container-x">
          <SectionHeader
            id="estimate-title"
            tone="dark"
            index="05"
            label="Project estimator"
            title="What will it cost? Get a range in 30 seconds."
            intro="Pick what you need and a few details. The price updates as you go. No email needed to see it."
          />
          <div className="mt-14">
            <Suspense>
              <Estimator />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Agencies ───────────────────────────────────────── */}
      <section aria-labelledby="agencies-title" className="border-b border-line py-20 md:py-24">
        <div className="container-x grid items-end gap-8 md:grid-cols-12" data-reveal>
          <div className="md:col-span-8">
            <p className="eyebrow text-muted">
              <span className="text-brand-ink">06</span> — For agencies
            </p>
            <h2 id="agencies-title" className="mt-5 text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.05]">
              Need an extra developer? We work white-label.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              You keep the client and the credit. We build under your brand, inside your Slack, Asana or Trello.{" "}
              {usd(startingPrices.agencyHourly.min)}–{startingPrices.agencyHourly.max}/hour or a fixed price, and
              your first small task is at half rate.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link href="/agencies" className="btn btn-primary">
              See how we work with agencies
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" aria-labelledby="about-title" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3" data-reveal>
            <p className="eyebrow text-muted">
              <span className="text-brand-ink">07</span> — About
            </p>
            <div className="mt-6 aspect-square w-40 overflow-hidden rounded-lg border border-line bg-paper-2 sm:w-48 md:w-full md:max-w-60">
              {site.founderPhoto ? (
                <Image
                  src={site.founderPhoto}
                  alt={`${site.founder}, founder of Launchwell Studio`}
                  width={480}
                  height={480}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-end justify-between bg-ink p-4 text-white">
                  <span className="text-5xl font-extrabold tracking-tight">MF</span>
                  <span className="mb-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-7" data-reveal>
            <h2 id="about-title" className="text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.05]">
              Hi, I’m {site.founder}.
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                I’ve been building websites and web apps for over six years, mostly WordPress and WooCommerce, plus
                Shopify, Laravel and Next.js. More than 20 projects I’ve worked on are live today, for clients in
                the US, UK and Canada.
              </p>
              <p>
                I started Launchwell to run things the way I’d want as a client: a fixed price before any work
                starts, timelines that hold, and a reply within a day, even when the honest answer is “you don’t
                need to pay for this”.
              </p>
              <p>
                I’m based in {site.city} and work with clients worldwide. When you write to Launchwell, you’re
                talking to the person who writes the code.
              </p>
            </div>
            <p className="mt-6 font-bold">{site.founder}</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader id="faq-title" index="08" label="FAQ" title="Questions people ask before they hire us." />
          <div className="mt-12 md:grid md:grid-cols-12">
            <div className="md:col-span-9 md:col-start-4" data-reveal>
              <FaqList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <CheckSection />
    </>
  );
}

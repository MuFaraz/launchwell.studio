import type { Metadata } from "next";
import { Suspense } from "react";
import { CallButton } from "@/components/call-button";
import { FaqList } from "@/components/faq-list";
import { JsonLd, faqJsonLd, serviceJsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { FiverrBadge, Reviews } from "@/components/reviews";
import { SectionHeader } from "@/components/section-header";
import { TrackedLink } from "@/components/tracked-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { startingPrices } from "@/config/pricing";
import { site, whatsappUrl } from "@/config/site";
import { usd } from "@/lib/format";

const path = "/white-label-web-development";
const rate = `${usd(startingPrices.agencyHourly.min)}–${startingPrices.agencyHourly.max}/hour`;

export const metadata: Metadata = {
  title: { absolute: "White-Label Web Development for Agencies" },
  description: `An extra developer for your agency: WordPress, WooCommerce, Shopify and custom builds under your brand. ${rate} or fixed price. First task half rate.`,
  alternates: { canonical: path },
  openGraph: { url: path },
};

const answer = `Launchwell Studio is a white-label web development partner for small agencies. We build WordPress, WooCommerce, Shopify and custom projects under your brand, inside your Slack, Asana, Trello or Jira, with an NDA before you share anything. Rates are ${rate} or a fixed price per project, and your first small task is at half rate.`;

const whatsappText = "Hi Launchwell, I run an agency and I'm looking for a white-label developer.";

const glance: [string, string][] = [
  ["Rate", `${rate}, or a fixed price per project`],
  ["First task", "Half rate, so you can test us cheaply"],
  ["Confidentiality", "NDA signed before you send files"],
  ["Tools", "Slack, Asana, Trello, Jira, Git"],
  ["Time zone", "Pakistan (UTC+5). Overlaps the UK/EU working day"],
];

const takeOn = [
  { title: "WordPress builds", body: "From your Figma, XD or a reference site. Gutenberg, Elementor or a custom theme, whichever your team prefers to maintain." },
  { title: "WooCommerce stores", body: "New stores, plus the awkward stuff: checkout bugs, payment gateways, subscriptions, speed." },
  { title: "Shopify themes", body: "Custom sections, theme edits, app setup, and moving stores over from other platforms." },
  { title: "Custom web apps", body: "Next.js, React, NestJS or Laravel. Dashboards, portals, booking systems, Stripe and PayPal." },
  { title: "Maintenance overflow", body: "The fix-it list your team never gets to: updates, bugs, speed and security for your client sites." },
  { title: "AI chatbots", body: "Chatbots for your clients’ sites, built on Claude or OpenAI and answering from their own content." },
];

const principles = [
  { title: "NDA first", body: "We sign your NDA (or ours) before you share anything. Client details stay with us." },
  { title: "Your brand, not ours", body: "No credits, no footer links, no contact with your client unless you ask us to join a call." },
  { title: "Your tools", body: "We work in your Slack, Asana, Trello or Jira, and push to your Git repo. Nothing new for your team to learn." },
  { title: "Clean handover", body: "Staging first, readable code, and short notes on anything non-obvious. Your team can take it over at any time." },
];

const turnaround: [string, string][] = [
  ["Bug fix or small change", "Within 1–2 business days"],
  ["Landing pages and websites", "As quoted per project"],
  ["WooCommerce or Shopify stores", "As quoted per project"],
  ["Web apps", "As quoted per project"],
];

const faqs = [
  {
    q: "What is white-label web development?",
    a: "You sell and manage the project; we design or build it and deliver it under your agency’s name. Your client only ever deals with you.",
  },
  {
    q: "Will you ever contact our clients?",
    a: "No. We only talk to your client if you ask us to join a call, and then as part of your team.",
  },
  {
    q: "How do we start?",
    a: "Send one small task: a bug, a page or a feature. It’s billed at half rate, so you can judge the code, communication and turnaround before committing to anything bigger.",
  },
  {
    q: "How do you bill agencies?",
    a: `Hourly at ${rate} for ongoing tasks, with time logged per task, or a fixed price per project for full builds. Payment by bank transfer, Payoneer or Wise.`,
  },
];

export default function WhiteLabelPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "White-label web development for agencies",
          description: answer,
          path,
          serviceType: "White-label web development",
          price: startingPrices.agencyHourly.min,
          unit: "hour",
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <PageHero
        crumbs={[{ name: "White-label web development", path }]}
        eyebrow="For agencies · White-label"
        title="An extra developer for your agency. You keep the client."
        answer={answer}
        actions={
          <>
            <a href="#start" className="btn btn-brand">
              Start with a test task
            </a>
            <TrackedLink lead="whatsapp" href={whatsappUrl(whatsappText)} target="_blank" rel="noopener" className="btn btn-ghost-ink">
              <WhatsAppIcon />
              WhatsApp us
            </TrackedLink>
            <CallButton />
          </>
        }
        aside={
          <dl className="rounded-xl border border-white/12 bg-white/[0.04]">
            {glance.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 border-b border-white/10 px-5 py-4 last:border-b-0">
                <dt className="text-sm text-on-ink-muted">{k}</dt>
                <dd className="col-span-2 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section aria-labelledby="take-title" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="What we take on" id="take-title" title="Send us the work you can’t get to." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {takeOn.map((t, i) => (
              <li
                key={t.title}
                className="card card-lift p-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
              >
                <h3 className="t-h3">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="border-y border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="How we work with you" id="how-title" title="Invisible to your client. Easy for your team." />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="border-t-2 border-ink pt-5"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <h3 className="t-h3">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="price-title" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="Turnaround & pricing" id="price-title" title="Simple pricing. Real deadlines." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6" data-reveal>
              <h3 className="eyebrow text-muted">Typical turnaround</h3>
              <table className="mt-4 w-full border-t border-line text-left">
                <caption className="sr-only">Typical turnaround by type of work</caption>
                <tbody>
                  {turnaround.map(([k, v]) => (
                    <tr key={k} className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 font-medium">
                        {k}
                      </th>
                      <td className="py-4 text-right font-semibold whitespace-nowrap">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted">Confirmed in writing for each task, before we start.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6" data-reveal>
              <div className="card p-6">
                <h3 className="eyebrow text-muted">Hourly</h3>
                <p className="t-h2 mt-3 whitespace-nowrap">{rate}</p>
                <p className="mt-3 leading-relaxed text-muted">
                  For ongoing work and maintenance. Time logged per task, so you can bill your client accurately.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="eyebrow text-muted">Fixed price</h3>
                <p className="t-h2 mt-3 whitespace-nowrap">Per project</p>
                <p className="mt-3 leading-relaxed text-muted">
                  For full builds. Send the brief or Figma and get a fixed quote within 24 hours.
                </p>
              </div>
              <div className="ink-texture rounded-[14px] p-6 text-white sm:col-span-2">
                <p className="text-xl font-semibold">Start with one small paid test task at half rate.</p>
                <p className="mt-2 text-on-ink-muted">
                  See the code, the communication and the turnaround before you commit to anything bigger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ag-reviews-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="Proof" id="ag-reviews-title" title="What clients say." action={<FiverrBadge />} />
          <div className="mt-12">
            <Reviews />
          </div>
        </div>
      </section>

      <section aria-labelledby="ag-faq-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader label="FAQ" id="ag-faq-title" title="Agency questions." />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <section id="start" aria-labelledby="start-title" className="on-ink ink-texture relative scroll-mt-16 overflow-hidden py-20 text-on-ink md:py-28">
        <div aria-hidden="true" className="glow -top-40 -left-40 h-[36rem] w-[36rem] opacity-70" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow text-brand">Get started</p>
            <h2 id="start-title" className="t-h2 mt-4">
              Tell us about the first task.
            </h2>
            <p className="t-lead mt-5 text-on-ink-muted">
              A link to the site or design, what needs doing and when. You’ll get a price and a date within 24 hours.
              The first one is at half rate.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <TrackedLink lead="whatsapp" href={whatsappUrl(whatsappText)} target="_blank" rel="noopener" className="btn btn-ghost-ink">
                <WhatsAppIcon />
                WhatsApp {site.whatsappDisplay}
              </TrackedLink>
              <CallButton />
            </div>
            <p className="mt-6 text-sm text-on-ink-muted">
              Or email{" "}
              <TrackedLink lead="email" href={`mailto:${site.email}?subject=White-label%20enquiry`} className="link">
                {site.email}
              </TrackedLink>
            </p>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <Suspense>
              <LeadForm
                defaultMode="project"
                allowModeSwitch={false}
                source="white_label"
                projectPlaceholder="Your agency, the task (link to the site or design), and the deadline. Tell us if you need an NDA first."
              />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

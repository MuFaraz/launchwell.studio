import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { Reviews } from "@/components/reviews";
import { SectionHeader } from "@/components/section-header";
import { TrackedLink } from "@/components/tracked-link";
import { startingPrices } from "@/config/pricing";
import { site, whatsappUrl } from "@/config/site";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  title: "White-label web development for agencies",
  description: `An extra developer for your agency. WordPress, WooCommerce, Shopify and custom builds under your brand. ${usd(startingPrices.agencyHourly.min)}–${startingPrices.agencyHourly.max}/hour or fixed price. First task at half rate.`,
  alternates: { canonical: "/agencies" },
  openGraph: { url: "/agencies" },
};

const rate = `${usd(startingPrices.agencyHourly.min)}–${startingPrices.agencyHourly.max}/hour`;

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

export default function AgenciesPage() {
  return (
    <>
      <section aria-labelledby="ag-title" className="border-b border-line">
        <div className="container-x grid gap-12 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">For agencies · White-label</p>
            <h1 id="ag-title" className="mt-6 text-[clamp(2.4rem,5.8vw,4.5rem)] leading-[1.02] tracking-[-0.04em]">
              An extra developer for your agency. <span className="text-muted">You keep the client.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              When you’ve sold more than your team can build, we pick up the work and deliver it under your brand.
              {" "}{site.stats.years} years of WordPress, WooCommerce, Shopify and custom builds.
            </p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <a href="#start" className="btn btn-primary">
                Start with a test task
              </a>
              <TrackedLink
                lead="whatsapp"
                href={whatsappUrl("Hi Launchwell, I run an agency and I'm looking for a white-label developer.")}
                target="_blank"
                rel="noopener"
                className="btn btn-secondary"
              >
                WhatsApp us
              </TrackedLink>
            </div>
          </div>
          <aside aria-label="At a glance" className="lg:col-span-5 lg:pt-4">
            <dl className="rounded-lg border border-line bg-white">
              {glance.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 border-b border-line px-5 py-4 last:border-b-0">
                  <dt className="text-sm font-bold text-muted">{k}</dt>
                  <dd className="col-span-2 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section aria-labelledby="take-title" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeader index="01" label="What we take on" id="take-title" title="Send us the work you can’t get to." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {takeOn.map((t, i) => (
              <li key={t.title} className="bg-white p-6 sm:p-7" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}>
                <h3 className="text-xl">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="border-t border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader index="02" label="How we work with you" id="how-title" title="Invisible to your client. Easy for your team." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t-2 border-ink pt-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <h3 className="text-xl">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="price-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader index="03" label="Turnaround & pricing" id="price-title" title="Simple pricing. Real deadlines." />
          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6" data-reveal>
              <h3 className="eyebrow text-muted">Typical turnaround</h3>
              <table className="mt-4 w-full border-t border-line text-left">
                <caption className="sr-only">Typical turnaround by type of work</caption>
                <tbody>
                  {turnaround.map(([k, v]) => (
                    <tr key={k} className="border-b border-line">
                      <th scope="row" className="py-4 pr-4 font-semibold">{k}</th>
                      <td className="py-4 text-right font-bold whitespace-nowrap">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted">Confirmed in writing for each task, before we start.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6" data-reveal>
              <div className="rounded-lg border border-line bg-white p-6">
                <h3 className="eyebrow text-muted">Hourly</h3>
                <p className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] font-extrabold tracking-tight whitespace-nowrap">{rate}</p>
                <p className="mt-3 leading-relaxed text-muted">
                  For ongoing work and maintenance. Time logged per task, so you can bill your client accurately.
                </p>
              </div>
              <div className="rounded-lg border border-line bg-white p-6">
                <h3 className="eyebrow text-muted">Fixed price</h3>
                <p className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] font-extrabold tracking-tight whitespace-nowrap">Per project</p>
                <p className="mt-3 leading-relaxed text-muted">
                  For full builds. Send the brief or Figma and get a fixed quote within 24 hours.
                </p>
              </div>
              <div className="rounded-lg bg-ink p-6 text-white sm:col-span-2">
                <p className="text-xl font-extrabold">Start with one small paid test task at half rate.</p>
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
          <SectionHeader index="04" label="Proof" id="ag-reviews-title" title="What clients say." />
          <div className="mt-14">
            <Reviews />
          </div>
        </div>
      </section>

      <section id="start" aria-labelledby="start-title" className="on-ink scroll-mt-16 bg-ink py-20 text-on-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow text-on-ink-muted">
              <span className="text-brand">05</span> — Get started
            </p>
            <h2 id="start-title" className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.03]">
              Tell us about the first task.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-on-ink-muted">
              A link to the site or design, what needs doing and when. You’ll get a price and a date within 24 hours.
              The first one is at half rate.
            </p>
            <ul className="mt-8 space-y-3 text-on-ink-muted">
              <li>
                <TrackedLink lead="email" href={`mailto:${site.email}?subject=White-label%20enquiry`} className="link">
                  {site.email}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  lead="whatsapp"
                  href={whatsappUrl("Hi Launchwell, I run an agency and I'm looking for a white-label developer.")}
                  target="_blank"
                  rel="noopener"
                  className="link"
                >
                  WhatsApp {site.whatsappDisplay}
                </TrackedLink>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <LeadForm
              defaultMode="project"
              allowModeSwitch={false}
              source="agencies"
              projectPlaceholder="Your agency, the task (link to the site or design), and the deadline. Tell us if you need an NDA first."
            />
          </div>
        </div>
      </section>
    </>
  );
}

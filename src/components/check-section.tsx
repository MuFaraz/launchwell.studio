import { Suspense } from "react";
import { site, whatsappUrl } from "@/config/site";
import { LeadForm } from "./lead-form";
import { TrackedLink } from "./tracked-link";

const looksAt = [
  "Speed on a real phone, not just a desktop score",
  "Checkout, forms and payments: do they actually work?",
  "Broken links, errors and outdated plugins",
  "The basics Google needs to find you",
];

export function CheckSection() {
  return (
    <section id="check" aria-labelledby="check-title" className="on-ink scroll-mt-16 bg-ink py-20 text-on-ink md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow text-on-ink-muted">
            <span className="text-brand">Free</span> — no strings
          </p>
          <h2 id="check-title" className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.03]">
            Send us your site. Get 3 practical fixes within 24 hours.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-on-ink-muted">
            A real person looks at it, not a scanner. If a fix takes ten minutes, we’ll tell you how to do it
            yourself.
          </p>
          <ul className="mt-8 space-y-3">
            {looksAt.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-on-ink-muted">
            Prefer chat?{" "}
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl("Hi Launchwell, can you check my website? It's: ")}
              target="_blank"
              rel="noopener"
              className="link font-bold"
            >
              WhatsApp {site.whatsappDisplay}
            </TrackedLink>
          </p>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <Suspense>
            <LeadForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

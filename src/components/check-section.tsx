import { Suspense } from "react";
import { site, whatsappUrl } from "@/config/site";
import { CallButton } from "./call-button";
import { IconCheck } from "./icons";
import { LeadForm } from "./lead-form";
import { TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";

const looksAt = [
  "Speed on a real phone, not just a desktop score",
  "Checkout, forms and payments: do they actually work?",
  "Broken links, errors and outdated plugins",
  "The basics Google needs to find you",
];

export function CheckSection() {
  return (
    <section
      id="check"
      aria-labelledby="check-title"
      className="on-ink ink-texture relative scroll-mt-16 overflow-hidden py-20 text-on-ink md:py-28"
    >
      <div aria-hidden="true" className="glow -top-40 -left-40 h-[36rem] w-[36rem] opacity-70" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow text-brand">Free website check</p>
          <h2 id="check-title" className="t-h2 mt-4">
            Send us your site. Get 3 practical fixes within 24 hours.
          </h2>
          <p className="t-lead mt-5 text-on-ink-muted">
            A real person looks at it, not a scanner. If a fix takes ten minutes, we’ll tell you how to do it yourself.
          </p>
          <ul className="mt-8 space-y-3">
            {looksAt.map((item) => (
              <li key={item} className="flex gap-3">
                <IconCheck className="mt-1 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl("Hi Launchwell, can you check my website? It's: ")}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-ink"
            >
              <WhatsAppIcon />
              WhatsApp {site.whatsappDisplay}
            </TrackedLink>
            <CallButton />
          </div>
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

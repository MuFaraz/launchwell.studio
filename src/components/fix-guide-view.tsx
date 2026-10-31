import Link from "next/link";
import { whatsappUrl } from "@/config/site";
import { fixGuides, fixPrice, type FixGuide } from "@/content/fix-guides";
import { servicePages } from "@/content/service-pages";
import { CheckSection } from "./check-section";
import { FaqList } from "./faq-list";
import { JsonLd, faqJsonLd, howToJsonLd } from "./json-ld";
import { PageHero } from "./page-hero";
import { RelatedLinks } from "./related-links";
import { TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";

function relatedLink(ref: string) {
  if (ref.startsWith("/")) {
    const s = servicePages.find((p) => `/${p.slug}` === ref);
    return { label: s ? s.eyebrow : ref, href: ref };
  }
  const g = fixGuides.find((f) => f.slug === ref);
  return { label: g ? g.h1 : ref, href: `/fixes/${ref}` };
}

export function FixGuideView({ guide }: { guide: FixGuide }) {
  const path = `/fixes/${guide.slug}`;
  return (
    <>
      <JsonLd data={howToJsonLd({ name: guide.h1, description: guide.answer, path, steps: guide.steps })} />
      <JsonLd data={faqJsonLd(guide.faqs)} />

      <PageHero
        crumbs={[
          { name: "Fix guides", path: "/fixes" },
          { name: guide.h1.replace(/\?$/, ""), path },
        ]}
        eyebrow="Fix guide"
        title={guide.h1}
        answer={guide.answer}
        actions={
          <>
            <Link href="#check" className="btn btn-brand">
              Have us fix it · {fixPrice.toLowerCase()}
            </Link>
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl(`Hi Launchwell, I have this problem: ${guide.h1} My site: `)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-ink"
            >
              <WhatsAppIcon />
              WhatsApp us
            </TrackedLink>
          </>
        }
      />

      <div className="container-x grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <article className="space-y-14 lg:col-span-8">
          <section aria-labelledby="causes" data-reveal>
            <h2 id="causes" className="t-h3 t-h3-lg">
              {guide.causesTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {guide.causes.map((c) => (
                <div key={c.title} className="card p-5">
                  <h3 className="font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="steps" data-reveal>
            <h2 id="steps" className="t-h3 t-h3-lg">
              How to fix it, step by step
            </h2>
            <ol className="mt-6 space-y-5">
              {guide.steps.map((s, i) => (
                <li key={s.name} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-strong text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-semibold">{s.name}</h3>
                    <p className="mt-1 leading-relaxed text-fg/80">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="hire" className="card bg-surface p-6 sm:p-8" data-reveal>
            <h2 id="hire" className="t-h3 t-h3-lg">
              When should you hire help?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {guide.whenToHire.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  <span className="text-fg/85">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-fg/85">
              We fix this kind of problem regularly. {fixPrice}, with a fixed price agreed before we start, usually within
              1–2 days.
            </p>
            <Link href="#check" className="btn btn-primary mt-6">
              Get a free website check
            </Link>
          </section>

          <section aria-labelledby="fix-faq" data-reveal>
            <h2 id="fix-faq" className="t-h3 t-h3-lg">
              Questions
            </h2>
            <div className="mt-5">
              <FaqList items={guide.faqs} />
            </div>
          </section>
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            <RelatedLinks title="Related guides and services" links={guide.related.map(relatedLink)} />
          </div>
        </aside>
      </div>

      <CheckSection />
    </>
  );
}

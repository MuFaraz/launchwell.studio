import Link from "next/link";
import { launchOffer } from "@/config/pricing";
import { whatsappUrl } from "@/config/site";
import type { Block, ServicePage } from "@/content/service-pages";
import { CallButton } from "./call-button";
import { CheckSection } from "./check-section";
import { FaqList } from "./faq-list";
import { IconCheck } from "./icons";
import { JsonLd, faqJsonLd, serviceJsonLd } from "./json-ld";
import { Nap } from "./nap";
import { PageHero } from "./page-hero";
import { RelatedLinks } from "./related-links";
import { TrackedLink } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";

export function BlockView({ block }: { block: Block }) {
  return (
    <section className="scroll-mt-24" data-reveal>
      <h2 className="t-h3 t-h3-lg">{block.h}</h2>
      {block.p?.map((t) => (
        <p key={t} className="mt-4 leading-relaxed text-fg/85">
          {t}
        </p>
      ))}
      {block.list ? (
        <ul className="mt-4 space-y-2.5">
          {block.list.map((t) => (
            <li key={t} className="flex gap-3">
              <IconCheck className="mt-1 h-[1.1rem] w-[1.1rem] shrink-0 text-orange" />
              <span className="text-fg/85">{t}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {block.steps ? (
        <ol className="mt-5 space-y-3">
          {block.steps.map((t, i) => (
            <li key={t} className="flex gap-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet/12 text-sm font-semibold text-orange">
                {i + 1}
              </span>
              <span className="pt-0.5 text-fg/85">{t}</span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function ServicePageView({ page }: { page: ServicePage }) {
  const path = `/${page.slug}`;
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: page.eyebrow,
          description: page.answer,
          path,
          serviceType: page.serviceType,
          price: page.price.from,
          unit: page.price.unit,
        })}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <PageHero
        crumbs={[{ name: page.eyebrow, path }]}
        eyebrow={page.eyebrow}
        title={page.h1}
        answer={page.answer}
        actions={
          <>
            <Link href="#check" className="btn btn-brand">
              Get a free website check
            </Link>
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl(page.whatsappText)}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost-ink"
            >
              <WhatsAppIcon />
              WhatsApp us
            </TrackedLink>
          </>
        }
        aside={
          <div className="rounded-xl border border-white/12 bg-white/[0.04] p-6">
            <p className="eyebrow text-muted">What’s included</p>
            <ul className="mt-4 space-y-2.5">
              {page.includes.map((t) => (
                <li key={t} className="flex gap-3 text-[0.975rem]">
                  <IconCheck className="mt-0.5 h-[1.1rem] w-[1.1rem] shrink-0 text-orange" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 font-semibold">{page.price.label}</p>
            {launchOffer.enabled ? <p className="mt-1 text-sm text-muted">{launchOffer.text}</p> : null}
          </div>
        }
      />

      <div className="container-x grid gap-14 py-16 md:py-20 lg:grid-cols-12">
        <article className="space-y-12 lg:col-span-8">
          {page.blocks.map((b) => (
            <BlockView key={b.h} block={b} />
          ))}

          <section aria-labelledby="page-faq" data-reveal>
            <h2 id="page-faq" className="t-h3 t-h3-lg">
              Questions about {page.eyebrow.toLowerCase()}
            </h2>
            <div className="mt-5">
              <FaqList items={page.faqs} />
            </div>
          </section>
        </article>

        <aside className="space-y-6 lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            <RelatedLinks title="Related services and guides" links={page.related} />
            <div className="card p-6">
              <p className="font-semibold">Talk to a developer</p>
              <p className="mt-1 text-[0.95rem] text-muted">Fixed price before we start. Reply within 24 hours.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link href="#check" className="btn btn-primary">
                  Get a free website check
                </Link>
                <CallButton className="btn btn-secondary" />
              </div>
              <Nap className="mt-5 border-t border-line pt-4 text-sm text-muted" />
            </div>
          </div>
        </aside>
      </div>

      <CheckSection />
    </>
  );
}

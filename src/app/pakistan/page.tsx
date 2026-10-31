import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd, faqJsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { SectionHeader } from "@/components/section-header";
import { TrackedLink } from "@/components/tracked-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { pkrPackages } from "@/config/pricing";
import { site, whatsappUrl } from "@/config/site";
import { pkr } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "Website & Online Store in Pakistan · Launchwell" },
  description: `Business website from ${pkr(pkrPackages[0].price)}, online store from ${pkr(pkrPackages[1].price)}, website + AI chatbot from ${pkr(pkrPackages[2].price)}. Fixed price, WhatsApp support, based in Karachi.`,
  alternates: { canonical: "/pakistan" },
  openGraph: { url: "/pakistan", locale: "en_PK" },
};

const hello = "Assalam o Alaikum, mujhe website ke baare mein baat karni hai.";

const steps = [
  { title: "WhatsApp karein", body: "Batayein aapka business kya hai aur website mein kya chahiye. Voice note bhi chalega." },
  { title: "Fixed price, 24 ghante mein", body: "Clear price in PKR and a timeline. No hidden charges later." },
  { title: "Kaam shuru", body: "Progress updates on WhatsApp, with a preview link so you can see the site as it’s built." },
  { title: "Launch + support", body: "Site goes live, we show you how to update it, and stay available after launch." },
];

const faqs = [
  {
    q: "Payment kaise hogi?",
    a: "Bank transfer, JazzCash or Easypaisa. 50% advance to start, 50% on delivery.",
  },
  {
    q: "Domain aur hosting?",
    a: "Domain and hosting are paid separately, usually once a year. We can arrange them for you at cost, and set everything up in your own name.",
  },
  {
    q: "Kya main khud website update kar sakta/sakti hoon?",
    a: "Yes. You can change text, photos, products and prices yourself. We record a short video for your own site showing how.",
  },
  {
    q: "Online store mein Cash on Delivery hoga?",
    a: "Yes, COD is set up in the store package. Online card payments can be added too.",
  },
  {
    q: "Website kitne din mein ban jayegi?",
    a: "Business website in about 7 days, online store in 10–14 days, website + AI chatbot in 14–21 days, once we have your content.",
  },
];

export default function PakistanPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section aria-labelledby="pk-title" className="border-b border-line">
        <div className="container-x pt-14 pb-20 md:pt-20 lg:pb-24">
          <Breadcrumbs tone="light" items={[{ name: "Pakistan", path: "/pakistan" }]} />
          <p className="eyebrow mt-8 text-muted">Pakistan · Karachi se, poore Pakistan ke liye</p>
          <h1
            id="pk-title"
            className="t-h1 mt-6 max-w-4xl"
          >
            Apna business online laayen. <span className="mark">Sahi tareeqay se.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Websites, online stores and AI chatbots for Pakistani businesses. Fixed price in PKR, baat WhatsApp par,
            and a site that works properly on every phone. Same developer who builds for clients in the UK, US and
            Canada.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl(hello)}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              <WhatsAppIcon />
              WhatsApp par baat karein
            </TrackedLink>
            <a href="#packages" className="btn btn-secondary">
              Packages dekhein
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            {site.whatsappDisplay} · Reply within 24 hours
          </p>
        </div>
      </section>

      <section id="packages" aria-labelledby="pk-packages-title" className="scroll-mt-16 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
           
            label="Packages"
            id="pk-packages-title"
            title="Teen packages. Clear prices."
            intro="Starting prices. Your exact price depends on pages, products and features, and you get it in writing before we start."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
            {pkrPackages.map((p, i) => (
              <li
                key={p.name}
                className={`flex flex-col p-6 sm:p-8 ${i === 1 ? "bg-ink text-white" : "bg-white"}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <h3 className="t-h3">{p.name}</h3>
                <p className="mt-5">
                  <span className={`text-sm font-semibold ${i === 1 ? "text-on-ink-muted" : "text-muted"}`}>from </span>
                  <span className="text-4xl font-semibold tracking-tight tabular-nums">{pkr(p.price)}</span>
                </p>
                <p className={`mt-1 text-sm font-semibold ${i === 1 ? "text-brand" : "text-brand-ink"}`}>{p.time}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3 leading-snug">
                      <span
                        aria-hidden="true"
                        className={`mt-[0.55em] h-px w-3 shrink-0 ${i === 1 ? "bg-brand" : "bg-brand-ink"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  lead="whatsapp"
                  href={whatsappUrl(`Assalam o Alaikum, mujhe "${p.name}" package ke baare mein baat karni hai.`)}
                  target="_blank"
                  rel="noopener"
                  className={`btn mt-8 ${i === 1 ? "btn-brand" : "btn-primary"}`}
                >
                  WhatsApp: {p.name}
                </TrackedLink>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Already have a website that’s slow or broken? Fixes are quoted separately. Just send the link on WhatsApp.
          </p>
        </div>
      </section>

      <section aria-labelledby="pk-steps-title" className="border-t border-line bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="Kaise kaam hota hai" id="pk-steps-title" title="Chaar simple steps." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-5" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <p className="font-mono text-sm text-brand-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-3">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="pk-faq-title" className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHeader label="Sawal jawab" id="pk-faq-title" title="Aksar poochay jaane wale sawal." />
          <div className="mt-12 md:grid md:grid-cols-12">
            <div className="md:col-span-9 md:col-start-4" data-reveal>
              <FaqList items={faqs} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pk-contact-title" className="on-ink bg-ink py-20 text-on-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <h2 id="pk-contact-title" className="t-h2">
              Shuru karein? Ek message kaafi hai.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-on-ink-muted">
              WhatsApp is the fastest way to reach us. Prefer email? Use the form and we’ll reply within 24 hours.
            </p>
            <TrackedLink
              lead="whatsapp"
              href={whatsappUrl(hello)}
              target="_blank"
              rel="noopener"
              className="btn btn-brand mt-8"
            >
              <WhatsAppIcon />
              WhatsApp {site.whatsappDisplay}
            </TrackedLink>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <LeadForm
              defaultMode="project"
              allowModeSwitch={false}
              source="pakistan"
              projectPlaceholder="Aapka business kya hai, aur website mein kya chahiye? Roman Urdu ya English, dono theek hain."
            />
          </div>
        </div>
      </section>
    </>
  );
}

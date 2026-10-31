import { launchOffer, pkrPackages, startingPrices as p } from "@/config/pricing";
import { napLine, site } from "@/config/site";
import { faqs } from "@/content/faq";
import { fixGuides } from "@/content/fix-guides";
import { servicePages } from "@/content/service-pages";
import { pkr, usd } from "./format";

// /llms.txt and /llms-full.txt: plain-text summaries for AI answer engines.
// Built from the same config and content as the pages, so they never drift.

const u = (path: string) => `${site.url}${path}`;

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.name} is a small web studio in ${site.city}, ${site.country}, run by ${site.founder} (${site.founderTitle}). It builds and fixes WordPress, WooCommerce and Shopify websites, custom web apps (Next.js, React, NestJS, Laravel) and AI chatbots (Claude, OpenAI) for small businesses and agencies worldwide. Fixed price before work starts; replies within 24 hours.`,
    "",
    `- Contact: ${napLine.join(" · ")}`,
    `- WhatsApp: https://wa.me/${site.whatsappNumber}`,
    `- Experience: ${site.stats.years} years, ${site.stats.liveProjects} live projects, clients in ${site.clientCountries}`,
    `- Rating: ${site.stats.fiverrRating} on Fiverr from ${site.stats.fiverrReviews} reviews (${site.fiverr})`,
    "",
    "## Starting prices (USD)",
    "",
    `- WordPress business website: from ${usd(p.wordpressSite)}`,
    `- WooCommerce store: from ${usd(p.wooStore)}`,
    `- Shopify store: from ${usd(p.shopifyStore)}`,
    `- Fix or speed-up: from ${usd(p.fix)}`,
    `- WordPress care plan: from ${usd(p.carePlanMonthly)}/month`,
    `- Custom web app: from ${usd(p.webApp)}`,
    `- AI chatbot: from ${usd(p.chatbot)}`,
    `- White-label for agencies: ${usd(p.agencyHourly.min)}–${p.agencyHourly.max}/hour or fixed price`,
    `- Pakistan (PKR): ${pkrPackages.map((k) => `${k.name} from ${pkr(k.price)}`).join("; ")}`,
    ...(launchOffer.enabled ? [`- ${launchOffer.text}`] : []),
    "",
  ];
}

function links() {
  return [
    "## Services",
    "",
    ...servicePages.map((s) => `- [${s.eyebrow}](${u(`/${s.slug}`)}): ${s.metaDescription}`),
    `- [White-label web development for agencies](${u("/white-label-web-development")}): An extra developer for agencies, under the agency's brand.`,
    "",
    "## Fix guides",
    "",
    ...fixGuides.map((g) => `- [${g.h1}](${u(`/fixes/${g.slug}`)}): ${g.metaDescription}`),
    "",
    "## About",
    "",
    `- [About ${site.founder}](${u("/about")}): Experience, stack and how the studio works.`,
    `- [Pakistan](${u("/pakistan")}): Packages in PKR for Pakistani businesses.`,
    `- [Free website check](${u("/#check")}): Send a URL, get 3 practical fixes within 24 hours.`,
    "",
  ];
}

export function llmsTxt() {
  return [...header(), ...links()].join("\n");
}

export function llmsFullTxt() {
  const out = [...header(), ...links()];

  for (const s of servicePages) {
    out.push(`## ${s.h1}`, "", `URL: ${u(`/${s.slug}`)}`, "", s.answer, "");
    for (const b of s.blocks) {
      out.push(`### ${b.h}`, "");
      b.p?.forEach((t) => out.push(t, ""));
      b.list?.forEach((t) => out.push(`- ${t}`));
      b.steps?.forEach((t, i) => out.push(`${i + 1}. ${t}`));
      if (b.list || b.steps) out.push("");
    }
    s.faqs.forEach((f) => out.push(`### ${f.q}`, "", f.a, ""));
  }

  for (const g of fixGuides) {
    out.push(`## ${g.h1}`, "", `URL: ${u(`/fixes/${g.slug}`)}`, "", g.answer, "", `### ${g.causesTitle}`, "");
    g.causes.forEach((c) => out.push(`- ${c.title}: ${c.text}`));
    out.push("", "### How to fix it", "");
    g.steps.forEach((st, i) => out.push(`${i + 1}. ${st.name}: ${st.text}`));
    out.push("", "### When to hire help", "");
    g.whenToHire.forEach((t) => out.push(`- ${t}`));
    out.push("");
    g.faqs.forEach((f) => out.push(`### ${f.q}`, "", f.a, ""));
  }

  out.push("## General FAQ", "");
  faqs.forEach((f) => out.push(`### ${f.q}`, "", f.a, ""));
  return out.join("\n");
}

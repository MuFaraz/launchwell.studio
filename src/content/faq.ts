import { startingPrices as p } from "@/config/pricing";
import { usd } from "@/lib/format";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does a website cost?",
    a: `It depends on what you need, so here are the starting points: WordPress business website from ${usd(p.wordpressSite)}, WooCommerce store from ${usd(p.wooStore)}, Shopify store from ${usd(p.shopifyStore)}, fixes from ${usd(p.fix)}, custom web apps from ${usd(p.webApp)}, AI chatbots from ${usd(p.chatbot)}. Use the estimator above for a range, then send us the details. You get a fixed price within 24 hours.`,
  },
  {
    q: "How long will it take?",
    a: "A business website usually takes 1–2 weeks. An online store takes 2–3 weeks. Most fixes are done in 1–2 days. Web apps take 4–8 weeks, depending on size. Timelines start once we have your content and access. You get the timeline in writing with the quote, and if anything changes, you hear it from us first.",
  },
  {
    q: "How do I pay?",
    a: "Bank transfer, Payoneer or Wise. If you prefer, we can also work through Fiverr. Bigger projects are split into milestones, and you approve each milestone before its payment is released.",
  },
  {
    q: "How many revisions do I get?",
    a: "We agree on the scope in writing before we start. You get 2 rounds of revisions within that scope: wording, layout, colours, small changes. A brand-new feature or page is quoted separately, and we tell you before doing it, never after.",
  },
  {
    q: "What happens after launch?",
    a: `Bugs in our own work are fixed free for 30 days after launch. For ongoing updates, backups, security and small edits, there’s a WordPress care plan from ${usd(p.carePlanMonthly)}/month. Or just message us when you need something and pay per task.`,
  },
  {
    q: "Can I edit the website myself?",
    a: "Yes. WordPress and Shopify sites are set up so you can change text, photos, products and prices without touching code. You also get a short screen recording made for your own site that shows you how. Custom web apps come with an admin panel where it makes sense.",
  },
  {
    q: "You’re in Pakistan. How does that work with my time zone?",
    a: "Everything happens over email, WhatsApp or your project tool, so nobody needs to be online at the same time. We reply within 24 hours, usually much sooner. For UK and European clients there’s a good daytime overlap, and for the US we can do early-morning calls your time.",
  },
];

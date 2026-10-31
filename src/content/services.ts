import { startingPrices as p } from "@/config/pricing";
import { usd } from "@/lib/format";

export type Service = {
  id: string;
  title: string;
  intro: string;
  deliverables: string[];
  price: string;
  href?: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "wordpress",
    title: "WordPress & WooCommerce",
    intro:
      "Our strongest work. New builds, and fixing the ones that already exist: checkout errors, slow pages, plugin conflicts, hacked sites.",
    deliverables: [
      "Business websites on WordPress that you can edit yourself",
      "WooCommerce stores with Stripe or PayPal, shipping and tax set up properly",
      "Fixes, speed work, security clean-ups and a monthly care plan",
    ],
    price: `Site from ${usd(p.wordpressSite)} · Store from ${usd(p.wooStore)} · Fixes from ${usd(p.fix)} · Care from ${usd(p.carePlanMonthly)}/mo`,
    featured: true,
  },
  {
    id: "shopify",
    title: "Shopify stores",
    intro: "A store you can run without calling a developer every week.",
    deliverables: [
      "Store setup: products, collections, payments, shipping",
      "Theme customisation and custom sections that match your brand",
      "Apps and integrations: reviews, subscriptions, email marketing",
    ],
    price: `From ${usd(p.shopifyStore)}`,
  },
  {
    id: "webapps",
    title: "Custom web apps",
    intro: "When a plugin won’t do it. Built with Next.js, React, NestJS or Laravel.",
    deliverables: [
      "Dashboards, client portals and booking systems",
      "Stripe and PayPal payments, including subscriptions",
      "Clean code you own, with a handover doc",
    ],
    price: `From ${usd(p.webApp)}`,
  },
  {
    id: "chatbots",
    title: "AI chatbots for your site",
    intro: "A chatbot that answers from your own content, built on Claude or OpenAI.",
    deliverables: [
      "Answers questions from your pages, FAQs and documents",
      "Collects leads and sends them to your inbox",
      "Hands over to a human when it doesn’t know",
    ],
    price: `From ${usd(p.chatbot)}`,
  },
  {
    id: "agencies",
    title: "White-label for agencies",
    intro: "An extra developer for your agency. You keep the client, we build under your brand.",
    deliverables: [
      "WordPress, WooCommerce, Shopify and custom builds",
      "Works inside your Slack, Asana or Trello",
      "NDA on request, hourly or fixed price",
    ],
    price: `${usd(p.agencyHourly.min)}–${p.agencyHourly.max}/hour`,
    href: "/agencies",
  },
];

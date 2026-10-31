import { startingPrices as p } from "@/config/pricing";
import { usd } from "@/lib/format";

export type ServiceArt = "checkout" | "product" | "dashboard" | "chat" | "board";

export type Service = {
  id: string;
  title: string;
  intro: string;
  deliverables: string[];
  price: string;
  href: string;
  art: ServiceArt;
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
    href: "/woocommerce-developer",
    art: "checkout",
    featured: true,
  },
  {
    id: "shopify",
    title: "Shopify stores",
    intro: "A store you can run without calling a developer every week.",
    deliverables: [
      "Store setup: products, collections, payments, shipping",
      "Theme customisation and custom sections for your brand",
      "Apps and integrations: reviews, subscriptions, email",
    ],
    price: `From ${usd(p.shopifyStore)}`,
    href: "/shopify-store-setup",
    art: "product",
  },
  {
    id: "webapps",
    title: "Custom web apps",
    intro: "When a plugin won’t do it. Next.js, React, NestJS or Laravel.",
    deliverables: [
      "Dashboards, client portals and booking systems",
      "Stripe and PayPal payments, including subscriptions",
      "Clean code you own, with a handover doc",
    ],
    price: `From ${usd(p.webApp)}`,
    href: "/#estimate",
    art: "dashboard",
  },
  {
    id: "chatbots",
    title: "AI chatbots",
    intro: "Answers from your own content, built on Claude or OpenAI.",
    deliverables: [
      "Answers from your pages, FAQs and documents",
      "Collects leads and sends them to your inbox",
      "Hands over to a human when it doesn’t know",
    ],
    price: `From ${usd(p.chatbot)}`,
    href: "/ai-chatbot-for-website",
    art: "chat",
  },
  {
    id: "agencies",
    title: "White-label for agencies",
    intro: "An extra developer for your agency. You keep the client.",
    deliverables: [
      "WordPress, WooCommerce, Shopify and custom builds",
      "Works inside your Slack, Asana, Trello or Jira",
      "NDA on request, hourly or fixed price",
    ],
    price: `${usd(p.agencyHourly.min)}–${p.agencyHourly.max}/hour`,
    href: "/white-label-web-development",
    art: "board",
  },
];

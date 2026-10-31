import { launchOffer, startingPrices as p } from "@/config/pricing";
import { usd } from "@/lib/format";
import type { Faq } from "./faq";

// Service landing pages. Every page opens with a short, quotable answer
// (40–60 words), then question-led sections, an FAQ and related links.
// Prices always come from config/pricing.ts.

export type Block = {
  h: string; // a question, where it reads naturally
  p?: string[];
  list?: string[];
  steps?: string[];
};

export type ServicePage = {
  slug: string;
  metaTitle: string; // full <title>, ≤ 60 chars
  metaDescription: string; // ≤ 155 chars
  eyebrow: string;
  h1: string;
  answer: string;
  price: { from: number; unit?: "month" | "hour"; label: string };
  serviceType: string;
  includes: string[];
  blocks: Block[];
  faqs: Faq[];
  related: { label: string; href: string }[];
  whatsappText: string;
  og: { title: string; kicker: string };
};

const offerLine = launchOffer.enabled ? ` ${launchOffer.text}` : "";

export const servicePages: ServicePage[] = [
  {
    slug: "woocommerce-developer",
    metaTitle: "WooCommerce Developer for Hire · Launchwell Studio",
    metaDescription: `Hire a WooCommerce developer for new stores, checkout and payment fixes, speed and plugins. Fixed price first. Stores from ${usd(p.wooStore)}, fixes from ${usd(p.fix)}.`,
    eyebrow: "WooCommerce developer",
    h1: "A WooCommerce developer for new stores and the ones that need fixing",
    answer: `Launchwell Studio is a WooCommerce developer for small businesses worldwide. We build new WooCommerce stores from ${usd(p.wooStore)} and fix existing ones from ${usd(p.fix)}: checkout errors, failed payments, slow product pages and plugin conflicts. You get a fixed price before work starts, a reply within 24 hours and 30 days of free bug fixes after launch.`,
    price: { from: p.wooStore, label: `Stores from ${usd(p.wooStore)} · fixes from ${usd(p.fix)}` },
    serviceType: "WooCommerce development",
    includes: [
      "Store setup on your hosting and domain",
      "Products, categories and variations",
      "Stripe and/or PayPal, tested with real orders",
      "Shipping zones, tax and order emails",
      "Speed and security basics from day one",
      "A recorded walkthrough of your own store",
    ],
    blocks: [
      {
        h: "What does a WooCommerce developer actually do?",
        p: [
          "WooCommerce is free, but a store that sells reliably needs more than installing a plugin and a theme. A developer sets up the parts that cost you money when they go wrong: payments, shipping, tax, order emails and the checkout itself.",
          "We also handle the work that page builders can’t: custom product options, booking or subscription logic, integrations with your accounting or stock system, and fixing problems other plugins caused.",
        ],
        list: [
          "New stores built on WordPress and WooCommerce",
          "Checkout, cart and payment problems found and fixed",
          "Custom features and plugin work when an off-the-shelf plugin won’t do it",
          "Speed work for slow product and category pages",
          "Moving a store from Shopify, Wix or another platform",
        ],
      },
      {
        h: "When should you hire a developer instead of adding another plugin?",
        p: ["Plugins are great until they start fighting each other. It’s usually time to bring in a developer when:"],
        list: [
          "Customers report checkout errors you can’t reproduce",
          "Orders stay on “Pending payment” although people were charged",
          "Every update breaks something, so you’ve stopped updating",
          "Your product pages take more than 3–4 seconds to load on a phone",
          "You need a feature that three different plugins each half-solve",
        ],
      },
      {
        h: "How much does a WooCommerce developer cost?",
        p: [
          `A new WooCommerce store starts at ${usd(p.wooStore)}. The final price depends on how many products you have, which payment gateways you need and any extras like subscriptions or custom shipping rules. Fixes start at ${usd(p.fix)} and a monthly care plan with updates, backups and small edits is from ${usd(p.carePlanMonthly)}/month.${offerLine}`,
          "Use the estimator on our home page for a range in 30 seconds, then send it over. You get a fixed quote within 24 hours, and nothing starts until you say yes.",
        ],
      },
      {
        h: "How does a WooCommerce project with us work?",
        steps: [
          "You tell us what you sell and send any examples you like.",
          "Within 24 hours you get a fixed price, a timeline and exactly what’s included.",
          "We build on a private preview link, and you approve each milestone before paying for it.",
          "We test real orders on the live store, hand over, and fix any bugs in our work free for 30 days.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you fix my existing WooCommerce store instead of rebuilding it?",
        a: "Yes, and that’s usually the cheaper option. We look at the store first and tell you honestly whether it’s worth fixing. Most stores are.",
      },
      {
        q: "Which payment gateways do you set up?",
        a: "Stripe and PayPal most often, plus local gateways where they have a WooCommerce plugin. Every gateway is tested with a real payment and refund before launch.",
      },
      {
        q: "Will I be able to add products myself?",
        a: "Yes. You get a short screen recording made on your own store showing how to add products, change prices and manage orders.",
      },
      {
        q: "Do you work with stores outside the US and UK?",
        a: "Yes. We work with store owners worldwide, mostly over email and WhatsApp, so time zones aren’t a problem.",
      },
    ],
    related: [
      { label: "WordPress website fixes", href: "/wordpress-website-fixes" },
      { label: "Website speed optimization", href: "/website-speed-optimization" },
      { label: "Fix: checkout redirects to the homepage", href: "/fixes/woocommerce-checkout-redirects-to-homepage" },
      { label: "Fix: orders stuck on pending payment", href: "/fixes/woocommerce-orders-pending-payment" },
    ],
    whatsappText: "Hi Launchwell, I need a WooCommerce developer for my store.",
    og: { title: "A WooCommerce developer for new stores and fixes.", kicker: `Stores from ${usd(p.wooStore)} · fixes from ${usd(p.fix)}` },
  },
  {
    slug: "wordpress-website-fixes",
    metaTitle: "WordPress Website Fixes · Fixed Price · Launchwell",
    metaDescription: `Broken WordPress site? We fix critical errors, white screens, broken layouts, plugin conflicts and hacked sites. Fixed price agreed first, fixes from ${usd(p.fix)}.`,
    eyebrow: "WordPress website fixes",
    h1: "WordPress website fixes: errors, broken layouts and hacked sites",
    answer: `Launchwell Studio fixes broken WordPress websites: critical errors, white screens, layouts that broke after an update, plugin conflicts, hacked sites and forms that don’t send. Fixes start at ${usd(p.fix)}, with a fixed price agreed before we touch anything. We work on a copy first where we can, and explain what went wrong in plain English.`,
    price: { from: p.fix, label: `Fixes from ${usd(p.fix)}` },
    serviceType: "WordPress website repair",
    includes: [
      "A fixed price before any work",
      "Backup taken before we change anything",
      "Fix tested on staging where possible",
      "Plain-English note on what went wrong",
      "Free re-fix if the same bug returns within 30 days",
    ],
    blocks: [
      {
        h: "What WordPress problems can you fix?",
        list: [
          "“There has been a critical error on this website” and white screens",
          "Layouts or menus that broke after a theme, plugin or WordPress update",
          "Plugin conflicts and PHP version errors",
          "Hacked sites, spam redirects and malware clean-up",
          "Contact forms and order emails that don’t arrive",
          "Slow pages, broken images and mobile layout problems",
          "Login problems, lost admin access and broken permalinks",
        ],
      },
      {
        h: "How do you fix a WordPress site without breaking it more?",
        steps: [
          "Take a full backup of files and database before changing anything.",
          "Reproduce the problem and read the error logs instead of guessing.",
          "Fix it on a staging copy where the host allows one.",
          "Apply the fix to the live site and test the pages and forms that matter.",
          "Send you a short note: what broke, what we changed and how to avoid it next time.",
        ],
      },
      {
        h: "How much does it cost to fix a WordPress website?",
        p: [
          `Fixes start at ${usd(p.fix)} for a single, clear problem like one broken form or a layout bug. Bigger jobs such as malware clean-ups or several interacting plugin conflicts cost more, and you always get the price before we start. If a fix is quick enough to do yourself, we’ll tell you how.`,
        ],
      },
      {
        h: "How do I stop my WordPress site breaking again?",
        p: [
          `Most breakages come from updates applied straight to a live site with no backup. Our care plan, from ${usd(p.carePlanMonthly)}/month, covers tested updates, regular backups and small edits. You can also just message us when you need something and pay per task.`,
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you fix my site?",
        a: "Most single fixes are done within 1–2 business days. If the site is completely down, tell us and we’ll prioritise getting it back up.",
      },
      {
        q: "What access do you need?",
        a: "Usually a WordPress admin login and hosting or FTP access. We can use a temporary account, and you can remove it once the fix is done.",
      },
      {
        q: "What if you can’t fix it?",
        a: "Then you don’t pay for the fix. We agree the price and the expected result before starting, and we tell you early if something is outside what we can do.",
      },
      {
        q: "Do you fix sites built by other developers?",
        a: "Yes, that’s most of what we fix. We don’t judge the old code; we just make it work.",
      },
    ],
    related: [
      { label: "Fix: a WordPress update broke the site", href: "/fixes/wordpress-update-broke-site" },
      { label: "Fix: WooCommerce emails not sending", href: "/fixes/woocommerce-emails-not-sending" },
      { label: "Website speed optimization", href: "/website-speed-optimization" },
      { label: "WooCommerce developer", href: "/woocommerce-developer" },
    ],
    whatsappText: "Hi Launchwell, my WordPress site has a problem. Here's the link: ",
    og: { title: "WordPress website fixes, with a fixed price first.", kicker: `Errors · broken layouts · hacked sites · from ${usd(p.fix)}` },
  },
  {
    slug: "shopify-store-setup",
    metaTitle: "Shopify Store Setup & Theme Customisation",
    metaDescription: `Shopify store setup done properly: products, payments, shipping, theme customisation and apps. A store you can run yourself. From ${usd(p.shopifyStore)}, fixed price.`,
    eyebrow: "Shopify store setup",
    h1: "Shopify store setup, done properly the first time",
    answer: `Launchwell Studio sets up Shopify stores for small businesses: products and collections, payments, shipping, taxes, theme customisation, apps and your domain. Store setup starts at ${usd(p.shopifyStore)} with a fixed quote first. You get a store you can run yourself, plus a short walkthrough recording, so you’re not calling a developer for every small change.`,
    price: { from: p.shopifyStore, label: `From ${usd(p.shopifyStore)}` },
    serviceType: "Shopify store setup",
    includes: [
      "Theme set up and styled to your brand",
      "Products, collections and variants",
      "Payments, shipping rates and taxes",
      "Domain, email notifications and legal pages",
      "Essential apps installed and configured",
      "A walkthrough recording of your store",
    ],
    blocks: [
      {
        h: "What’s included in a Shopify store setup?",
        p: [
          "Everything you need to take real orders: a styled theme, your products, payment and shipping settings, notifications, policy pages and your domain. We test checkout end to end before you launch.",
        ],
      },
      {
        h: "Should I customise a theme or build custom sections?",
        p: [
          "For most stores, a well-chosen Shopify theme customised to your brand is the right call: it’s faster to launch and easier to update. Custom sections make sense when you need layouts the theme can’t do, like comparison tables, bundles or landing pages for ads.",
          "We’ll recommend the simpler option when it does the job, and quote custom work separately so you can decide.",
        ],
      },
      {
        h: "Which Shopify apps do you set up?",
        p: ["Only the ones you need. Every app adds monthly cost and page weight, so we keep the list short. Common ones:"],
        list: [
          "Product reviews",
          "Email marketing and abandoned cart flows",
          "Subscriptions and bundles",
          "Shipping and delivery date tools",
          "AI chat or FAQ widgets",
        ],
      },
      {
        h: "Can you move my store to Shopify?",
        p: [
          "Yes. We move products, customers and order history from WooCommerce, Wix or other platforms where the data allows it, and set up redirects so your old links and Google rankings carry over.",
        ],
      },
      {
        h: "How much does Shopify store setup cost?",
        p: [
          `Store setup starts at ${usd(p.shopifyStore)}. More products, custom sections or a migration add to that, and the estimator gives you a range in 30 seconds. Your Shopify plan and any paid apps are billed by Shopify directly, so you always own the store.${offerLine}`,
        ],
      },
    ],
    faqs: [
      {
        q: "Shopify or WooCommerce: which should I choose?",
        a: "Shopify is simpler to run and you pay a monthly plan. WooCommerce has no platform fee and more flexibility, but needs hosting and more care. If you’re not sure, tell us what you sell and we’ll recommend one honestly.",
      },
      {
        q: "Do I own the store?",
        a: "Yes. The store is in your Shopify account and paid by you. We work as a collaborator and you can remove our access any time.",
      },
      {
        q: "How long does setup take?",
        a: "A typical store takes 1–2 weeks once we have your products, photos and branding.",
      },
    ],
    related: [
      { label: "WooCommerce developer", href: "/woocommerce-developer" },
      { label: "AI chatbot for your website", href: "/ai-chatbot-for-website" },
      { label: "Website speed optimization", href: "/website-speed-optimization" },
    ],
    whatsappText: "Hi Launchwell, I'd like help setting up a Shopify store.",
    og: { title: "Shopify store setup, done properly the first time.", kicker: `Setup · theme · apps · from ${usd(p.shopifyStore)}` },
  },
  {
    slug: "website-speed-optimization",
    metaTitle: "Website Speed Optimization for WordPress & Shopify",
    metaDescription: "Slow website? We measure first, then fix images, heavy themes, plugin scripts and caching on WordPress, WooCommerce and Shopify. Real before/after numbers.",
    eyebrow: "Website speed optimization",
    h1: "Website speed optimization you can measure",
    answer: `Launchwell Studio speeds up slow WordPress, WooCommerce and Shopify sites. We measure first with Lighthouse and real mobile tests, then fix the biggest causes: oversized images, heavy themes and plugins, scripts loading on every page, and missing caching. Speed work starts at ${usd(p.fix)}, and you get before-and-after numbers for every page we touch.`,
    price: { from: p.fix, label: `From ${usd(p.fix)}` },
    serviceType: "Website performance optimization",
    includes: [
      "Baseline report before any change",
      "Image compression and modern formats",
      "Unused CSS/JS removed or deferred",
      "Caching set up with checkout excluded",
      "Core Web Vitals checked on mobile",
      "Before/after report for each page",
    ],
    blocks: [
      {
        h: "Why is my website slow?",
        p: ["On most small business sites, the cause is one or more of these:"],
        list: [
          "Images uploaded straight from a camera or design tool, several MB each",
          "A page builder or theme loading every feature on every page",
          "Plugins adding scripts and styles site-wide, even where they’re not used",
          "No page caching, or caching that breaks the cart and checkout",
          "Slow or overloaded hosting and an out-of-date PHP version",
          "A database full of revisions, expired data and leftover plugin tables",
        ],
      },
      {
        h: "What is a good page speed score?",
        p: [
          "Google’s Core Web Vitals are the numbers that matter: Largest Contentful Paint (LCP) under 2.5 seconds, Interaction to Next Paint (INP) under 200 milliseconds, and Cumulative Layout Shift (CLS) under 0.1. A PageSpeed score of 90+ on mobile is a good target, but real-world load time on a phone matters more than the score itself.",
        ],
      },
      {
        h: "How do you speed up a website?",
        steps: [
          "Measure the key pages on mobile and record the numbers.",
          "Fix the biggest cause first: usually images, then scripts.",
          "Load plugin scripts only on the pages that need them.",
          "Set up page and browser caching, keeping cart, checkout and account pages uncached.",
          "Clean the database and check hosting and PHP version.",
          "Measure again and send you the before/after report.",
        ],
      },
      {
        h: "Will speed work break my site?",
        p: [
          "It can if it’s done with aggressive “one-click” settings. That’s why we test on staging where possible, change one thing at a time, and check forms, checkout and logged-in pages after each step.",
        ],
      },
      {
        h: "How much does website speed optimization cost?",
        p: [
          `Small speed fixes start at ${usd(p.fix)}. A full speed job on a WooCommerce store costs more, depending on the theme and plugins involved. The estimator on the home page gives you a range (choose “Fix or speed up my site”), and you get a fixed price before we start.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Will installing a speed plugin fix it?",
        a: "Sometimes partly. Speed plugins help with caching and minifying, but they can’t fix huge images or a heavy theme, and the wrong settings often break checkout.",
      },
      {
        q: "Do I need new hosting?",
        a: "Not always. We check the hosting during the baseline and only recommend moving if it’s genuinely the bottleneck.",
      },
      {
        q: "Do you work on Shopify speed too?",
        a: "Yes: image sizing, app scripts, theme code and third-party embeds are the usual culprits on Shopify.",
      },
    ],
    related: [
      { label: "Fix: slow WooCommerce product pages", href: "/fixes/woocommerce-slow-product-pages" },
      { label: "WordPress website fixes", href: "/wordpress-website-fixes" },
      { label: "WooCommerce developer", href: "/woocommerce-developer" },
    ],
    whatsappText: "Hi Launchwell, my website is slow. Can you take a look? Link: ",
    og: { title: "Website speed optimization you can measure.", kicker: "WordPress · WooCommerce · Shopify · before/after numbers" },
  },
  {
    slug: "ai-chatbot-for-website",
    metaTitle: "AI Chatbot for Your Website · Claude or OpenAI",
    metaDescription: `An AI chatbot that answers from your own pages and documents, captures leads and hands over to a human. Built on Claude or OpenAI, from ${usd(p.chatbot)}.`,
    eyebrow: "AI chatbot for your website",
    h1: "An AI chatbot for your website that answers from your own content",
    answer: `Launchwell Studio builds AI chatbots for business websites using Claude or OpenAI. The chatbot answers customer questions from your own pages, FAQs and documents, collects leads, and hands over to a human when it isn’t sure. Chatbots start at ${usd(p.chatbot)} with a fixed quote, and AI usage is billed to your own account.`,
    price: { from: p.chatbot, label: `From ${usd(p.chatbot)}` },
    serviceType: "AI chatbot development",
    includes: [
      "Chat widget styled to your brand",
      "Trained on your pages, FAQs and documents",
      "Lead capture to email or your CRM",
      "Human handover when it isn’t sure",
      "Works on WordPress, Shopify or custom sites",
      "Conversation log so you can improve answers",
    ],
    blocks: [
      {
        h: "What can an AI chatbot do for a small business?",
        list: [
          "Answer common questions about prices, delivery, opening hours and services, any time of day",
          "Help visitors find the right product or service page",
          "Collect name, email and what they need, and send it to your inbox",
          "Book or route enquiries to the right person",
          "Answer in the visitor’s language",
        ],
      },
      {
        h: "How do you stop the chatbot making things up?",
        p: [
          "The chatbot is instructed to answer only from the content you give it: your pages, FAQs and documents. If the answer isn’t there, it says so and offers to pass the question to you instead of guessing. We test it with real questions from your customers before launch, and you can read the conversation log to improve answers over time.",
        ],
      },
      {
        h: "What does it cost to run?",
        p: [
          `The build starts at ${usd(p.chatbot)}. Running costs are the AI usage itself, billed by Anthropic (Claude) or OpenAI to your own account, so you see exactly what you pay and there’s no markup. For a typical small business site, usage is modest; we set a monthly spending limit so there are no surprises.`,
        ],
      },
      {
        h: "Which websites can it work on?",
        p: [
          "WordPress, WooCommerce, Shopify and custom sites like Next.js or Laravel. It can also connect to WhatsApp, or to live data like stock levels and booking slots, for an extra cost.",
        ],
      },
      {
        h: "How is it built?",
        steps: [
          "We collect the content it should answer from and agree the tone.",
          "We build the chatbot, the widget and lead capture.",
          "We test it with real customer questions and tune the answers.",
          "We launch it on your site and check the first conversations with you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Claude or OpenAI: which is better for a website chatbot?",
        a: "Both work well. We pick based on your content, languages and budget, and can switch later because the chatbot is built to be model-agnostic.",
      },
      {
        q: "Is customer data safe?",
        a: "Conversations go to the AI provider to generate answers, under their API data policies. We don’t store more than needed, and we don’t put sensitive data like passwords or card numbers into the chatbot.",
      },
      {
        q: "Can I update what it knows?",
        a: "Yes. When you change your pages or FAQs, the chatbot’s knowledge can be refreshed, and we show you how.",
      },
    ],
    related: [
      { label: "WooCommerce developer", href: "/woocommerce-developer" },
      { label: "Shopify store setup", href: "/shopify-store-setup" },
      { label: "Website speed optimization", href: "/website-speed-optimization" },
    ],
    whatsappText: "Hi Launchwell, I'd like an AI chatbot for my website.",
    og: { title: "An AI chatbot that answers from your own content.", kicker: `Claude or OpenAI · from ${usd(p.chatbot)}` },
  },
];

export function getServicePage(slug: string) {
  const page = servicePages.find((s) => s.slug === slug);
  if (!page) throw new Error(`Unknown service page: ${slug}`);
  return page;
}

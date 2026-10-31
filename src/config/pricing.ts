// ─────────────────────────────────────────────────────────────
// All prices on the site live in this file.
//
// - `startingPrices` is what the service cards, FAQ and agency
//   page show ("from $X").
// - `launchOffer` is the "20% off" line near the hero and on the
//   estimator. Set `enabled: false` to remove it everywhere.
// - `pkrPackages` is the Pakistan page.
// - `estimator` drives the project estimator on the home page.
//   Each answer adds [min, max] USD and [min, max] days to the
//   service's base range. Change numbers, rename labels, add or
//   remove options. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const startingPrices = {
  wordpressSite: 250,
  wooStore: 450,
  shopifyStore: 400,
  fix: 25,
  carePlanMonthly: 29,
  webApp: 900,
  chatbot: 200,
  agencyHourly: { min: 18, max: 25 },
} as const;

export const launchOffer = {
  enabled: true,
  text: "Launch offer: 20% off for our first 5 clients.",
} as const;

export const pkrPackages = [
  {
    name: "Business website",
    price: 30000,
    time: "7 days",
    includes: [
      "Up to 5 pages",
      "WhatsApp button and Google Maps",
      "Mobile-friendly, fast, with basic SEO",
    ],
  },
  {
    name: "Online store",
    price: 70000,
    time: "10–14 days",
    includes: [
      "Shopify or WooCommerce",
      "Cash on delivery set up",
      "Up to 50 products added for you",
    ],
  },
  {
    name: "Website + AI chatbot",
    price: 120000,
    time: "14–21 days",
    includes: [
      "Full business website",
      "AI chatbot that answers from your own info",
      "Leads sent to your WhatsApp or email",
    ],
  },
] as const;

// ── Estimator ────────────────────────────────────────────────

export type Range = readonly [number, number];

export type EstimatorOption = {
  id: string;
  label: string;
  hint?: string;
  price?: Range; // added to the base price (USD)
  days?: Range; // added to the base timeline (working days)
  monthly?: number; // shown as an extra "+ $X/month" line
};

export type EstimatorQuestion = {
  id: string;
  label: string;
  type: "single" | "multi";
  options: readonly EstimatorOption[];
};

export type EstimatorService = {
  id: string;
  label: string;
  short: string;
  base: { price: Range; days: Range };
  questions: readonly EstimatorQuestion[];
  note?: string;
};

export const urgencyOptions = [
  { id: "standard", label: "Standard", hint: "Normal timeline", priceFactor: 1, daysFactor: 1 },
  { id: "faster", label: "Sooner", hint: "+20%, about 30% faster", priceFactor: 1.2, daysFactor: 0.7 },
  { id: "urgent", label: "Urgent", hint: "+40%, about half the time", priceFactor: 1.4, daysFactor: 0.5 },
] as const;

const care = startingPrices.carePlanMonthly;

// Every base range starts at the matching "from" price above.
export const estimatorServices: readonly EstimatorService[] = [
  {
    id: "business",
    label: "Business website",
    short: "WordPress site you can edit yourself",
    base: { price: [startingPrices.wordpressSite, 400], days: [5, 8] },
    questions: [
      {
        id: "pages",
        label: "How many pages?",
        type: "single",
        options: [
          { id: "p5", label: "1–5 pages" },
          { id: "p10", label: "6–10 pages", price: [150, 250], days: [3, 4] },
          { id: "p20", label: "11–20 pages", price: [350, 550], days: [6, 8] },
        ],
      },
      {
        id: "content",
        label: "Text and photos",
        type: "single",
        options: [
          { id: "ready", label: "I have them ready" },
          { id: "help", label: "I need help writing the copy", price: [100, 200], days: [2, 3] },
        ],
      },
      {
        id: "extras",
        label: "Anything extra?",
        type: "multi",
        options: [
          { id: "blog", label: "Blog", price: [60, 100], days: [1, 1] },
          { id: "booking", label: "Online booking", price: [120, 220], days: [2, 3] },
          { id: "multilang", label: "Two languages", price: [120, 250], days: [2, 4] },
          { id: "care", label: "Monthly care plan", hint: "updates, backups, small edits", monthly: care },
        ],
      },
    ],
  },
  {
    id: "woocommerce",
    label: "WooCommerce store",
    short: "Online store on WordPress",
    base: { price: [startingPrices.wooStore, 650], days: [10, 14] },
    questions: [
      {
        id: "products",
        label: "How many products?",
        type: "single",
        options: [
          { id: "s", label: "Up to 50" },
          { id: "m", label: "50–200", price: [120, 250], days: [2, 3] },
          { id: "l", label: "200+ (CSV import)", price: [250, 450], days: [3, 5] },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        type: "single",
        options: [
          { id: "one", label: "Stripe or PayPal" },
          { id: "more", label: "Several gateways", hint: "e.g. Stripe + PayPal + local", price: [100, 200], days: [1, 2] },
        ],
      },
      {
        id: "extras",
        label: "Anything extra?",
        type: "multi",
        options: [
          { id: "subs", label: "Subscriptions", price: [180, 300], days: [3, 4] },
          { id: "shipping", label: "Custom shipping rules", price: [60, 150], days: [1, 2] },
          { id: "migrate", label: "Move from another platform", price: [180, 350], days: [3, 5] },
          { id: "care", label: "Monthly care plan", hint: "updates, backups, small edits", monthly: care },
        ],
      },
    ],
  },
  {
    id: "shopify",
    label: "Shopify store",
    short: "Setup, theme and apps",
    base: { price: [startingPrices.shopifyStore, 600], days: [7, 12] },
    questions: [
      {
        id: "products",
        label: "How many products?",
        type: "single",
        options: [
          { id: "s", label: "Up to 50" },
          { id: "m", label: "50–200", price: [100, 200], days: [2, 3] },
          { id: "l", label: "200+ (CSV import)", price: [200, 300], days: [3, 4] },
        ],
      },
      {
        id: "theme",
        label: "Design",
        type: "single",
        options: [
          { id: "ready", label: "Customise a ready theme" },
          { id: "custom", label: "Custom sections for my brand", price: [250, 500], days: [4, 6] },
        ],
      },
      {
        id: "extras",
        label: "Anything extra?",
        type: "multi",
        options: [
          { id: "apps", label: "App setup and integrations", price: [60, 180], days: [1, 2] },
          { id: "migrate", label: "Move from another platform", price: [180, 350], days: [3, 5] },
        ],
      },
    ],
  },
  {
    id: "fix",
    label: "Fix or speed up my site",
    short: "Bugs, errors, slow pages",
    base: { price: [startingPrices.fix, 80], days: [1, 2] },
    questions: [
      {
        id: "problem",
        label: "Main problem",
        type: "single",
        options: [
          { id: "bug", label: "One specific bug or error" },
          { id: "checkout", label: "Checkout or payments broken", price: [50, 120], days: [0, 1] },
          { id: "speed", label: "Slow pages", price: [60, 150], days: [1, 2] },
          { id: "hacked", label: "Hacked or malware", price: [90, 180], days: [1, 2] },
        ],
      },
      {
        id: "platform",
        label: "Built with",
        type: "single",
        options: [
          { id: "wp", label: "WordPress / WooCommerce" },
          { id: "shopify", label: "Shopify" },
          { id: "custom", label: "Custom (Laravel, React…)", price: [30, 90], days: [0, 1] },
        ],
      },
      {
        id: "extras",
        label: "After the fix",
        type: "multi",
        options: [{ id: "care", label: "Monthly care plan", hint: "so it stays fixed", monthly: care }],
      },
    ],
  },
  {
    id: "webapp",
    label: "Web app",
    short: "Dashboard, portal, booking system",
    base: { price: [startingPrices.webApp, 1500], days: [20, 30] },
    questions: [
      {
        id: "size",
        label: "Size",
        type: "single",
        options: [
          { id: "s", label: "Small", hint: "3–5 screens, one user type" },
          { id: "m", label: "Medium", hint: "6–12 screens, admin + users", price: [900, 1500], days: [10, 15] },
          { id: "l", label: "Large", hint: "many roles, complex logic", price: [2100, 3600], days: [25, 40] },
        ],
      },
      {
        id: "payments",
        label: "Take payments?",
        type: "single",
        options: [
          { id: "no", label: "No" },
          { id: "yes", label: "Yes, Stripe or PayPal", price: [180, 360], days: [3, 5] },
        ],
      },
      {
        id: "extras",
        label: "Anything extra?",
        type: "multi",
        options: [
          { id: "reports", label: "Admin reports", price: [250, 500], days: [3, 5] },
          { id: "notify", label: "Email / SMS notifications", price: [90, 180], days: [1, 2] },
          { id: "ai", label: "AI feature (Claude / OpenAI)", price: [250, 550], days: [3, 6] },
        ],
      },
    ],
    note: "Bigger apps get a short call first, then a fixed quote per milestone.",
  },
  {
    id: "chatbot",
    label: "AI chatbot",
    short: "Answers questions on your site",
    base: { price: [startingPrices.chatbot, 350], days: [5, 8] },
    questions: [
      {
        id: "knowledge",
        label: "It should answer from…",
        type: "single",
        options: [
          { id: "site", label: "My website pages" },
          { id: "docs", label: "My pages + PDFs / docs", price: [60, 150], days: [1, 2] },
          { id: "data", label: "Live store or booking data", price: [250, 500], days: [4, 6] },
        ],
      },
      {
        id: "channel",
        label: "Where",
        type: "single",
        options: [
          { id: "web", label: "Website widget" },
          { id: "wa", label: "Website + WhatsApp", price: [180, 360], days: [3, 5] },
        ],
      },
      {
        id: "extras",
        label: "Anything extra?",
        type: "multi",
        options: [
          { id: "leads", label: "Send leads to email / CRM", price: [60, 120], days: [1, 1] },
          { id: "handover", label: "Hand over to a human", price: [90, 180], days: [1, 2] },
        ],
      },
    ],
    note: "AI usage (Claude / OpenAI) is billed to your own API account, so you see exactly what it costs.",
  },
];

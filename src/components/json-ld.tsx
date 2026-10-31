import { startingPrices as p } from "@/config/pricing";
import { site } from "@/config/site";

// No AggregateRating/Review markup on purpose: self-serving reviews aren't eligible.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ORG_ID = `${site.url}/#business`;
const PERSON_ID = `${site.url}/#founder`;
const WEBSITE_ID = `${site.url}/#website`;

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path === "/" ? "" : path}`);

const offer = (name: string, price: number, unit?: string) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name },
  priceSpecification: {
    "@type": "PriceSpecification",
    price,
    priceCurrency: "USD",
    ...(unit ? { unitText: unit } : {}),
  },
});

// Site-wide: the studio, the founder and the website, linked by @id.
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: site.name,
        url: site.url,
        logo: `${site.url}/launchwell-logo.svg`,
        image: `${site.url}/opengraph-image`,
        description: site.description,
        email: site.email,
        telephone: `+${site.whatsappNumber}`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: site.countryCode,
        },
        areaServed: [
          { "@type": "Place", name: "Worldwide" },
          { "@type": "Country", name: "Pakistan" },
        ],
        founder: { "@id": PERSON_ID },
        sameAs: [site.instagram, site.facebook, site.fiverr].filter(Boolean),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web development services",
          itemListElement: [
            offer("WordPress business website", p.wordpressSite),
            offer("WooCommerce store", p.wooStore),
            offer("Shopify store", p.shopifyStore),
            offer("WordPress / WooCommerce fix or speed-up", p.fix),
            offer("WordPress care plan", p.carePlanMonthly, "month"),
            offer("Custom web app", p.webApp),
            offer("AI chatbot for websites", p.chatbot),
            offer("White-label web development (hourly)", p.agencyHourly.min, "hour"),
          ],
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.founder,
        jobTitle: site.founderTitle,
        url: `${site.url}/about`,
        worksFor: { "@id": ORG_ID },
        homeLocation: { "@type": "Place", name: `${site.city}, ${site.country}` },
        knowsAbout: [
          "WordPress",
          "WooCommerce",
          "Shopify",
          "Next.js",
          "React",
          "NestJS",
          "Laravel",
          "Stripe",
          "PayPal",
          "Website performance",
          "AI chatbots",
        ],
        sameAs: [site.fiverr, site.github, site.instagram, site.facebook].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function serviceJsonLd(s: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  price: number;
  unit?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: abs(s.path),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "Country", name: "Pakistan" },
    ],
    offers: {
      "@type": "Offer",
      url: abs(s.path),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.price,
        priceCurrency: "USD",
        ...(s.unit ? { unitText: s.unit } : {}),
      },
    },
  };
}

export function howToJsonLd(h: { name: string; description: string; path: string; steps: { name: string; text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: h.name,
    description: h.description,
    url: abs(h.path),
    step: h.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

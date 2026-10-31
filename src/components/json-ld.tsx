import { startingPrices as p } from "@/config/pricing";
import { site } from "@/config/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function businessJsonLd() {
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

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/launchwell-logo.svg`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    email: site.email,
    telephone: `+${site.whatsappNumber}`,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    areaServed: ["US", "GB", "CA", "AU", "AE", "PK"].map((c) => ({ "@type": "Country", name: c })),
    founder: { "@type": "Person", name: site.founder, jobTitle: "Full-stack developer" },
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
      ],
    },
  };
}

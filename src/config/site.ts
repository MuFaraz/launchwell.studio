// Contact details, links and the few real numbers we show on the site.
// Edit here; every page reads from this file.

export const site = {
  name: "Launchwell Studio",
  shortName: "Launchwell",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://launchwell.vercel.app").replace(/\/$/, ""),
  description:
    "WordPress, WooCommerce and Shopify websites built and fixed properly, plus custom web apps and AI chatbots. Fixed price before we start. Replies within 24 hours.",

  founder: "Muhammad Faraz",
  // Put a square photo in /public (e.g. /faraz.jpg) and set the path here.
  // Leave as null to show the initials tile instead.
  founderPhoto: null as string | null,

  city: "Karachi",
  countryCode: "PK",

  email: "studiolaunchwell@gmail.com",
  whatsappNumber: "923128542140", // digits only, with country code
  whatsappDisplay: "+92 312 854 2140",

  instagram: "https://www.instagram.com/launchwell.studio/",
  instagramHandle: "@launchwell.studio",
  // Add the Facebook page URL when it is live. Empty = hidden everywhere.
  facebook: "https://www.facebook.com/profile.php?id=61595915557381",
  fiverr: "https://www.fiverr.com/muhammadfaraz99",

  // Real numbers only.
  stats: {
    years: "6+",
    liveProjects: "20+",
    fiverrRating: "5.0",
    fiverrReviews: 7,
  },
  clientCountries: "the UK, US, Canada, Kenya & Italy",
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${query ? `?${query}` : ""}`;
}

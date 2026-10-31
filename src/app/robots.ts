import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Search engines and AI answer engines are explicitly welcome; only the form API is off-limits.
const bots = ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...bots.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

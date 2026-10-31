import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { fixGuides } from "@/content/fix-guides";
import { servicePages } from "@/content/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...servicePages.map((s) => ({ url: url(`/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: url("/white-label-web-development"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/fixes"), changeFrequency: "monthly", priority: 0.7 },
    ...fixGuides.map((g) => ({ url: url(`/fixes/${g.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/pakistan"), changeFrequency: "monthly", priority: 0.6 },
  ];
}

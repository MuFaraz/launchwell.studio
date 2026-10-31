import { fixGuides, getFixGuide } from "@/content/fix-guides";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Launchwell Studio fix guide";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return fixGuides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getFixGuide(slug);
  return renderOg({ title: guide?.og ?? "WooCommerce fix guide", kicker: "Fix guide · Launchwell Studio" });
}

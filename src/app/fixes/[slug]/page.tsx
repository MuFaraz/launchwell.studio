import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FixGuideView } from "@/components/fix-guide-view";
import { fixGuides, getFixGuide } from "@/content/fix-guides";

export function generateStaticParams() {
  return fixGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/fixes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getFixGuide(slug);
  if (!guide) return {};
  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: `/fixes/${slug}` },
    openGraph: { url: `/fixes/${slug}`, title: guide.metaTitle, description: guide.metaDescription, type: "article" },
  };
}

export default async function Page({ params }: PageProps<"/fixes/[slug]">) {
  const { slug } = await params;
  const guide = getFixGuide(slug);
  if (!guide) notFound();
  return <FixGuideView guide={guide} />;
}

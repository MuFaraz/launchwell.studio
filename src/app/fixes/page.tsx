import type { Metadata } from "next";
import Link from "next/link";
import { CheckSection } from "@/components/check-section";
import { IconArrow } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { fixGuides, fixPrice } from "@/content/fix-guides";

export const metadata: Metadata = {
  title: { absolute: "WooCommerce & WordPress Fix Guides · Launchwell" },
  description:
    "Plain-English guides to common WooCommerce and WordPress problems: checkout redirects, pending payments, slow pages, broken updates and missing emails.",
  alternates: { canonical: "/fixes" },
  openGraph: { url: "/fixes" },
};

export default function FixesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Fix guides", path: "/fixes" }]}
        eyebrow="Fix guides"
        title="WooCommerce and WordPress problems, explained and fixed"
        answer={`Each guide starts with a short answer, then the usual causes and a step-by-step fix you can try yourself. If you'd rather not, we fix it for you: ${fixPrice.toLowerCase()}, fixed price first.`}
      />
      <div className="container-x py-16 md:py-20">
        <ul className="grid gap-4 md:grid-cols-2">
          {fixGuides.map((g) => (
            <li key={g.slug} data-reveal>
              <Link href={`/fixes/${g.slug}`} className="card card-lift group flex h-full flex-col p-6">
                <h2 className="t-h3">{g.h1}</h2>
                <p className="mt-3 line-clamp-3 text-[0.975rem] leading-relaxed text-muted">{g.answer}</p>
                <span className="link mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold">
                  Read the guide <IconArrow className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CheckSection />
    </>
  );
}

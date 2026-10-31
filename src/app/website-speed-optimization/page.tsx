import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page-view";
import { getServicePage } from "@/content/service-pages";

const page = getServicePage("website-speed-optimization");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/website-speed-optimization" },
  openGraph: { url: "/website-speed-optimization", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <ServicePageView page={page} />;
}

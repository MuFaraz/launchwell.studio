import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page-view";
import { getServicePage } from "@/content/service-pages";

const page = getServicePage("wordpress-website-fixes");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/wordpress-website-fixes" },
  openGraph: { url: "/wordpress-website-fixes", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <ServicePageView page={page} />;
}

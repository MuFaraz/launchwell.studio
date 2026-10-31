import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page-view";
import { getServicePage } from "@/content/service-pages";

const page = getServicePage("shopify-store-setup");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/shopify-store-setup" },
  openGraph: { url: "/shopify-store-setup", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <ServicePageView page={page} />;
}

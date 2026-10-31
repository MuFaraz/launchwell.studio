import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page-view";
import { getServicePage } from "@/content/service-pages";

const page = getServicePage("woocommerce-developer");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/woocommerce-developer" },
  openGraph: { url: "/woocommerce-developer", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <ServicePageView page={page} />;
}

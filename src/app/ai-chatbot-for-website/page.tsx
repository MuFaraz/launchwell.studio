import type { Metadata } from "next";
import { ServicePageView } from "@/components/service-page-view";
import { getServicePage } from "@/content/service-pages";

const page = getServicePage("ai-chatbot-for-website");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/ai-chatbot-for-website" },
  openGraph: { url: "/ai-chatbot-for-website", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <ServicePageView page={page} />;
}

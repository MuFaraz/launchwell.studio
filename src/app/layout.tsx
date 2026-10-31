import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd, siteGraph } from "@/components/json-ld";
import { RevealObserver } from "@/components/reveal-observer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { site } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Launchwell Studio: WordPress, WooCommerce & Shopify websites that work properly",
    template: "%s · Launchwell Studio",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={siteGraph()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}

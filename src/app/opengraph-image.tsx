import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Launchwell Studio: websites & stores that actually work";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Websites & stores that actually work.",
    kicker: "WordPress · WooCommerce · Shopify · Web apps",
  });
}

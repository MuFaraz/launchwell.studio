import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Launchwell Studio: websites and online stores that work properly";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Websites and online stores that work properly.",
    kicker: "WordPress · WooCommerce · Shopify · Web apps",
  });
}

import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "WooCommerce and WordPress fix guides by Launchwell Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "WooCommerce and WordPress problems, explained and fixed.",
    kicker: "Fix guides · Launchwell Studio",
  });
}

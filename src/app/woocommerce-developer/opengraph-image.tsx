import { getServicePage } from "@/content/service-pages";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

const page = getServicePage("woocommerce-developer");

export const alt = page.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg(page.og);
}

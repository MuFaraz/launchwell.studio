import { getServicePage } from "@/content/service-pages";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

const page = getServicePage("website-speed-optimization");

export const alt = page.metaTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg(page.og);
}

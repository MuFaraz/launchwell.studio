import { startingPrices as p } from "@/config/pricing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Launchwell Studio: white-label web development for agencies";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "An extra developer for your agency. You keep the client.",
    kicker: `White-label · $${p.agencyHourly.min}–${p.agencyHourly.max}/hour or fixed price`,
  });
}

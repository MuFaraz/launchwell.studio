import { site } from "@/config/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `About ${site.founder}, founder of Launchwell Studio`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: `${site.founder}, full-stack developer and founder.`,
    kicker: `${site.stats.years} years · ${site.stats.liveProjects} live projects · ${site.city}, worldwide`,
  });
}

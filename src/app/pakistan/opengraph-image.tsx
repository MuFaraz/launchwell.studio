import { pkrPackages } from "@/config/pricing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { pkr } from "@/lib/format";

export const alt = "Launchwell Studio: websites and online stores in Pakistan";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    title: "Apna business online laayen. Sahi tareeqay se.",
    kicker: `Business website from ${pkr(pkrPackages[0].price)} · WhatsApp par baat karein`,
  });
}

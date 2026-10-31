import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/config/site";

// Optional images are picked up at build time if the file exists in /public.
// Nothing breaks while they're missing; the CSS fallbacks are shown instead.

function firstExisting(candidates: string[]) {
  return candidates.find((p) => existsSync(join(process.cwd(), "public", p))) ?? null;
}

export const founderPhoto = firstExisting([site.founderPhotoPath, "/founder.webp", "/founder.png"]);

// Concept screenshots for the hero browser mockup: /public/concepts/concept-1.jpg … concept-3.jpg
export function conceptShot(n: 1 | 2 | 3) {
  return firstExisting(["webp", "jpg", "png", "avif"].map((ext) => `/concepts/concept-${n}.${ext}`));
}

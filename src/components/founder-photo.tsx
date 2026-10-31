import Image from "next/image";
import { site } from "@/config/site";
import { founderPhoto } from "@/lib/public-assets";

// /public/founder.jpg if it exists, otherwise the "MF" initials tile.
export function FounderPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-2xl border border-line ${className}`}>
      {founderPhoto ? (
        <Image
          src={founderPhoto}
          alt={`${site.founder}, founder of Launchwell Studio`}
          fill
          sizes="(min-width: 768px) 320px, 60vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-end justify-between bg-[radial-gradient(circle_at_80%_10%,rgba(124,92,255,0.45),transparent_60%),radial-gradient(circle_at_10%_100%,rgba(255,122,61,0.3),transparent_55%)] bg-surface-strong p-5 text-fg" role="img" aria-label={`${site.founder} (initials)`}>
          <span className="text-5xl font-semibold tracking-tight">MF</span>
          <span className="mb-2 h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

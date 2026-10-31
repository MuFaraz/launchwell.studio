import Image from "next/image";
import Link from "next/link";

// Navy wordmark on light backgrounds, white wordmark on navy sections.
export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "white"; className?: string }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="Launchwell Studio, home">
      <Image
        src={variant === "white" ? "/launchwell-logo-white.svg" : "/launchwell-logo.svg"}
        alt=""
        width={150}
        height={35}
        priority={variant === "dark"}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

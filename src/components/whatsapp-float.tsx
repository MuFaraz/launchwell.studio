"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/config/site";
import { trackLead } from "@/lib/track";
import { WhatsAppIcon } from "./whatsapp-icon";

const messages: Record<string, string> = {
  "/white-label-web-development": "Hi Launchwell, I'm from an agency and need an extra developer.",
  "/pakistan": "Hi Launchwell, mujhe apne business ki website chahiye.",
};
const defaultMessage = "Hi Launchwell, I'd like a quote for my website.";

const EDGE = 16; // distance from the bottom of the screen, px
const GAP = 12; // space kept above the estimator's sticky price bar, px

// Floating WhatsApp button. Fades in after 2s and moves up while the
// estimator's sticky price bar (mobile) would sit underneath it.
export function WhatsAppFloat() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const [lift, setLift] = useState(0);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = document.querySelector<HTMLElement>("[data-estimate-bar]");
      const btn = ref.current;
      if (!bar || !btn) return setLift(0);
      const r = bar.getBoundingClientRect();
      const vh = window.innerHeight;
      const btnTop = vh - EDGE - btn.offsetHeight;
      // Bar hidden (desktop) or not overlapping the button's resting spot: stay put.
      const overlaps = r.width > 0 && r.top < vh - EDGE && r.bottom > btnTop;
      setLift(overlaps ? Math.max(0, vh - r.top + GAP - EDGE) : 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const href = whatsappUrl(messages[pathname] ?? defaultMessage);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Launchwell on WhatsApp"
      onClick={() => trackLead("whatsapp", { link_url: href, placement: "floating_button" })}
      // `bottom` (the lift) changes instantly so the button never slides over the
      // price bar; only the entrance (opacity/transform) is animated.
      style={{ bottom: EDGE + lift, transform: shown ? "none" : "translateY(12px)" }}
      className={`fixed right-4 z-30 inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-0 font-bold md:px-5 text-[#0B1020] shadow-[0_6px_20px_-6px_rgba(11,16,32,0.45)] transition-[opacity,transform,visibility,background-color] duration-300 ease-out hover:bg-[#1fbe5b] focus-visible:shadow-[0_0_0_2px_#fff,0_6px_20px_-6px_rgba(11,16,32,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f5fd1] sm:right-6 ${
        shown ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <WhatsAppIcon size={26} />
      <span className="hidden pr-1 md:inline">Chat on WhatsApp</span>
    </a>
  );
}

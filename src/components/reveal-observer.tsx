"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ESTIMATE_EVENT } from "@/lib/events";

// Fades in elements marked with data-reveal as they scroll into view.
// Safe by default: content is only hidden after this has run (the CSS keys
// off .reveal-ready), and anchor jumps show their target section at once so
// nothing is blank when you land on it.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!els.length) return;

    const show = (el: Element) => el.classList.add("is-in");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    // Show the target section and everything above it, so a jump never lands
    // on (or scrolls back through) hidden content.
    const revealUpTo = (id: string) => {
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      for (const el of els) {
        const before = el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING;
        if (before || target.contains(el) || el.contains(target)) {
          show(el);
          io.unobserve(el);
        }
      }
    };

    // Same-page anchor clicks (plain <a> and next/link both end up as <a href>).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, location.href);
      if (url.pathname === location.pathname && url.hash) revealUpTo(decodeURIComponent(url.hash.slice(1)));
    };
    const onHash = () => revealUpTo(decodeURIComponent(location.hash.slice(1)));
    const onEstimate = () => revealUpTo("check");

    // Anything already on screen (or the page was opened at #section) is shown immediately.
    revealUpTo(decodeURIComponent(location.hash.slice(1)));
    const vh = window.innerHeight;
    for (const el of els) {
      if (el.classList.contains("is-in")) continue;
      if (el.getBoundingClientRect().top < vh) show(el);
      else io.observe(el);
    }
    document.documentElement.classList.add("reveal-ready");

    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(ESTIMATE_EVENT, onEstimate);
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(ESTIMATE_EVENT, onEstimate);
    };
  }, [pathname]);

  return null;
}

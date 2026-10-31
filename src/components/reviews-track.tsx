"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Mobile: horizontal scroll-snap carousel that advances every 5s while in view.
// Stops for good once the visitor touches it; never runs for reduced motion.
// Desktop (md+): plain grid, no JS work at all.
export function ReviewsTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 767px)");
    if (!mobile.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let stopped = false;
    const stop = () => {
      stopped = true;
      window.clearInterval(timer);
    };
    const step = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      // Card positions relative to the first card = scroll positions of the track.
      const positions = cards.map((c) => c.offsetLeft - cards[0].offsetLeft);
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const next = atEnd ? 0 : (positions.find((p) => p > el.scrollLeft + 8) ?? 0);
      el.scrollTo({ left: next, behavior: "smooth" });
    };

    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting && !stopped) timer = window.setInterval(step, 5000);
    }, { threshold: 0.5 });
    io.observe(el);

    el.addEventListener("pointerdown", stop, { once: true });
    el.addEventListener("focusin", stop, { once: true });
    return () => {
      io.disconnect();
      window.clearInterval(timer);
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("focusin", stop);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12 [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

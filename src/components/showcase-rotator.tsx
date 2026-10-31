"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ShowcaseSlide = { url: string; label: string; node: ReactNode };

// Browser-window mockup that crossfades between slides every 4s.
// Pauses on hover/focus, when off-screen, and never auto-rotates for reduced-motion users.
export function ShowcaseRotator({ slides, interval = 4000 }: { slides: ShowcaseSlide[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  // Only the first slide is in the DOM at load; the rest mount once the browser is idle.
  const [mountAll, setMountAll] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setMountAll(true), { timeout: 2500 });
    return () => cancel(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(t);
  }, [paused, visible, interval, slides.length]);

  const current = slides[active];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#0f1528] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-xs text-on-ink-muted">
            {current.url}
          </span>
        </div>
        <div className="@container relative aspect-[16/11] bg-white">
          {slides.map((s, i) =>
            i !== active && !mountAll ? null : (
            <div
              key={s.url}
              className="slide absolute inset-0"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
              inert={i !== active}
            >
              {s.node}
            </div>
            ),
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-on-ink-muted" data-showcase-label>
          <span className="font-semibold text-white">Concept designs</span>
          <span aria-hidden="true"> · </span>
          {current.label}
        </p>
        <div className="flex gap-1" role="group" aria-label="Choose preview">
          {slides.map((s, i) => (
            <button
              key={s.url}
              type="button"
              onClick={() => {
                setMountAll(true);
                setActive(i);
              }}
              aria-label={`Show ${s.label}`}
              aria-pressed={i === active}
              className="grid h-8 w-6 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-brand" : "w-1.5 bg-white/30"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

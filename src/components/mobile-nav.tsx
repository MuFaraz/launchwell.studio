"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "./header";

export function MobileNav({ items, cta }: { items: NavItem[]; cta: NavItem }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="-mr-2 inline-flex h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          {open ? (
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M2 5h14M2 9h14M2 13h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-white/10 bg-ink shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)]"
      >
        <nav aria-label="Mobile" className="container-x py-3">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center justify-between py-3 text-lg font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-on-ink-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={cta.href} className="btn btn-brand mt-3 mb-2 w-full" onClick={() => setOpen(false)}>
            {cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}

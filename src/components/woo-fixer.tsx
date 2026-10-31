"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { startingPrices } from "@/config/pricing";
import type { WooProblem } from "@/content/woo-problems";
import { usd } from "@/lib/format";

// Tabs pattern: arrow keys move between problems, the panel shows how we fix it.
export function WooFixer({ problems }: { problems: WooProblem[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const problem = problems[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = problems.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="card grid overflow-hidden md:grid-cols-12">
      <div className="flex flex-col border-b border-line md:col-span-5 md:border-r md:border-b-0">
      <div role="tablist" aria-orientation="vertical" aria-label="Common WooCommerce problems" className="border-line md:border-b">
        {problems.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`group relative flex w-full items-start gap-4 border-b border-line px-5 py-4 text-left transition-colors last:border-b-0 focus-visible:-outline-offset-2 sm:px-6 ${
                selected ? "bg-white/[0.05] text-fg" : "text-muted hover:bg-white/[0.03] hover:text-fg"
              }`}
            >
              {selected ? (
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-[linear-gradient(180deg,#7c5cff,#c04bd8_50%,#ff7a3d)]" />
              ) : null}
              <span
                className={`mt-0.5 font-mono text-xs tabular-nums ${selected ? "text-orange" : "text-subtle"}`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold leading-snug">{p.title}</span>
              <span
                aria-hidden="true"
                className={`mt-0.5 transition-transform ${selected ? "translate-x-0 text-orange" : "-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
              >
                →
              </span>
            </button>
          );
        })}
      </div>
        <div className="mt-auto hidden p-6 md:block">
          <p className="font-semibold">Not on the list?</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Plugin errors, broken layouts, a hacked site, a store that won’t load. Send us the link and tell us
            what’s happening.
          </p>
        </div>
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${problem.id}`}
        tabIndex={0}
        className="p-6 focus-visible:-outline-offset-4 sm:p-8 md:col-span-7"
      >
        <p className="eyebrow">What you see</p>
        <p className="mt-2 text-lg leading-relaxed">{problem.symptom}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="eyebrow text-muted">Usually caused by</h3>
            <ul className="mt-3 space-y-3">
              {problem.causes.map((c) => (
                <li key={c} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-muted/50" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-orange">What we do</h3>
            <ol className="mt-3 space-y-3">
              {problem.fix.map((f, i) => (
                <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <span aria-hidden="true" className="font-mono text-xs leading-[1.6rem] text-orange">
                    {i + 1}.
                  </span>
                  {f}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            <strong className="font-semibold text-fg">{problem.time}</strong> · fixes from {usd(startingPrices.fix)}
          </p>
          <Link href={`/fixes/${problem.slug}`} className="link text-sm font-semibold">
            Read the full fix guide
          </Link>
        </div>
      </div>
    </div>
  );
}

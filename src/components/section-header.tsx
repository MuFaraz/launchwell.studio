import type { ReactNode } from "react";

export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
  tone = "light",
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const muted = tone === "dark" ? "text-on-ink-muted" : "text-muted";
  return (
    <div className={`grid gap-6 md:grid-cols-12 ${className}`} data-reveal>
      <p className={`eyebrow md:col-span-3 md:pt-3 ${muted}`}>
        <span className={tone === "dark" ? "text-brand" : "text-brand-ink"}>{index}</span>
        <span aria-hidden="true"> — </span>
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.05]">
          {title}
        </h2>
        {intro ? <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${muted}`}>{intro}</div> : null}
      </div>
    </div>
  );
}

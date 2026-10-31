import type { ReactNode } from "react";

export function SectionHeader({
  label,
  title,
  intro,
  id,
  tone = "light",
  align = "left",
  action,
  className = "",
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  const muted = tone === "dark" ? "text-on-ink-muted" : "text-muted";
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${center ? "items-center text-center md:flex-col md:items-center" : ""} ${className}`}
      data-reveal
    >
      <div className={center ? "max-w-2xl" : "max-w-3xl"}>
        <p className={`eyebrow ${tone === "dark" ? "text-brand" : "text-brand-ink"}`}>{label}</p>
        <h2 id={id} className="t-h2 mt-4">
          {title}
        </h2>
        {intro ? <div className={`t-lead mt-4 ${muted}`}>{intro}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

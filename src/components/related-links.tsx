import Link from "next/link";
import { IconArrow } from "./icons";

export function RelatedLinks({ title = "Related", links }: { title?: string; links: { label: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <nav aria-label={title} className="card p-6">
      <h2 className="eyebrow text-muted">{title}</h2>
      <ul className="mt-4 divide-y divide-line">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-center justify-between gap-4 py-3 font-medium">
              <span className="link-quiet">{l.label}</span>
              <IconArrow className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

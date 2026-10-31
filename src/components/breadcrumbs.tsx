import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, type Crumb } from "./json-ld";

// Visible breadcrumb trail + BreadcrumbList JSON-LD. "Home" is added automatically.
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  const muted = tone === "dark" ? "text-muted" : "text-muted";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className={`text-sm ${muted}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-fg"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="link-quiet hover:text-current">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

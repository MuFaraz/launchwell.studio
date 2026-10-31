import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import type { Crumb } from "./json-ld";

// Compact navy hero for inner pages: breadcrumbs, eyebrow, H1, the quotable answer, actions.
export function PageHero({
  crumbs,
  eyebrow,
  title,
  answer,
  actions,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  answer?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-ink ink-texture relative overflow-hidden text-white">
      <div aria-hidden="true" className="glow -top-48 -right-40 h-[36rem] w-[36rem] opacity-70" />
      <div className="container-x relative grid gap-12 pt-10 pb-16 md:pt-12 lg:grid-cols-12 lg:pb-20">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-10 text-brand">{eyebrow}</p>
          <h1 className="t-h1 t-h1-page mt-4">{title}</h1>
          {answer ? (
            <div className="mt-7 max-w-2xl border-l-2 border-brand pl-5">
              <p className="eyebrow text-on-ink-muted">Short answer</p>
              <p className="t-lead mt-2 text-white/90">{answer}</p>
            </div>
          ) : null}
          {actions ? <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-5 lg:pt-16">{aside}</div> : null}
      </div>
    </section>
  );
}

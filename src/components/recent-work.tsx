import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// "Recent work" strip. Switched off until there are screenshots.
//
// To turn it on:
// 1. Put screenshots in /public/work/ (1600×1000 works well).
// 2. Add entries to `projects` below.
// 3. Set SHOW_RECENT_WORK to true.
// Concept projects must keep `concept: true` so they're labelled honestly.
// ─────────────────────────────────────────────────────────────

export const SHOW_RECENT_WORK = false;

type Project = {
  title: string;
  description: string;
  image: string;
  url?: string;
  stack: string;
  concept?: boolean;
};

const projects: Project[] = [
  // {
  //   title: "Bakery store",
  //   description: "WooCommerce store with local delivery slots and Stripe.",
  //   image: "/work/bakery.jpg",
  //   url: "https://bakery-concept.vercel.app",
  //   stack: "WordPress · WooCommerce",
  //   concept: true,
  // },
];

export function RecentWork() {
  if (!SHOW_RECENT_WORK || projects.length === 0) return null;

  return (
    <section aria-labelledby="work-title" className="border-t border-line py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <h2 id="work-title" className="text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.05]">
            Recent work
          </h2>
          <p className="text-sm text-muted">Concept projects are demos we built to show the approach.</p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.title} className="overflow-hidden rounded-lg border border-line bg-white" data-reveal>
              <div className="relative aspect-[16/10] border-b border-line bg-paper-2">
                <Image src={p.image} alt={`Screenshot of ${p.title}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                {p.concept ? (
                  <span className="absolute top-3 left-3 rounded bg-ink px-2 py-1 text-xs font-bold text-white">
                    Concept project
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-1 text-muted">{p.description}</p>
                <p className="mt-3 text-sm font-bold text-muted">{p.stack}</p>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener" className="link mt-3 inline-block text-sm font-bold">
                    View live{p.concept ? " demo" : " site"}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

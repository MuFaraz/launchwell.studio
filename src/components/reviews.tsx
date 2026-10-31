import { site } from "@/config/site";
import { reviews } from "@/content/reviews";

export function Reviews() {
  const [lead, ...rest] = reviews;
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-12">
      <figure
        className="flex flex-col justify-between bg-white p-6 sm:p-10 md:col-span-12 lg:col-span-7 lg:row-span-3"
        data-reveal
      >
        <blockquote>
          <p className="text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.35] font-bold tracking-[-0.015em]">
            <span aria-hidden="true" className="mr-1 text-brand-ink">
              “
            </span>
            {lead.quote}
            <span aria-hidden="true" className="text-brand-ink">
              ”
            </span>
          </p>
        </blockquote>
        <Caption review={lead} />
      </figure>

      {rest.map((r, i) => (
        <figure
          key={`${r.name}-${i}`}
          className="flex flex-col justify-between bg-white p-6 sm:p-8 md:col-span-6 lg:col-span-5"
          data-reveal
          style={{ ["--reveal-delay" as string]: `${(i + 1) * 80}ms` }}
        >
          <blockquote>
            <p className={r.translation ? "text-2xl font-bold" : "leading-relaxed"}>
              “{r.quote}”
              {r.translation ? (
                <span className="mt-1 block text-base font-medium text-muted">({r.translation})</span>
              ) : null}
            </p>
          </blockquote>
          <Caption review={r} />
        </figure>
      ))}

      <div className="flex items-center bg-paper-2 p-6 sm:px-8 md:col-span-6 lg:col-span-12">
        <p className="text-sm text-muted">
          Excerpts from real Fiverr reviews. We’re rated {site.stats.fiverrRating} from{" "}
          {site.stats.fiverrReviews} reviews.{" "}
          <a href={site.fiverr} target="_blank" rel="noopener" className="link font-bold">
            Read them all on Fiverr
          </a>
        </p>
      </div>
    </div>
  );
}

function Caption({ review }: { review: (typeof reviews)[number] }) {
  return (
    <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
      <cite className="font-bold not-italic">{review.name}</cite>
      <span className="text-muted">{review.country}</span>
      <span className="w-full text-muted sm:w-auto">
        {review.project}
        {review.detail ? ` · ${review.detail}` : ""}
      </span>
    </figcaption>
  );
}

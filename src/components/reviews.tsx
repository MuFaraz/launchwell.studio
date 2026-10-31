import { siFiverr } from "simple-icons";
import { site } from "@/config/site";
import { reviews, type Review } from "@/content/reviews";
import { ReviewsTrack } from "./reviews-track";

export function FiverrBadge() {
  return (
    <a
      href={site.fiverr}
      target="_blank"
      rel="noopener"
      className="card card-lift inline-flex items-center gap-3 px-4 py-3"
      aria-label={`Rated ${site.stats.fiverrRating} out of 5 on Fiverr from ${site.stats.fiverrReviews} reviews (opens Fiverr)`}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <path d={siFiverr.path} fill={`#${siFiverr.hex}`} />
      </svg>
      <span className="leading-tight">
        <span className="flex items-center gap-1.5 font-semibold">
          <span aria-hidden="true" className="text-orange">
            ★★★★★
          </span>
          {site.stats.fiverrRating}
        </span>
        <span className="text-sm text-muted">{site.stats.fiverrReviews} reviews · Fiverr</span>
      </span>
    </a>
  );
}

export function Reviews() {
  return (
    <div>
      <ReviewsTrack>
        {reviews.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} lead={i === 0} />
        ))}
      </ReviewsTrack>
      <p className="mt-6 text-sm text-muted">
        Excerpts from real Fiverr reviews.{" "}
        <a href={site.fiverr} target="_blank" rel="noopener" className="link font-semibold">
          Read them all on Fiverr
        </a>
      </p>
    </div>
  );
}

function ReviewCard({ review, lead }: { review: Review; lead: boolean }) {
  return (
    <figure
      className={`card card-lift flex w-[85%] shrink-0 snap-start flex-col justify-between p-6 sm:p-7 md:w-auto ${
        lead ? "md:col-span-2 lg:col-span-7 lg:row-span-3 lg:p-10" : "lg:col-span-5"
      }`}
    >
      <blockquote>
        <span aria-hidden="true" className="accent block h-12 text-[5.5rem] leading-[0.9] lg:h-14 lg:text-[6.5rem]">
          “
        </span>
        <p
          className={
            lead
              ? "text-[1.15rem] leading-[1.5] font-medium tracking-[-0.01em] lg:text-[1.6rem] lg:leading-[1.4]"
              : review.translation
                ? "text-xl font-semibold"
                : "leading-relaxed"
          }
        >
          {review.quote}
          {review.translation ? (
            <span className="mt-1 block text-base font-normal text-muted">({review.translation})</span>
          ) : null}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 text-sm">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-xs font-semibold text-muted uppercase"
        >
          {review.name.slice(0, 2)}
        </span>
        <span className="leading-snug">
          <cite className="font-semibold not-italic">{review.name}</cite>
          <span className="text-muted"> · {review.country}</span>
          <span className="block text-muted">
            {review.project}
            {review.detail ? ` · ${review.detail}` : ""}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

// Lighthouse-style before/after card. Clearly an example, not a client result.

const metrics: [string, string, string][] = [
  ["Largest Contentful Paint", "6.8 s", "2.1 s"],
  ["Total Blocking Time", "1,240 ms", "160 ms"],
  ["Cumulative Layout Shift", "0.31", "0.02"],
  ["Page weight", "5.4 MB", "1.3 MB"],
];

function ScoreBar({ label, score, gradient }: { label: string; score: number; gradient?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className={`text-3xl font-semibold tracking-tight tabular-nums ${gradient ? "grad-text" : "text-fg"}`}>
          {score}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${gradient ? "bg-[image:var(--grad)]" : "bg-white/25"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function SpeedReport() {
  return (
    <figure className="card overflow-hidden" aria-labelledby="speed-caption">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <p className="text-sm font-medium">Mobile performance · product page</p>
        <span className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] font-medium tracking-wide text-muted uppercase">
          Example
        </span>
      </div>
      <div className="space-y-5 px-5 py-6">
        <ScoreBar label="Before" score={41} />
        <ScoreBar label="After" score={94} gradient />
      </div>
      <table className="w-full border-t border-line text-sm">
        <caption className="sr-only">Example before and after metrics</caption>
        <thead>
          <tr className="text-left text-xs text-subtle">
            <th scope="col" className="px-5 py-2 font-medium">
              Metric
            </th>
            <th scope="col" className="px-2 py-2 text-right font-medium">
              Before
            </th>
            <th scope="col" className="px-5 py-2 text-right font-medium">
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(([m, b, a]) => (
            <tr key={m} className="border-t border-line">
              <th scope="row" className="px-5 py-2.5 text-left font-normal text-muted">
                {m}
              </th>
              <td className="px-2 py-2.5 text-right text-subtle tabular-nums line-through decoration-white/30">{b}</td>
              <td className="px-5 py-2.5 text-right font-semibold text-fg tabular-nums">{a}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption id="speed-caption" className="border-t border-line px-5 py-3 text-xs text-subtle">
        Illustrative numbers showing what a typical WooCommerce speed fix targets. Every site is different; you get real
        before/after numbers for yours.
      </figcaption>
    </figure>
  );
}

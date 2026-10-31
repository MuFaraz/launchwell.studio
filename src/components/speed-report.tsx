// Lighthouse-style before/after card. Clearly an example, not a client result.

function Gauge({ score, label }: { score: number; label: string }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const color = score >= 90 ? "#0c8a4a" : score >= 50 ? "#b35c00" : "#c8261c";
  const bg = score >= 90 ? "#e3f6ea" : score >= 50 ? "#fdf0dc" : "#fde5e3";
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
        <circle cx="38" cy="38" r={r} fill={bg} stroke={bg} strokeWidth="6" />
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * c} ${c}`}
          transform="rotate(-90 38 38)"
        />
        <text x="38" y="44" textAnchor="middle" fontSize="19" fontWeight="700" fill={color}>
          {score}
        </text>
      </svg>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}

const metrics: [string, string, string][] = [
  ["Largest Contentful Paint", "6.8 s", "2.1 s"],
  ["Total Blocking Time", "1,240 ms", "160 ms"],
  ["Cumulative Layout Shift", "0.31", "0.02"],
  ["Page weight", "5.4 MB", "1.3 MB"],
];

export function SpeedReport() {
  return (
    <figure className="card overflow-hidden" aria-labelledby="speed-caption">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <p className="text-sm font-semibold">Mobile performance · product page</p>
        <span className="rounded border border-line px-1.5 py-0.5 text-[0.7rem] font-semibold tracking-wide text-muted uppercase">
          Example
        </span>
      </div>
      <div className="flex items-center justify-around gap-4 px-5 py-6">
        <Gauge score={34} label="Before" />
        <svg width="40" height="16" viewBox="0 0 40 16" aria-hidden="true" className="text-muted">
          <path d="M0 8h36M30 2l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </svg>
        <Gauge score={93} label="After" />
      </div>
      <table className="w-full border-t border-line text-sm">
        <caption className="sr-only">Example before and after metrics</caption>
        <thead>
          <tr className="text-left text-xs text-muted">
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
              <th scope="row" className="px-5 py-2.5 text-left font-medium">
                {m}
              </th>
              <td className="px-2 py-2.5 text-right text-[#c8261c] tabular-nums">{b}</td>
              <td className="px-5 py-2.5 text-right font-semibold text-[#0c8a4a] tabular-nums">{a}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption id="speed-caption" className="border-t border-line bg-paper-2 px-5 py-3 text-xs text-muted">
        Illustrative numbers showing what a typical WooCommerce speed fix targets. Every site is different; you get real
        before/after numbers for yours.
      </figcaption>
    </figure>
  );
}

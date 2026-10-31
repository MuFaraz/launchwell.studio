// Small UI illustrations for the service cards, built with HTML/CSS (no images).
// Dark-glass mini interfaces in the brand palette. Purely decorative (aria-hidden).

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-44 overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_85%_0%,rgba(124,92,255,0.22),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(255,122,61,0.12),transparent_50%)] bg-surface-strong p-4 ${className}`}
    >
      {children}
    </div>
  );
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <div className={`h-2 rounded-full bg-white/10 ${className}`} style={{ width: w }} />
);

const Panel = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-white/10 bg-white/[0.04] ${className}`}>{children}</div>
);

export function CheckoutArt() {
  return (
    <Frame>
      <div className="mx-auto flex max-w-[22rem] gap-3">
        <Panel className="flex-1 p-3">
          <p className="text-[0.62rem] font-semibold tracking-wider text-subtle uppercase">Checkout</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-6 rounded-md border border-white/10" />
            <div className="h-6 rounded-md border border-white/10" />
            <div className="flex gap-1.5">
              <div className="h-6 flex-1 rounded-md border border-white/10" />
              <div className="h-6 w-10 rounded-md border border-white/10" />
            </div>
          </div>
          <div className="mt-2.5 flex h-7 items-center justify-center rounded-full bg-[image:var(--grad)] text-[0.62rem] font-semibold text-white">
            Place order
          </div>
        </Panel>
        <div className="w-28 space-y-2 pt-1">
          {["Payment OK", "Email sent", "1.8s load"].map((t, i) => (
            <Panel key={t} className="flex items-center gap-1.5 px-2 py-1.5 text-[0.6rem] font-medium text-fg">
              <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? "bg-success" : "bg-orange"}`} /> {t}
            </Panel>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function ProductCardArt() {
  return (
    <Frame className="flex items-center justify-center gap-3">
      {[0, 1].map((i) => (
        <Panel key={i} className={`w-28 p-2 ${i ? "translate-y-3" : ""}`}>
          <div
            className={`h-16 rounded-lg ${i ? "bg-[linear-gradient(135deg,rgba(124,92,255,0.5),rgba(192,75,216,0.35))]" : "bg-[linear-gradient(135deg,rgba(255,122,61,0.5),rgba(192,75,216,0.3))]"}`}
          />
          <Bar w="80%" className="mt-2" />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[0.62rem] font-semibold text-fg">{i ? "$34" : "$28"}</span>
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[0.55rem] font-semibold text-bg">Add</span>
          </div>
        </Panel>
      ))}
    </Frame>
  );
}

export function DashboardArt() {
  const bars = [38, 56, 44, 70, 62, 84, 76];
  return (
    <Frame>
      <div className="flex h-full gap-3">
        <Panel className="w-14 space-y-2 p-2">
          <div className="h-1.5 w-8 rounded-full bg-orange" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 w-7 rounded-full bg-white/15" />
          ))}
        </Panel>
        <div className="flex-1">
          <div className="flex gap-2">
            {["Bookings", "Revenue"].map((l) => (
              <Panel key={l} className="flex-1 p-2">
                <p className="text-[0.55rem] text-subtle">{l}</p>
                <Bar w="60%" className="mt-1.5 bg-white/20" />
              </Panel>
            ))}
          </div>
          <Panel className="mt-2 flex h-[4.5rem] items-end gap-1.5 p-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-[linear-gradient(180deg,#c04bd8,#7c5cff)] opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </Panel>
        </div>
      </div>
    </Frame>
  );
}

export function ChatArt() {
  return (
    <Frame className="flex flex-col justify-center gap-2">
      <div className="max-w-[75%] self-start rounded-2xl rounded-bl-sm bg-white/[0.08] px-3 py-2 text-[0.68rem] text-fg">
        Do you deliver on Sundays?
      </div>
      <div className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-gradient-to-br from-violet to-magenta px-3 py-2 text-[0.68rem] text-white">
        Yes, 10am–4pm in the city. Want me to book a slot?
      </div>
      <div className="flex w-14 gap-1 rounded-full bg-white/[0.08] px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40" />
        ))}
      </div>
    </Frame>
  );
}

export function BoardArt() {
  const cols = [
    { t: "To do", n: 2 },
    { t: "Doing", n: 1 },
    { t: "Review", n: 2 },
  ];
  return (
    <Frame className="flex gap-2">
      {cols.map((c, ci) => (
        <Panel key={c.t} className="flex-1 p-1.5">
          <p className="px-0.5 text-[0.55rem] font-semibold tracking-wider text-subtle uppercase">{c.t}</p>
          <div className="mt-1.5 space-y-1.5">
            {Array.from({ length: c.n }).map((_, i) => (
              <div key={i} className="rounded-md border border-white/10 bg-white/[0.05] p-1.5">
                <Bar w={i ? "60%" : "85%"} />
                <div className="mt-1.5 flex items-center justify-between">
                  <span className={`h-1.5 w-6 rounded-full ${ci === 1 ? "bg-orange" : "bg-white/15"}`} />
                  <span className="h-3 w-3 rounded-full bg-violet/50" />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </Frame>
  );
}

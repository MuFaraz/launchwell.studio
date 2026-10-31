// Small UI illustrations for the service cards, built with HTML/CSS (no images).
// Purely decorative, so the whole frame is aria-hidden.

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-44 overflow-hidden rounded-[10px] border border-line bg-gradient-to-b from-paper-2 to-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <div className={`h-2 rounded-full bg-[#e2e3dc] ${className}`} style={{ width: w }} />
);

export function CheckoutArt() {
  return (
    <Frame>
      <div className="mx-auto flex max-w-[22rem] gap-3">
        <div className="flex-1 rounded-lg border border-line bg-white p-3 shadow-sm">
          <p className="text-[0.65rem] font-semibold tracking-wide text-muted uppercase">Checkout</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-6 rounded border border-line" />
            <div className="h-6 rounded border border-line" />
            <div className="flex gap-1.5">
              <div className="h-6 flex-1 rounded border border-line" />
              <div className="h-6 w-10 rounded border border-line" />
            </div>
          </div>
          <div className="mt-2.5 flex h-7 items-center justify-center rounded bg-ink text-[0.65rem] font-semibold text-white">
            Place order
          </div>
        </div>
        <div className="w-28 space-y-2 pt-1">
          <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[0.62rem] font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#21a366]" /> Payment OK
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[0.62rem] font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#21a366]" /> Email sent
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[0.62rem] font-semibold shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand" /> 1.8s load
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ProductCardArt() {
  return (
    <Frame className="flex items-center justify-center gap-3">
      {[0, 1].map((i) => (
        <div key={i} className={`w-28 rounded-lg border border-line bg-white p-2 shadow-sm ${i ? "translate-y-3" : ""}`}>
          <div className={`h-16 rounded-md ${i ? "bg-[#e9eef7]" : "bg-[#f1ebe3]"}`} />
          <Bar w="80%" className="mt-2" />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[0.65rem] font-semibold">{i ? "$34" : "$28"}</span>
            <span className="rounded bg-ink px-1.5 py-0.5 text-[0.55rem] font-semibold text-white">Add</span>
          </div>
        </div>
      ))}
    </Frame>
  );
}

export function DashboardArt() {
  const bars = [38, 56, 44, 70, 62, 84, 76];
  return (
    <Frame>
      <div className="flex h-full gap-3">
        <div className="w-14 space-y-2 rounded-md bg-ink p-2">
          <div className="h-1.5 w-8 rounded-full bg-brand" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 w-7 rounded-full bg-white/25" />
          ))}
        </div>
        <div className="flex-1">
          <div className="flex gap-2">
            {["Bookings", "Revenue"].map((l) => (
              <div key={l} className="flex-1 rounded-md border border-line bg-white p-2">
                <p className="text-[0.55rem] text-muted">{l}</p>
                <Bar w="60%" className="mt-1.5 bg-[#cfd9ee]" />
              </div>
            ))}
          </div>
          <div className="mt-2 flex h-[4.5rem] items-end gap-1.5 rounded-md border border-line bg-white p-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ChatArt() {
  return (
    <Frame className="flex flex-col justify-center gap-2">
      <div className="max-w-[75%] self-end rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-[0.7rem] text-white">
        Do you deliver on Sundays?
      </div>
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-line bg-white px-3 py-2 text-[0.7rem] shadow-sm">
        Yes, 10am–4pm in the city. Want me to book a slot?
      </div>
      <div className="flex w-14 gap-1 rounded-full border border-line bg-white px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted/40" />
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
        <div key={c.t} className="flex-1 rounded-md bg-white/70 p-1.5">
          <p className="px-0.5 text-[0.55rem] font-semibold tracking-wide text-muted uppercase">{c.t}</p>
          <div className="mt-1.5 space-y-1.5">
            {Array.from({ length: c.n }).map((_, i) => (
              <div key={i} className="rounded border border-line bg-white p-1.5 shadow-sm">
                <Bar w={i ? "60%" : "85%"} />
                <div className="mt-1.5 flex items-center justify-between">
                  <span className={`h-1.5 w-6 rounded-full ${ci === 1 ? "bg-brand" : "bg-[#d9dbe3]"}`} />
                  <span className="h-3 w-3 rounded-full bg-[#cfd9ee]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Frame>
  );
}

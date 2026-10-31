// Example conversation in the hero. Pure CSS animation: messages appear one by one
// (typing dots before each Launchwell reply). Without JS it still animates; with
// reduced motion everything is shown at once. Each message and its typing indicator
// share one grid cell, so the card's height never changes (no layout shift).

const START = 600; // ms before the first message
const GAP = 800; // ms between messages
const TYPING = 700; // typing dots shown before a reply

const messages: { from: "owner" | "us"; text: string }[] = [
  { from: "owner", text: "My checkout keeps sending customers back to the homepage 😩" },
  {
    from: "us",
    text: "Found it: your cache plugin is caching the checkout page. Excluding cart & checkout fixes it. Want us to do it today?",
  },
  { from: "owner", text: "Yes please!" },
  { from: "us", text: "Done ✓ Test order #2041 went through. You’re live." },
];

// Static schedule: when each typing indicator and message appears.
const timed = messages.reduce<{ items: ((typeof messages)[number] & { at: number; typingAt: number | null })[]; t: number }>(
  ({ items, t }, m) => {
    const typingAt = m.from === "us" ? t : null;
    const at = m.from === "us" ? t + TYPING : t;
    return { items: [...items, { ...m, at, typingAt }], t: at + GAP };
  },
  { items: [], t: START },
).items;

export function HeroChat() {
  return (
    <figure className="card glass relative p-5 sm:p-6" aria-label="Example conversation with Launchwell">
      <div className="mb-4 flex items-center gap-2.5 text-sm text-muted">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_#3BDB8A]" />
        Free website check · yourstore.com
      </div>
      <ol className="flex flex-col gap-2.5">
        {timed.map((m, i) => (
          <li key={i} className={`grid ${m.from === "us" ? "justify-items-end" : "justify-items-start"}`}>
            {m.typingAt !== null ? (
              <span
                aria-hidden="true"
                className="typing col-start-1 row-start-1 inline-flex h-10 items-center gap-1 self-start rounded-[14px] bg-gradient-to-br from-violet to-magenta px-3.5 opacity-0"
                style={{ ["--d" as string]: `${m.typingAt}ms` }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            ) : null}
            <p
              className={`msg col-start-1 row-start-1 max-w-[85%] rounded-[14px] px-3.5 py-3 text-[0.85rem] leading-[1.45] ${
                m.from === "us" ? "bg-gradient-to-br from-violet to-magenta text-white" : "bg-white/[0.07] text-fg"
              }`}
              style={{ ["--d" as string]: `${m.at}ms` }}
            >
              <span className="sr-only">{m.from === "us" ? "Launchwell: " : "Store owner: "}</span>
              {m.text}
            </p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-xs text-subtle">Example conversation</figcaption>
    </figure>
  );
}

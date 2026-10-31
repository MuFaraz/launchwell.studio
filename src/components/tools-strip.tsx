import {
  siClaude,
  siLaravel,
  siNextdotjs,
  siPaypal,
  siShopify,
  siStripe,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

// Server-rendered SVGs: no client JS. Greyscale by default, brand colour on hover.
const tools: (SimpleIcon | { title: string; text: true })[] = [
  siWordpress,
  siWoocommerce,
  siShopify,
  siStripe,
  siPaypal,
  siNextdotjs,
  siLaravel,
  { title: "OpenAI", text: true }, // not in simple-icons, shown as a wordmark
  siClaude,
];

export function ToolsStrip() {
  return (
    <section aria-labelledby="tools-title" className="border-b border-line bg-white">
      <div className="container-x flex flex-col gap-5 py-8">
        <h2 id="tools-title" className="eyebrow shrink-0 text-muted">
          Tools we work with
        </h2>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-7 md:gap-x-9">
          {tools.map((t) => (
            <li key={t.title}>
              {"text" in t ? (
                <span
                  title={t.title}
                  className="text-[1.05rem] font-semibold tracking-tight text-muted transition-colors hover:text-ink"
                >
                  {t.title}
                </span>
              ) : (
                <span
                  title={t.title}
                  className="group flex items-center gap-2 text-[#8b909b] transition-colors"
                  style={{ ["--brand" as string]: `#${t.hex}` }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="transition-colors group-hover:text-[var(--brand)]"
                  >
                    <path d={t.path} />
                  </svg>
                  <span className="sr-only text-sm font-medium text-muted transition-colors group-hover:text-ink sm:not-sr-only">{t.title}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

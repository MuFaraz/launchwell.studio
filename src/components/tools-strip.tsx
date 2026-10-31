import {
  siClaude,
  siElementor,
  siLaravel,
  siModelcontextprotocol,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPaypal,
  siPhp,
  siPostgresql,
  siRabbitmq,
  siReact,
  siRedis,
  siShopify,
  siStripe,
  siTailwindcss,
  siTypescript,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

// Infinite, slow marquee of the tools we use, grouped. Server-rendered SVGs (no client JS).
// Monochrome by default, brand colour on hover. Near-black brand colours hover to white
// so they stay visible on the dark background. Pauses on hover; static for reduced motion.

type Tool = SimpleIcon | { title: string; text: true };

const groups: { label: string; tools: Tool[] }[] = [
  { label: "CMS & stores", tools: [siWordpress, siWoocommerce, siShopify, siElementor] },
  { label: "Frontend", tools: [siReact, siNextdotjs, siNuxt, siTypescript, siTailwindcss] },
  { label: "Backend", tools: [siLaravel, siPhp, siNodedotjs, siNestjs] },
  { label: "Data", tools: [siMysql, siPostgresql, siRedis, siRabbitmq] },
  { label: "Payments", tools: [siStripe, siPaypal, { title: "Authorize.Net", text: true }] },
  { label: "AI", tools: [{ title: "OpenAI", text: true }, siClaude, siModelcontextprotocol] },
];

function hoverColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.35 ? "#FFFFFF" : `#${hex}`;
}

function Group({ label, tools }: { label: string; tools: Tool[] }) {
  return (
    <li className="flex shrink-0 items-center gap-6 pr-12">
      <span className="text-[0.68rem] font-medium tracking-[0.14em] whitespace-nowrap text-subtle uppercase">{label}</span>
      <ul className="flex items-center gap-6">
        {tools.map((t) =>
          "text" in t ? (
            <li key={t.title} className="text-[0.95rem] font-semibold tracking-tight whitespace-nowrap text-muted transition-colors hover:text-fg">
              {t.title}
            </li>
          ) : (
            <li
              key={t.title}
              className="group flex items-center gap-2 text-muted transition-colors hover:text-fg"
              style={{ ["--brand" as string]: hoverColor(t.hex) }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className="text-subtle transition-colors group-hover:text-[var(--brand)]"
              >
                <path d={t.path} />
              </svg>
              <span className="text-sm whitespace-nowrap">{t.title}</span>
            </li>
          ),
        )}
      </ul>
    </li>
  );
}

export function ToolsStrip() {
  return (
    <section aria-labelledby="tools-title" className="border-y border-line bg-surface">
      <h2 id="tools-title" className="sr-only">
        Tools we work with
      </h2>
      <div className="marquee relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max">
          <ul className="flex">
            {groups.map((g) => (
              <Group key={g.label} {...g} />
            ))}
          </ul>
          {/* Duplicate for a seamless loop; hidden from assistive tech. */}
          <ul className="marquee-dup flex" aria-hidden="true">
            {groups.map((g) => (
              <Group key={g.label} {...g} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { site } from "@/config/site";
import { conceptShot } from "@/lib/public-assets";
import { ShowcaseRotator, type ShowcaseSlide } from "./showcase-rotator";

// Hero mockup: 3 concept site previews + the sample free-check reply.
// Real screenshots in /public/concepts/concept-{1,2,3}.(webp|jpg|png) replace the
// CSS-built previews automatically. All of this is concept work, labelled as such.

// Everything inside a preview is sized in em; the root scales with the frame width.
const root = "h-full w-full overflow-hidden text-[1.9cqw] leading-[1.35] text-ink";

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 560px, 92vw"
      loading="lazy"
      className="object-cover object-top"
    />
  );
}

function Bakery() {
  return (
    <div className={`${root} bg-[#fbf7f1]`}>
      <div className="flex items-center justify-between px-[4%] py-[2.5%]">
        <span className="text-[1.15em] font-bold tracking-tight">Crumb &amp; Co.</span>
        <span className="flex gap-[1.4em] text-[0.8em] text-[#6b5b4b]">
          <span>Shop</span>
          <span>Bakes</span>
          <span>Delivery</span>
          <span className="font-semibold text-ink">Cart (2)</span>
        </span>
      </div>
      <div className="grid grid-cols-[1.1fr_1fr] gap-[4%] px-[4%] pt-[2%]">
        <div className="pt-[4%]">
          <p className="text-[0.7em] font-semibold tracking-widest text-[#9a5420] uppercase">Baked at 4am</p>
          <p className="mt-[0.4em] text-[2.1em] leading-[1.05] font-bold tracking-tight">
            Fresh sourdough at your door by 9.
          </p>
          <span className="mt-[1em] inline-block rounded-full bg-[#2a1d13] px-[1.2em] py-[0.55em] text-[0.8em] font-semibold text-white">
            Order for tomorrow
          </span>
        </div>
        <div className="aspect-[4/2.7] rounded-[0.8em] bg-[radial-gradient(circle_at_35%_40%,#e7b77d,#c98a4b_45%,#8a5a2e)]" />
      </div>
      <div className="mt-[3.5%] grid grid-cols-3 gap-[3%] px-[4%]">
        {[
          ["Country loaf", "$7", "#ead2b2"],
          ["Cinnamon knots", "$4", "#e6c3a3"],
          ["Rye & seeds", "$8", "#d7c0a2"],
        ].map(([n, p, c]) => (
          <div key={n} className="rounded-[0.6em] bg-white p-[0.6em] shadow-[0_0.2em_0.6em_rgba(0,0,0,0.06)]">
            <div className="aspect-[4/1.9] rounded-[0.4em]" style={{ background: c }} />
            <div className="mt-[0.5em] flex justify-between text-[0.8em] font-semibold">
              <span>{n}</span>
              <span>{p}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Clinic() {
  return (
    <div className={`${root} bg-white`}>
      <div className="flex items-center justify-between border-b border-[#e8eeec] px-[4%] py-[2.5%]">
        <span className="text-[1.1em] font-bold tracking-tight text-[#14463b]">Northside Physio</span>
        <span className="rounded-full bg-[#14463b] px-[1em] py-[0.45em] text-[0.75em] font-semibold text-white">
          Book now
        </span>
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-[5%] px-[4%] pt-[5%]">
        <div>
          <p className="text-[2em] leading-[1.08] font-bold tracking-tight text-[#0f2d27]">
            Back pain? Book a physio this week.
          </p>
          <p className="mt-[0.8em] text-[0.85em] text-[#5b6b67]">
            45-minute sessions, same-week slots, insurance accepted.
          </p>
          <div className="mt-[1.2em] flex gap-[0.6em] text-[0.75em] font-semibold text-[#14463b]">
            <span className="rounded-full bg-[#e3f1ec] px-[0.9em] py-[0.4em]">Sports injury</span>
            <span className="rounded-full bg-[#e3f1ec] px-[0.9em] py-[0.4em]">Back &amp; neck</span>
          </div>
        </div>
        <div className="rounded-[0.8em] border border-[#e8eeec] p-[0.9em] shadow-[0_0.4em_1.2em_rgba(15,45,39,0.08)]">
          <p className="text-[0.8em] font-semibold">Thursday, 14 Nov</p>
          <div className="mt-[0.7em] grid grid-cols-3 gap-[0.5em] text-center text-[0.75em] font-semibold">
            {["9:00", "10:00", "11:30", "1:00", "3:30", "5:00"].map((t, i) => (
              <span
                key={t}
                className={`rounded-[0.4em] py-[0.5em] ${i === 2 ? "bg-[#14463b] text-white" : "bg-[#f2f6f5] text-[#2b4a43]"}`}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="mt-[0.9em] block rounded-[0.4em] bg-[#14463b] py-[0.55em] text-center text-[0.8em] font-semibold text-white">
            Confirm 11:30
          </span>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className={`${root} flex bg-[#f6f7fb]`}>
      <div className="w-[17%] space-y-[0.9em] bg-[#111633] p-[1.1em] text-[0.75em] text-white/60">
        <p className="text-[1.15em] font-bold text-white">Ledgerly</p>
        <p className="text-white">Overview</p>
        <p>Invoices</p>
        <p>Clients</p>
        <p>Reports</p>
      </div>
      <div className="flex-1 p-[3%]">
        <div className="flex items-center justify-between">
          <p className="text-[1.2em] font-bold">Overview</p>
          <span className="rounded-[0.4em] bg-[#3d58f0] px-[0.9em] py-[0.4em] text-[0.75em] font-semibold text-white">
            New invoice
          </span>
        </div>
        <div className="mt-[3%] grid grid-cols-3 gap-[3%]">
          {[
            ["Paid this month", "$18,420"],
            ["Outstanding", "$3,150"],
            ["Overdue", "2"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-[0.6em] bg-white p-[0.8em] shadow-[0_0.2em_0.6em_rgba(17,22,51,0.06)]">
              <p className="text-[0.7em] text-[#6a7085]">{l}</p>
              <p className="mt-[0.2em] text-[1.3em] font-bold tracking-tight">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-[3%] rounded-[0.6em] bg-white p-[0.9em] shadow-[0_0.2em_0.6em_rgba(17,22,51,0.06)]">
          <svg viewBox="0 0 300 90" className="h-auto w-full" aria-hidden="true">
            <path d="M0 70 C40 60 60 72 90 52 S150 40 180 46 240 18 300 22" fill="none" stroke="#3d58f0" strokeWidth="3" />
            <path d="M0 70 C40 60 60 72 90 52 S150 40 180 46 240 18 300 22 V90 H0Z" fill="#3d58f0" opacity=".08" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SampleReply() {
  const fixes: [string, string][] = [
    ["Your homepage banner is a 3 MB image.", "Resize it and convert to WebP. It’s the main reason the page is slow on phones."],
    ["Checkout only offers card payments.", "Adding PayPal gives people a way to pay when their card is declined."],
    ["Order emails go out from the server’s default mailer.", "That’s why some land in spam. Set up SMTP with SPF and DKIM."],
  ];
  return (
    <div className={`${root} bg-white text-[2.05cqw]`}>
      <div className="flex items-center justify-between border-b border-line px-[4%] py-[2.4%]">
        <span className="font-semibold">Re: Free website check: yourstore.com</span>
        <span className="rounded border border-line px-[0.5em] py-[0.1em] text-[0.7em] font-semibold tracking-wide text-muted uppercase">
          Sample
        </span>
      </div>
      <div className="px-[4%] py-[3%]">
        <p>Hi Sarah, here are the 3 things I’d fix first:</p>
        <ol className="mt-[0.8em] space-y-[0.7em]">
          {fixes.map(([what, why], i) => (
            <li key={what} className="flex gap-[0.6em]">
              <span className="font-semibold text-brand-ink">{i + 1}.</span>
              <span>
                <strong className="font-semibold">{what}</strong> <span className="text-muted">{why}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-[0.9em] font-semibold">{site.founder}, Launchwell Studio</p>
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const concepts = [
    { n: 1 as const, url: "crumbandco.example", label: "Bakery store on WooCommerce", Fallback: Bakery },
    { n: 2 as const, url: "northsidephysio.example", label: "Clinic booking site", Fallback: Clinic },
    { n: 3 as const, url: "app.ledgerly.example", label: "SaaS dashboard (Next.js)", Fallback: Dashboard },
  ];

  const slides: ShowcaseSlide[] = concepts.map(({ n, url, label, Fallback }) => {
    const src = conceptShot(n);
    return {
      url,
      label: `Concept: ${label}`,
      node: src ? <Shot src={src} alt={`Concept design: ${label}`} /> : <Fallback />,
    };
  });
  slides.push({ url: "mail.launchwell.example", label: "Sample free-check reply", node: <SampleReply /> });

  return <ShowcaseRotator slides={slides} />;
}

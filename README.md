# Launchwell Studio website

Next.js 16 (App Router, TypeScript, Tailwind v4). Pages: `/`, `/agencies`, `/pakistan`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Where things live

| What | File |
|---|---|
| All prices (service cards, FAQ, estimator, PKR packages) | `src/config/pricing.ts` |
| Email, WhatsApp, socials, Fiverr, founder photo, real stats | `src/config/site.ts` |
| Fiverr reviews (word for word only) | `src/content/reviews.ts` |
| Service cards | `src/content/services.ts` |
| WooCommerce problems list | `src/content/woo-problems.ts` |
| FAQ | `src/content/faq.ts` |
| "Recent work" strip (off) | `src/components/recent-work.tsx` |
| Form handler (Resend, honeypot, rate limit) | `src/app/api/contact/route.ts` |
| GA4 + Meta Pixel | `src/components/analytics.tsx`, events in `src/lib/track.ts` |

## Editing prices

Open `src/config/pricing.ts`.

- `startingPrices`: the "from $X" numbers shown on cards, in the FAQ, on the agencies page and in schema.org data.
- `launchOffer`: the "20% off for our first 5 clients" line (hero + estimator). Set `enabled: false` to remove it.
- `pkrPackages`: the three Pakistan packages.
- `estimatorServices`: each service has a `base` price/day range, and every answer adds `price: [min, max]` and `days: [min, max]` on top. `monthly` adds a "+ $X/month" line. Labels can be renamed and options added or removed freely.
- `urgencyOptions`: the multipliers for "Sooner" and "Urgent".

## Environment variables

See `.env.example`. All are optional; the site works without any of them.

| Variable | What it does |
|---|---|
| `RESEND_API_KEY` | Sends form submissions by email. Without it, forms fall back to a pre-filled email link. |
| `RESEND_FROM` | Sender address, e.g. `Launchwell <hello@yourdomain.com>`. Needs that domain verified in Resend. Default `onboarding@resend.dev` (only delivers to your Resend account's own email). |
| `CONTACT_TO_EMAIL` | Where submissions go. Default `studiolaunchwell@gmail.com`. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). Off when empty. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. Off when empty. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Set this when you add a custom domain. |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Lead events

Sent as `generate_lead` in GA4 and `Lead` in Meta Pixel, with a source:
`free_check_form`, `project_form`, `whatsapp`, `email`, `estimator` (on "Send me this estimate").

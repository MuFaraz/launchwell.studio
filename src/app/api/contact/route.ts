import { site } from "@/config/site";
import { rateLimit } from "@/lib/rate-limit";

type Payload = {
  mode?: unknown;
  source?: unknown;
  name?: unknown;
  email?: unknown;
  website?: unknown;
  message?: unknown;
  estimate?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers });
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, error: "That didn’t come through properly. Please try again." }, 400);
  }

  // Honeypot filled, or sent within 2 seconds of the page loading: pretend it worked.
  const startedAt = typeof data.startedAt === "number" ? data.startedAt : 0;
  if (str(data.company, 200) || (startedAt > 0 && Date.now() - startedAt < 2000)) {
    return json({ ok: true });
  }

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return json(
      {
        ok: false,
        error: `Too many messages from your connection. Please wait a few minutes, or email ${site.email}.`,
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const mode = data.mode === "project" ? "project" : "check";
  const name = str(data.name, 100);
  const email = str(data.email, 200);
  const website = str(data.website, 200);
  const message = str(data.message, 4000);
  const estimate = str(data.estimate, 2000);
  const source = str(data.source, 50) || "website";

  if (!name) return json({ ok: false, error: "Please add your name." }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "That email address doesn’t look right." }, 400);
  if (mode === "check" && !website) {
    return json({ ok: false, error: "Please add the website address you’d like us to check." }, 400);
  }
  if (mode === "project" && !message && !estimate) {
    return json({ ok: false, error: "Please tell us a little about the project." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mail service configured: the form shows a pre-filled mailto link instead.
    return json({ ok: false, fallback: true }, 503);
  }

  const subject =
    mode === "check"
      ? `Free website check: ${website} (${name})`
      : `Project enquiry from ${name}${estimate ? " (with estimate)" : ""}`;

  const rows: [string, string][] = [
    ["Type", mode === "check" ? "Free website check" : "Project enquiry"],
    ["Name", name],
    ["Email", email],
    ["Website", website || "-"],
    ["Page", source],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    message || "(no message)",
    estimate ? `\n---\n${estimate}` : "",
  ].join("\n");

  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0E0A16">
<table cellpadding="4" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#555c6b;padding-right:16px">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;margin-top:20px">${escapeHtml(message || "(no message)")}</p>
${estimate ? `<pre style="white-space:pre-wrap;font-family:inherit;background:#f3f0f8;padding:12px;border-radius:6px">${escapeHtml(estimate)}</pre>` : ""}
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Launchwell Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return json({ ok: false, fallback: true }, 502);
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return json({ ok: false, fallback: true }, 502);
  }

  return json({ ok: true });
}

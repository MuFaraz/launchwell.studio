// Fires a "Lead" in GA4 (as generate_lead) and Meta Pixel (as Lead).
// Safe to call when neither is installed.

export type LeadSource = "free_check_form" | "project_form" | "whatsapp" | "estimator" | "email";

type TrackWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export function trackLead(source: LeadSource, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackWindow;
  try {
    w.gtag?.("event", "generate_lead", { lead_source: source, ...params });
    w.fbq?.("track", "Lead", { content_name: source, ...params });
  } catch {
    // Tracking must never break the page.
  }
}

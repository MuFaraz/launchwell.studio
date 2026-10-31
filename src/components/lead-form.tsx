"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { mailtoUrl, site, whatsappUrl } from "@/config/site";
import { ESTIMATE_EVENT, type EstimateEventDetail } from "@/lib/events";
import { trackLead } from "@/lib/track";

export type LeadMode = "check" | "project";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; website: string }
  | { kind: "error"; message: string }
  | { kind: "fallback"; href: string };

const modes: { id: LeadMode; label: string }[] = [
  { id: "check", label: "Free website check" },
  { id: "project", label: "Project enquiry" },
];

export function LeadForm({
  defaultMode = "check",
  allowModeSwitch = true,
  source = "home",
  projectPlaceholder = "What do you need? A rough idea is fine: what the site is for, any examples you like, when you’d like it live.",
}: {
  defaultMode?: LeadMode;
  allowModeSwitch?: boolean;
  source?: string;
  projectPlaceholder?: string;
}) {
  const uid = useId();
  const [mode, setMode] = useState<LeadMode>(defaultMode);
  const [estimate, setEstimate] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Lets the server drop submissions sent faster than a person could type.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // The estimator hands its result over through a window event.
  useEffect(() => {
    const onEstimate = (e: Event) => {
      const detail = (e as CustomEvent<EstimateEventDetail>).detail;
      setMode("project");
      setEstimate(detail.text);
      setStatus({ kind: "idle" });
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        nameRef.current?.focus({ preventScroll: true });
      });
    };
    window.addEventListener(ESTIMATE_EVENT, onEstimate);
    return () => window.removeEventListener(ESTIMATE_EVENT, onEstimate);
  }, []);

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "fallback") doneRef.current?.focus();
  }, [status.kind]);

  const isCheck = mode === "check";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      mode,
      source,
      estimate,
      startedAt: startedAt.current,
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
    };

    setStatus({ kind: "sending" });
    let res: Response | null = null;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      res = null;
    }

    const data: { ok?: boolean; error?: string; fallback?: boolean } = res
      ? await res.json().catch(() => ({}))
      : { fallback: true };

    if (res?.ok && data.ok) {
      trackLead(isCheck ? "free_check_form" : "project_form", { form_source: source });
      setStatus({ kind: "sent", website: payload.website });
      return;
    }

    if (data.fallback) {
      const subject = isCheck
        ? `Free website check: ${payload.website || payload.name}`
        : `Project enquiry from ${payload.name}`;
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.website ? `Website: ${payload.website}` : "",
        payload.message ? `\n${payload.message}` : "",
        estimate ? `\n${estimate}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      setStatus({ kind: "fallback", href: mailtoUrl(subject, body) });
      return;
    }

    setStatus({
      kind: "error",
      message: data.error ?? "Something went wrong sending that. Please try again, or email us directly.",
    });
  }

  if (status.kind === "sent") {
    return (
      <div className="card glass p-6 sm:p-8" role="status">
        <h3 ref={doneRef} tabIndex={-1} className="t-h3 outline-none">
          Thanks, it’s with us.
        </h3>
        <p className="mt-2 text-muted">
          {isCheck
            ? `We’ll look at ${status.website || "your site"} ourselves, not with a scanner.`
            : "We’ll read it properly and come back with questions or a fixed quote."}
        </p>
        <p className="eyebrow mt-6 text-orange">What happens next</p>
        <ol className="mt-3 space-y-3">
          {(isCheck
            ? [
                "We open your site on a real phone and a desktop, and test the key pages.",
                "Within 24 hours you get an email with 3 practical fixes, in plain English.",
                "Fix them yourself, or reply and we’ll quote a fixed price to do it. No pressure either way.",
              ]
            : [
                "We read your message and look at anything you linked.",
                "Within 24 hours you get questions or a fixed quote with a timeline.",
                "Nothing starts until you say yes.",
              ]
          ).map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet/15 text-xs font-semibold text-orange">
                {i + 1}
              </span>
              <span className="text-[0.975rem]">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
          Can’t wait?{" "}
          <a
            href={whatsappUrl(`Hi Launchwell, I just sent the form on your website. My name is `)}
            target="_blank"
            rel="noopener"
            className="link font-semibold"
            onClick={() => trackLead("whatsapp", { form_source: `${source}_thanks` })}
          >
            Message us on WhatsApp
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          . Nothing in your inbox tomorrow? Check spam.
        </p>
      </div>
    );
  }

  if (status.kind === "fallback") {
    return (
      <div className="card glass p-6 sm:p-8" role="status">
        <h3 ref={doneRef} tabIndex={-1} className="t-h3 outline-none">
          One more click
        </h3>
        <p className="mt-3 text-muted">
          Our form couldn’t send this right now. Your message is ready in an email. Press the button and hit send.
        </p>
        <a
          href={status.href}
          className="btn btn-brand mt-6"
          onClick={() => trackLead(isCheck ? "free_check_form" : "project_form", { form_source: `${source}_mailto` })}
        >
          Open it in my email app
        </a>
        <p className="mt-4 text-sm text-muted">
          Or write to <span className="text-white">{site.email}</span> directly.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="card glass relative scroll-mt-24 p-5 sm:p-7"
    >
      {allowModeSwitch ? (
        <fieldset className="mb-6">
          <legend className="sr-only">What can we help with?</legend>
          <div className="grid grid-cols-2 gap-1 rounded-full border border-line bg-white/[0.03] p-1">
            {modes.map((m) => (
              <label
                key={m.id}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full px-1.5 text-center text-[0.8125rem] font-semibold whitespace-nowrap sm:px-2 sm:text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-violet-soft ${
                  mode === m.id ? "bg-white text-bg" : "text-muted hover:text-fg"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={m.id}
                  checked={mode === m.id}
                  onChange={() => setMode(m.id)}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${uid}-name`}>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className="field"
          />
        </Field>
        <Field label="Email" htmlFor={`${uid}-email`}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="field"
          />
        </Field>
        <Field
          label={isCheck ? "Website address" : "Current website"}
          optional={!isCheck}
          htmlFor={`${uid}-website`}
          className="sm:col-span-2"
        >
          <input
            id={`${uid}-website`}
            name="website"
            type="text"
            inputMode="url"
            required={isCheck}
            maxLength={200}
            autoComplete="url"
            placeholder="yourstore.com"
            className="field"
          />
        </Field>

        {estimate ? (
          <div className="sm:col-span-2">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold">Your estimate (included)</p>
              <button type="button" className="text-sm text-muted underline" onClick={() => setEstimate("")}>
                Remove
              </button>
            </div>
            <pre className="mt-2 max-h-48 overflow-auto rounded-xl border border-line bg-white/[0.03] p-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted">
              {estimate}
            </pre>
          </div>
        ) : null}

        <Field
          label={isCheck ? "What’s wrong?" : "Tell us about the project"}
          optional={isCheck || Boolean(estimate)}
          htmlFor={`${uid}-message`}
          className="sm:col-span-2"
        >
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            required={!isCheck && !estimate}
            maxLength={4000}
            placeholder={
              isCheck
                ? "e.g. Checkout is slow on mobile, or orders stay “Pending payment”. Leave blank and we’ll look at everything."
                : projectPlaceholder
            }
            className="field resize-y"
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="mt-4 rounded-md border border-[#ff8a8a]/40 bg-[#ff8a8a]/10 p-3 text-sm text-[#ffc2c2]">
          {status.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-brand w-full sm:w-auto" disabled={sending} aria-disabled={sending}>
          {sending ? "Sending…" : isCheck ? "Send me 3 fixes" : "Send"}
        </button>
        <p className="text-sm text-muted">
          {isCheck ? "Free. No sales call. Reply within 24 hours." : "Reply within 24 hours with questions or a quote."}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional ? <span className="font-medium text-muted"> (optional)</span> : null}
      </label>
      {children}
    </div>
  );
}

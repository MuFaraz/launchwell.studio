"use client";

import { useMemo, useState } from "react";
import {
  estimatorServices,
  launchOffer,
  urgencyOptions,
  type EstimatorOption,
  type EstimatorService,
} from "@/config/pricing";
import { dayRange, usd } from "@/lib/format";
import { trackLead } from "@/lib/track";
import { ESTIMATE_EVENT, type EstimateEventDetail } from "@/lib/events";

type Answers = Record<string, string | string[]>;

function defaultAnswers(service: EstimatorService): Answers {
  return Object.fromEntries(
    service.questions.map((q) => [q.id, q.type === "single" ? q.options[0].id : []]),
  );
}

function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

function selectedOptions(service: EstimatorService, answers: Answers) {
  return service.questions.map((q) => {
    const value = answers[q.id];
    const ids = Array.isArray(value) ? value : [value];
    return { question: q, options: q.options.filter((o) => ids.includes(o.id)) };
  });
}

function calculate(service: EstimatorService, answers: Answers, urgencyId: string) {
  const urgency = urgencyOptions.find((u) => u.id === urgencyId) ?? urgencyOptions[0];
  let [pMin, pMax] = service.base.price;
  let [dMin, dMax] = service.base.days;
  let monthly = 0;

  for (const { options } of selectedOptions(service, answers)) {
    for (const o of options) {
      pMin += o.price?.[0] ?? 0;
      pMax += o.price?.[1] ?? 0;
      dMin += o.days?.[0] ?? 0;
      dMax += o.days?.[1] ?? 0;
      monthly += o.monthly ?? 0;
    }
  }

  // Round to tidy numbers without moving the "from" price (e.g. $25 stays $25).
  const step = pMax < 300 ? 5 : pMax < 1000 ? 10 : 50;
  return {
    min: roundTo(pMin * urgency.priceFactor, step),
    max: roundTo(pMax * urgency.priceFactor, step),
    daysMin: Math.max(1, Math.round(dMin * urgency.daysFactor)),
    daysMax: Math.max(1, Math.round(dMax * urgency.daysFactor)),
    monthly,
    urgency,
  };
}

export function Estimator() {
  const [serviceId, setServiceId] = useState(estimatorServices[0].id);
  const service = estimatorServices.find((s) => s.id === serviceId) ?? estimatorServices[0];
  const [answers, setAnswers] = useState<Answers>(() => defaultAnswers(estimatorServices[0]));
  const [urgencyId, setUrgencyId] = useState<string>(urgencyOptions[0].id);

  const result = useMemo(() => calculate(service, answers, urgencyId), [service, answers, urgencyId]);
  const timeline = dayRange(result.daysMin, result.daysMax);

  function pickService(id: string) {
    const next = estimatorServices.find((s) => s.id === id);
    if (!next) return;
    setServiceId(id);
    setAnswers(defaultAnswers(next));
  }

  function setSingle(qid: string, oid: string) {
    setAnswers((a) => ({ ...a, [qid]: oid }));
  }

  function toggleMulti(qid: string, oid: string) {
    setAnswers((a) => {
      const current = Array.isArray(a[qid]) ? (a[qid] as string[]) : [];
      return { ...a, [qid]: current.includes(oid) ? current.filter((x) => x !== oid) : [...current, oid] };
    });
  }

  function sendEstimate() {
    const lines = selectedOptions(service, answers)
      .filter(({ options }) => options.length)
      .map(
        ({ question, options }) =>
          `- ${question.label.replace(/[?…]+$/, "")}: ${options.map((o) => o.label).join(", ")}`,
      );
    const text = [
      "Estimate from the website",
      `Service: ${service.label}`,
      ...lines,
      `- Timeline: ${result.urgency.label}`,
      `Range: ${usd(result.min)}–${usd(result.max)}${result.monthly ? ` + ${usd(result.monthly)}/month` : ""}, about ${timeline}`,
    ].join("\n");

    trackLead("estimator", { service: service.label, value: result.min, currency: "USD" });
    window.dispatchEvent(
      new CustomEvent<EstimateEventDetail>(ESTIMATE_EVENT, { detail: { service: service.label, text } }),
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-9 lg:col-span-7">
        <fieldset>
          <legend className="mb-4 text-lg font-extrabold">
            <span className="mr-2 text-brand">1</span>What do you need?
          </legend>
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
            {estimatorServices.map((s) => {
              const active = s.id === serviceId;
              return (
                <label
                  key={s.id}
                  className={`relative flex cursor-pointer flex-col rounded-md border p-3 pr-6 transition-colors sm:p-3.5 sm:pr-7 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
                    active ? "border-brand bg-brand/10" : "border-ink-line hover:border-[#3a4664]"
                  }`}
                >
                  <input
                    type="radio"
                    name="est-service"
                    value={s.id}
                    checked={active}
                    onChange={() => pickService(s.id)}
                    className="sr-only"
                  />
                  <span className="leading-snug font-bold">{s.label}</span>
                  <span className="mt-0.5 hidden text-sm text-on-ink-muted sm:block">{s.short}</span>
                  {active ? (
                    <span aria-hidden="true" className="absolute top-3 right-3 h-2 w-2 rounded-full bg-brand" />
                  ) : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-7">
          <p className="text-lg font-extrabold">
            <span className="mr-2 text-brand">2</span>A few details
          </p>
          {service.questions.map((q) => (
            <fieldset key={`${service.id}-${q.id}`}>
              <legend className="mb-2.5 text-sm font-bold text-on-ink-muted">
                {q.label}
                {q.type === "multi" ? <span className="font-medium"> (pick any)</span> : null}
              </legend>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const value = answers[q.id];
                  const checked = Array.isArray(value) ? value.includes(o.id) : value === o.id;
                  return (
                    <Chip
                      key={o.id}
                      option={o}
                      type={q.type === "single" ? "radio" : "checkbox"}
                      name={`est-${service.id}-${q.id}`}
                      checked={checked}
                      onChange={() => (q.type === "single" ? setSingle(q.id, o.id) : toggleMulti(q.id, o.id))}
                    />
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <fieldset>
          <legend className="mb-2.5 text-lg font-extrabold">
            <span className="mr-2 text-brand">3</span>How soon?
          </legend>
          <div className="flex flex-wrap gap-2">
            {urgencyOptions.map((u) => (
              <Chip
                key={u.id}
                option={u}
                type="radio"
                name="est-urgency"
                checked={u.id === urgencyId}
                onChange={() => setUrgencyId(u.id)}
              />
            ))}
          </div>
        </fieldset>

        {/* Mobile/tablet: keep the running total in view while picking options. */}
        <div aria-hidden="true" data-estimate-bar className="sticky bottom-3 z-10 lg:hidden">
          <div className="flex items-center justify-between gap-3 rounded-md border border-brand/40 bg-ink-2 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <span className="text-sm text-on-ink-muted">Estimate</span>
            <span className="text-right">
              <span className="block font-extrabold tabular-nums">
                {usd(result.min)}–{usd(result.max)}
                {result.monthly ? <span className="text-brand"> + {usd(result.monthly)}/mo</span> : null}
              </span>
              <span className="block text-xs text-on-ink-muted">About {timeline}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-lg border border-ink-line bg-ink-2 p-6 sm:p-7 lg:sticky lg:top-24">
          <p className="eyebrow text-on-ink-muted">Your estimate</p>
          <p className="mt-1 text-sm text-on-ink-muted">{service.label}</p>
          <output aria-live="polite" className="mt-4 block">
            <span className="block text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-extrabold tracking-tight tabular-nums">
              {usd(result.min)}–{usd(result.max)}
            </span>
            {result.monthly ? (
              <span className="mt-2 block font-bold text-brand">+ {usd(result.monthly)}/month care plan</span>
            ) : null}
            <span className="mt-3 block text-on-ink-muted">
              About <strong className="font-bold text-white">{timeline}</strong>
              {result.urgency.id !== "standard" ? " (subject to availability)" : ""}
            </span>
          </output>

          {launchOffer.enabled ? (
            <p className="mt-5 flex items-start gap-2 rounded-md border border-brand/40 bg-brand/10 px-3 py-2.5 text-sm font-bold text-white">
              <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>
                {launchOffer.text} <span className="font-medium text-on-ink-muted">Taken off your final quote.</span>
              </span>
            </p>
          ) : null}

          {service.note ? <p className="mt-5 border-t border-ink-line pt-4 text-sm text-on-ink-muted">{service.note}</p> : null}

          <button type="button" onClick={sendEstimate} className="btn btn-brand mt-6 w-full">
            Send me this estimate
          </button>
          <p className="mt-3 text-sm leading-relaxed text-on-ink-muted">
            This is a range, not a quote. Send it over with a few details and you’ll get a fixed price within 24
            hours.
          </p>
        </div>
      </div>
    </div>
  );
}

function Chip({
  option,
  type,
  name,
  checked,
  onChange,
}: {
  option: Pick<EstimatorOption, "id" | "label" | "hint">;
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`inline-flex min-h-11 cursor-pointer flex-col justify-center rounded-md border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
        checked ? "border-white bg-white text-ink" : "border-ink-line text-white hover:border-[#3a4664]"
      }`}
    >
      <input type={type} name={name} value={option.id} checked={checked} onChange={onChange} className="sr-only" />
      <span className="font-bold">
        {type === "checkbox" ? (
          <span aria-hidden="true" className="mr-1.5 inline-block w-3">
            {checked ? "✓" : "+"}
          </span>
        ) : null}
        {option.label}
      </span>
      {option.hint ? (
        <span className={`text-xs ${checked ? "text-muted" : "text-on-ink-muted"}`}>{option.hint}</span>
      ) : null}
    </label>
  );
}

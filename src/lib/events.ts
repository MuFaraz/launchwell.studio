// Window event the estimator fires to hand its result to the lead form.
export const ESTIMATE_EVENT = "lw:estimate";
export type EstimateEventDetail = { service: string; text: string };

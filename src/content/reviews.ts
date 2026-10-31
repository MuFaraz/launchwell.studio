// Excerpts from real Fiverr reviews (some shortened). Do not add reviews that are not on Fiverr.

export type Review = {
  quote: string;
  translation?: string;
  name: string;
  country: string;
  project: string;
  detail?: string;
};

export const reviews: Review[] = [
  {
    quote:
      "He doesn’t just do what you ask — he thinks ahead, solves problems, and delivers a complete solution. From the payment button, test product setup, to confirmation email — everything was done perfectly, cleanly coded, and well organized.",
    name: "maya_hannah8",
    country: "United Kingdom",
    project: "Stripe + Laravel integration",
    detail: "Delivered in 1 day",
  },
  {
    quote:
      "One of the most skilled and dependable programmers I’ve ever hired. He’s proactive, often identifying and fixing issues before I even notice them. Deadlines are always met (often ahead of time).",
    name: "hamisi_shongodo",
    country: "Kenya",
    project: "Web development",
    detail: "Repeat client · 3 projects",
  },
  {
    quote:
      "His coding proficiency is evident in the clean, well-structured, and maintainable source code he has consistently delivered.",
    name: "hamisi_shongodo",
    country: "Kenya",
    project: "Web development",
    detail: "Repeat client",
  },
  {
    quote: "Ottimo lavoro",
    translation: "Great work",
    name: "hureax",
    country: "Italy",
    project: "Web development",
    detail: "Repeat client",
  },
];

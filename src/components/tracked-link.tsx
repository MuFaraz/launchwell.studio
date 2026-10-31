"use client";

import type { ComponentProps } from "react";
import { trackLead, type LeadSource } from "@/lib/track";

// A plain <a> that reports a lead (WhatsApp / email clicks) before following the link.
export function TrackedLink({
  lead,
  onClick,
  ...props
}: ComponentProps<"a"> & { lead: LeadSource }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackLead(lead, { link_url: props.href ?? "" });
        onClick?.(e);
      }}
    />
  );
}

import { site } from "@/config/site";
import { IconCalendar } from "./icons";
import { TrackedLink } from "./tracked-link";

// "Book a 15-min call". Renders nothing until NEXT_PUBLIC_CALENDLY_URL is set.
export function CallButton({ className = "btn btn-ghost-ink" }: { className?: string }) {
  if (!site.calendly) return null;
  return (
    <TrackedLink lead="call" href={site.calendly} target="_blank" rel="noopener" className={className}>
      <IconCalendar />
      Book a 15-min call
    </TrackedLink>
  );
}

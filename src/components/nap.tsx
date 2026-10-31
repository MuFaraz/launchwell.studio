import { napLine, site } from "@/config/site";

// One consistent business line: name · city · reach · email · phone.
export function Nap({ className = "" }: { className?: string }) {
  const [name, place, reach] = napLine;
  return (
    <p className={className}>
      <span>{name}</span>
      <span aria-hidden="true"> · </span>
      <span>{place}</span>
      <span aria-hidden="true"> · </span>
      <span>{reach}</span>
      <span aria-hidden="true"> · </span>
      <a href={`mailto:${site.email}`} className="link-quiet">
        {site.email}
      </a>
      <span aria-hidden="true"> · </span>
      <a href={`tel:+${site.whatsappNumber}`} className="link-quiet whitespace-nowrap">
        {site.whatsappDisplay}
      </a>
    </p>
  );
}

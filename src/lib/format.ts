export function usd(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function pkr(n: number) {
  return `PKR ${Math.round(n).toLocaleString("en-US")}`;
}

export function dayRange(min: number, max: number) {
  if (max <= 1) return "1 day";
  if (max <= 14) return min === max ? `${max} days` : `${min}–${max} days`;
  const wMin = Math.max(1, Math.round(min / 5));
  const wMax = Math.max(wMin, Math.round(max / 5));
  return wMin === wMax ? `${wMax} weeks` : `${wMin}–${wMax} weeks`;
}

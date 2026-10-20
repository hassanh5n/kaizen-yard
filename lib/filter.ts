import type { Car } from "./cars";

export type Filters = {
  q?: string;
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number; // JMD
  priceMax?: number; // JMD
  body?: string[];
  status?: string[];
  kmMax?: number;
  engine?: "small" | "mid" | "large";
  transmission?: string[];
};

export type Sort = "recommended" | "price-asc" | "price-desc" | "year-desc" | "km-asc";

// Budget steps stored in JMD; the USD label is what buyers quoting dollars expect to see.
export const budgets = [
  { jmd: 1100000, usd: "$7,000" },
  { jmd: 1250000, usd: "$8,000" },
  { jmd: 1400000, usd: "$9,000" },
  { jmd: 1600000, usd: "$10,000" },
  { jmd: 1900000, usd: "$12,000" },
  { jmd: 2400000, usd: "$15,000" },
];

export const engines = {
  small: { label: "Up to 1,300 cc", test: (cc: number) => cc <= 1300 },
  mid: { label: "1,301 – 1,500 cc", test: (cc: number) => cc > 1300 && cc <= 1500 },
  large: { label: "Over 1,500 cc", test: (cc: number) => cc > 1500 },
};

export function applyFilters(list: Car[], f: Filters, sort: Sort = "recommended"): Car[] {
  const q = f.q?.trim().toLowerCase();
  const out = list.filter(
    (c) =>
      (!q || `${c.year} ${c.make} ${c.model} ${c.variant} ${c.body} ${c.stock} ${c.chassis}`.toLowerCase().includes(q)) &&
      (!f.make || c.make === f.make) &&
      (!f.model || c.model === f.model) &&
      (!f.yearMin || c.year >= f.yearMin) &&
      (!f.yearMax || c.year <= f.yearMax) &&
      (!f.priceMin || c.jmd >= f.priceMin) &&
      (!f.priceMax || c.jmd <= f.priceMax) &&
      (!f.body?.length || f.body.includes(c.body)) &&
      (!f.status?.length || f.status.includes(c.status)) &&
      (!f.kmMax || c.km <= f.kmMax) &&
      (!f.engine || engines[f.engine].test(c.cc)) &&
      (!f.transmission?.length || f.transmission.includes(c.transmission))
  );
  const by: Record<Sort, (a: Car, b: Car) => number> = {
    recommended: (a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!b.isNew) - Number(!!a.isNew),
    "price-asc": (a, b) => a.jmd - b.jmd,
    "price-desc": (a, b) => b.jmd - a.jmd,
    "year-desc": (a, b) => b.year - a.year || a.km - b.km,
    "km-asc": (a, b) => a.km - b.km,
  };
  return out.sort(by[sort]);
}

const nums = ["yearMin", "yearMax", "priceMin", "priceMax", "kmMax"] as const;
const lists = ["body", "status", "transmission"] as const;

export function parseFilters(p: URLSearchParams): Filters {
  const f: Filters = {};
  for (const k of ["q", "make", "model"] as const) if (p.get(k)) f[k] = p.get(k)!;
  for (const k of nums) if (Number(p.get(k))) f[k] = Number(p.get(k));
  for (const k of lists) if (p.get(k)) f[k] = p.get(k)!.split(",");
  const e = p.get("engine");
  if (e === "small" || e === "mid" || e === "large") f.engine = e;
  return f;
}

export function toParams(f: Filters, sort: Sort): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) {
    if (Array.isArray(v) ? v.length : v) p.set(k, Array.isArray(v) ? v.join(",") : String(v));
  }
  if (sort !== "recommended") p.set("sort", sort);
  return p.toString();
}

export const activeCount = (f: Filters) =>
  Object.entries(f).filter(([k, v]) => k !== "q" && (Array.isArray(v) ? v.length : v)).length;

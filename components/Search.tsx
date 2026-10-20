"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { cars, statusLabel, type Status } from "@/lib/cars";
import { activeCount, applyFilters, budgets, engines, parseFilters, toParams, type Filters, type Sort } from "@/lib/filter";
import { waLink } from "@/lib/site";
import { CarCard } from "./CarCard";
import { useSite } from "./Providers";
import { WhatsAppIcon } from "./Icons";

const makes = ["Toyota", "Honda", "Nissan", "Mazda"];
const bodies = ["Sedan", "Hatchback", "SUV", "Wagon"];
const years = [...new Set(cars.map((c) => c.year))].sort((a, b) => b - a);
const modelsFor = (make?: string) => [...new Set(cars.filter((c) => !make || c.make === make).map((c) => c.model))].sort();

function BudgetOptions() {
  const { currency } = useSite();
  return (
    <>
      {budgets.map((b) => (
        <option key={b.jmd} value={b.jmd}>
          {currency === "JMD" ? `$${(b.jmd / 1e6).toFixed(2).replace(/0$/, "")}M JMD` : `${b.usd} USD`}
        </option>
      ))}
    </>
  );
}

/* Home page quick search. A plain GET form: works before JS loads, lands on /inventory with the query. */
export function QuickSearch() {
  const [make, setMake] = useState("");
  return (
    <form
      className="qs"
      action="/inventory/"
      method="get"
      role="search"
      aria-label="Quick search"
      onSubmit={(e) => e.currentTarget.querySelectorAll("select").forEach((s) => (s.disabled = !s.value))}
      onFocus={(e) => e.currentTarget.querySelectorAll("select").forEach((s) => (s.disabled = false))}
    >
      <label className="field">
        <span>Make</span>
        <select name="make" value={make} onChange={(e) => setMake(e.target.value)}>
          <option value="">Any make</option>
          {makes.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Model</span>
        <select name="model" key={make}>
          <option value="">Any model</option>
          {modelsFor(make || undefined).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Year from</span>
        <select name="yearMin">
          <option value="">Any year</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Budget up to</span>
        <select name="priceMax">
          <option value="">Any budget</option>
          <BudgetOptions />
        </select>
      </label>
      <label className="field">
        <span>Body type</span>
        <select name="body">
          <option value="">Any body</option>
          {bodies.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <button className="btn btn--primary qs__go" type="submit">
        <Search size={18} aria-hidden="true" /> Search cars
      </button>
    </form>
  );
}

/* Mobile-only sticky search strip. */
export function StickySearch() {
  return (
    <form className="msearch" action="/inventory/" method="get" role="search" aria-label="Search cars">
      <label className="msearch__box">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Search make, model or stock number</span>
        <input name="q" type="search" placeholder="Vitz, Fit, Probox, KY-24081…" enterKeyHint="search" />
      </label>
      <a className="btn btn--dark btn--sm" href="/inventory/?filters=open">
        <SlidersHorizontal size={18} aria-hidden="true" /> Filters
      </a>
    </form>
  );
}

function toggle(list: string[] | undefined, v: string) {
  const s = new Set(list);
  s.has(v) ? s.delete(v) : s.add(v);
  return [...s];
}

function FilterPanel({ f, set }: { f: Filters; set: (patch: Partial<Filters>) => void }) {
  const chip = (key: "body" | "status" | "transmission", v: string, label = v) => (
    <label className="chip" key={v}>
      <input type="checkbox" checked={!!f[key]?.includes(v)} onChange={() => set({ [key]: toggle(f[key], v) })} />
      <span>{label}</span>
    </label>
  );
  const sel = (name: keyof Filters, label: string, options: React.ReactNode, any: string) => (
    <label className="field">
      <span>{label}</span>
      <select
        value={(f[name] as string | number | undefined) ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          set({ [name]: v === "" ? undefined : /^\d+$/.test(v) ? Number(v) : v, ...(name === "make" ? { model: undefined } : {}) });
        }}
      >
        <option value="">{any}</option>
        {options}
      </select>
    </label>
  );

  return (
    <div className="fpanel">
      <fieldset className="fgroup">
        <legend>Vehicle</legend>
        {sel("make", "Make", makes.map((m) => <option key={m}>{m}</option>), "Any make")}
        {sel("model", "Model", modelsFor(f.make).map((m) => <option key={m}>{m}</option>), "Any model")}
        <div className="form__row">
          {sel("yearMin", "Year from", years.slice().reverse().map((y) => <option key={y}>{y}</option>), "Any")}
          {sel("yearMax", "Year to", years.map((y) => <option key={y}>{y}</option>), "Any")}
        </div>
      </fieldset>

      <fieldset className="fgroup">
        <legend>Price</legend>
        <div className="form__row">
          {sel("priceMin", "From", <BudgetOptions />, "No min")}
          {sel("priceMax", "Up to", <BudgetOptions />, "No max")}
        </div>
      </fieldset>

      <fieldset className="fgroup">
        <legend>Body type</legend>
        <div className="chips">{bodies.map((b) => chip("body", b))}</div>
      </fieldset>

      <fieldset className="fgroup">
        <legend>Availability</legend>
        <div className="chips chips--stack">
          {(Object.keys(statusLabel) as Status[]).map((s) => chip("status", s, statusLabel[s]))}
        </div>
      </fieldset>

      <fieldset className="fgroup">
        <legend>Japanese spec</legend>
        {sel(
          "kmMax",
          "Mileage",
          [40000, 60000, 80000, 100000].map((k) => <option key={k} value={k}>Under {k.toLocaleString("en-JM")} km</option>),
          "Any mileage"
        )}
        {sel(
          "engine",
          "Engine size",
          Object.entries(engines).map(([k, e]) => <option key={k} value={k}>{e.label}</option>),
          "Any engine"
        )}
        <div className="field">
          <span>Transmission</span>
          <div className="chips">{["CVT", "Automatic"].map((t) => chip("transmission", t))}</div>
        </div>
        <label className="chip chip--fixed">
          <input type="checkbox" checked readOnly disabled />
          <span>Right-hand drive</span>
          <small>Every car we import is RHD, built for Jamaican roads.</small>
        </label>
      </fieldset>
    </div>
  );
}

export function InventoryView() {
  const params = useSearchParams();
  const router = useRouter();
  const sheet = useRef<HTMLDialogElement>(null);
  const f = useMemo(() => parseFilters(params), [params]);
  const sort = (params.get("sort") as Sort) || "recommended";
  const results = useMemo(() => applyFilters(cars, f, sort), [f, sort]);
  const count = activeCount(f);

  const push = (next: Filters, s: Sort = sort) => {
    const qs = toParams(next, s);
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };
  const set = (patch: Partial<Filters>) => push({ ...f, ...patch });
  const reset = () => push({ q: f.q });

  useEffect(() => {
    if (params.get("filters") === "open") sheet.current?.showModal();
  }, [params]);

  const summary = `${results.length} ${results.length === 1 ? "car" : "cars"}`;

  return (
    <div className="inv">
      <aside className="inv__side" aria-label="Filters">
        <div className="inv__sidehead">
          <h2>Filter</h2>
          {count > 0 && (
            <button className="link-btn" onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          )}
        </div>
        <FilterPanel f={f} set={set} />
      </aside>

      <div className="inv__main">
        <div className="inv__bar">
          <label className="msearch__box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search make, model or stock number</span>
            <input
              type="search"
              placeholder="Search make, model or stock no…"
              defaultValue={f.q}
              onChange={(e) => set({ q: e.target.value || undefined })}
            />
          </label>
          <button className="btn btn--dark btn--sm inv__filterbtn" onClick={() => sheet.current?.showModal()}>
            <SlidersHorizontal size={18} aria-hidden="true" /> Filters{count > 0 && <b className="count">{count}</b>}
          </button>
        </div>

        <div className="inv__head">
          <p className="inv__count" aria-live="polite">
            <strong>{summary}</strong> {count > 0 || f.q ? "match your search" : "in stock and on the water"}
          </p>
          <label className="sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => push(f, e.target.value as Sort)}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="year-desc">Year: newest first</option>
              <option value="km-asc">Mileage: lowest first</option>
            </select>
          </label>
        </div>

        {results.length ? (
          <div className="grid">
            {results.map((c, i) => (
              <CarCard key={c.slug} car={c} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>Nothing matches those filters yet</h3>
            <p>Loosen a filter, or tell us what you want. We bid at Japanese auctions every week and can source it for you.</p>
            <div className="empty__actions">
              <button className="btn btn--ghost" onClick={reset}>
                <RotateCcw size={18} aria-hidden="true" /> Clear filters
              </button>
              <a className="btn btn--wa" href={waLink("Hi Kaizen Yard, can you source a car for me? I'm looking for: ")} target="_blank" rel="noopener">
                <WhatsAppIcon /> Ask us to source one
              </a>
            </div>
          </div>
        )}
      </div>

      <dialog ref={sheet} className="sheet sheet--filters" aria-labelledby="f-title" onClose={() => params.get("filters") && push(f)}>
        <div className="sheet__head">
          <h2 id="f-title">Filters</h2>
          <form method="dialog">
            <button className="icon-btn" aria-label="Close filters">
              <X size={20} aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="sheet__body">
          <FilterPanel f={f} set={set} />
        </div>
        <div className="sheet__foot">
          <button className="btn btn--ghost" onClick={reset} disabled={!count}>
            Reset
          </button>
          <form method="dialog">
            <button className="btn btn--primary btn--block">Show {summary}</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

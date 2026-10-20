"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, X } from "lucide-react";
import { cars, statusLabel, type Car } from "@/lib/cars";
import { carTitle, site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

type Currency = "JMD" | "USD";
type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  openTestDrive: (car?: Car) => void;
};

const SiteCtx = createContext<Ctx | null>(null);
export const useSite = () => {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error("useSite outside <Providers>");
  return ctx;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("JMD");
  const [car, setCar] = useState<Car | undefined>();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ky-currency");
      if (saved === "USD" || saved === "JMD") setCurrencyState(saved);
    } catch {}
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("ky-currency", c);
    } catch {}
  }, []);

  const openTestDrive = useCallback((c?: Car) => {
    setCar(c);
    dialog.current?.showModal();
  }, []);

  return (
    <SiteCtx.Provider value={{ currency, setCurrency, openTestDrive }}>
      {children}
      <TestDriveDialog ref={dialog} car={car} />
    </SiteCtx.Provider>
  );
}

export function Price({ car, size = "md" }: { car: Car; size?: "md" | "lg" }) {
  const { currency } = useSite();
  const nf = new Intl.NumberFormat("en-JM");
  const main = currency === "JMD" ? car.jmd : car.usd;
  const alt = currency === "JMD" ? `≈ USD $${nf.format(car.usd)}` : `JMD $${nf.format(car.jmd)}`;
  return (
    <p className={`price price--${size}`}>
      <span className="price__cur">{currency}</span>
      <span className="price__main">${nf.format(main)}</span>
      <span className="price__alt">{alt}</span>
    </p>
  );
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useSite();
  return (
    <div className="seg" role="group" aria-label="Show prices in">
      {(["JMD", "USD"] as const).map((c) => (
        <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

export function TestDriveButton({ car, className = "btn btn--ghost" }: { car?: Car; className?: string }) {
  const { openTestDrive } = useSite();
  return (
    <button type="button" className={className} onClick={() => openTestDrive(car)}>
      <CalendarCheck size={18} aria-hidden="true" />
      <span className="btn__label">Book a test drive</span>
    </button>
  );
}

type Errors = Partial<Record<"name" | "phone" | "date", string>>;

function TestDriveDialog({ car, ref }: { car?: Car; ref: React.RefObject<HTMLDialogElement | null> }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  // Local calendar date (Jamaica is UTC-5), set after mount so server and client HTML match.
  const localToday = () => new Date().toLocaleDateString("en-CA");
  const [today, setToday] = useState("");
  useEffect(() => setToday(localToday()), []);

  const reset = () => {
    setErrors({});
    setDone(null);
  };

  const validate = (f: FormData): Errors => {
    const e: Errors = {}; // insertion order = visual order, so focus lands on the first error shown
    const d = String(f.get("date"));
    if (!d) e.date = "Pick a day for your test drive.";
    else if (d < localToday()) e.date = "Pick today or a later date.";
    if (!String(f.get("name")).trim()) e.name = "Enter your name so we know who to expect.";
    const digits = String(f.get("phone")).replace(/\D/g, "");
    if (digits.length < 7) e.phone = "Enter a phone or WhatsApp number with at least 7 digits.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    const vehicle = cars.find((c) => c.slug === f.get("car"));
    const day = new Date(String(f.get("date")) + "T12:00").toLocaleDateString("en-JM", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setDone(
      [
        `Hi Kaizen Yard, I'd like to book a test drive.`,
        vehicle ? `Car: ${carTitle(vehicle)} ${vehicle.variant} (Stock ${vehicle.stock})` : `Car: not sure yet, please advise`,
        `Yard: ${f.get("yard")}`,
        `When: ${day}, ${f.get("time")}`,
        `Name: ${f.get("name")}`,
        `Phone: ${f.get("phone")}`,
        String(f.get("note")).trim() ? `Note: ${f.get("note")}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  };

  const field = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
  });

  return (
    <dialog ref={ref} className="sheet" aria-labelledby="td-title" onClose={reset}>
      <div className="sheet__head">
        <h2 id="td-title">{done ? "Request ready" : "Book a test drive"}</h2>
        <form method="dialog">
          <button className="icon-btn" aria-label="Close">
            <X size={20} aria-hidden="true" />
          </button>
        </form>
      </div>

      {done ? (
        <div className="sheet__body td-done">
          <span className="td-done__tick" aria-hidden="true">
            <Check size={28} strokeWidth={3} />
          </span>
          <p>Send your request on WhatsApp and we&apos;ll confirm your slot, usually within the hour during opening times.</p>
          <pre className="td-done__msg">{done}</pre>
          <a className="btn btn--wa btn--block" href={waLink(done)} target="_blank" rel="noopener">
            <WhatsAppIcon /> Send on WhatsApp
          </a>
          <form method="dialog">
            <button className="btn btn--ghost btn--block">Done</button>
          </form>
        </div>
      ) : (
        <form className="sheet__body form" onSubmit={onSubmit} noValidate key={car?.slug ?? "none"}>
          <label className="field">
            <span>Vehicle</span>
            <select name="car" defaultValue={car?.slug ?? ""}>
              <option value="">Not sure yet</option>
              {cars.map((c) => (
                <option key={c.slug} value={c.slug} disabled={c.status === "transit"}>
                  {carTitle(c)} · {c.stock}
                  {c.status === "transit" ? " (in transit)" : ""}
                </option>
              ))}
            </select>
          </label>
          {car?.status === "transit" && (
            <p className="note">
              This car is {statusLabel.transit.toLowerCase()} (ETA {car.eta}). Book now and we&apos;ll hold the first slot after it clears the wharf.
            </p>
          )}

          <fieldset className="field">
            <legend>Which yard?</legend>
            <div className="radios">
              {site.yards.map((y, i) => (
                <label key={y.id} className="radio">
                  <input type="radio" name="yard" value={y.name} defaultChecked={car?.status === "montego" ? y.id === "montego" : i === 0} />
                  <span>{y.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form__row">
            <label className="field">
              <span>Day</span>
              <input type="date" name="date" min={today || undefined} required {...field("date")} />
              {errors.date && <em id="date-err" className="field__err">{errors.date}</em>}
            </label>
            <label className="field">
              <span>Time</span>
              <select name="time" defaultValue="Morning (9 am – 12 pm)">
                <option>Morning (9 am – 12 pm)</option>
                <option>Afternoon (12 pm – 4 pm)</option>
              </select>
            </label>
          </div>

          <label className="field">
            <span>Your name</span>
            <input name="name" autoComplete="name" required {...field("name")} />
            {errors.name && <em id="name-err" className="field__err">{errors.name}</em>}
          </label>
          <label className="field">
            <span>Phone or WhatsApp</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="876 555 0123" required {...field("phone")} />
            {errors.phone && <em id="phone-err" className="field__err">{errors.phone}</em>}
          </label>
          <label className="field">
            <span>
              Anything we should know? <small>Optional</small>
            </span>
            <textarea name="note" rows={2} placeholder="Trade-in, financing, a second car to compare…" />
          </label>

          <button className="btn btn--primary btn--block" type="submit">
            <CalendarCheck size={18} aria-hidden="true" /> Request test drive
          </button>
        </form>
      )}
    </dialog>
  );
}

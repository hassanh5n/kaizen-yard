import Link from "next/link";
import { waLink } from "@/lib/site";

const steps = [
  {
    title: "Browse and pick your car",
    text: "Filter by budget, engine size and mileage. Every listing shows the auction grade, chassis number and whether it is in the yard or still on the water.",
    detail: ["Check the auction grade and km", "Compare in JMD or USD", "Save the stock number"],
    action: { href: "/inventory/", label: "Browse inventory" },
  },
  {
    title: "Reserve on WhatsApp or at the yard",
    text: "Send us the stock number on WhatsApp, or come to Hagley Park Road for a test drive. A refundable deposit holds the car for you for seven days.",
    detail: ["Ask for the full auction sheet", "Book a test drive", "Cars in transit can be pre-reserved"],
    action: { href: waLink("Hi Kaizen Yard, I'd like to reserve a car. Stock number: "), label: "Reserve on WhatsApp", external: true },
  },
  {
    title: "Complete the paperwork and drive away",
    text: "We handle registration, fitness and plates with the Island Traffic Authority and Tax Administration Jamaica. You sign, pay the balance and collect your keys.",
    detail: ["Bring your TRN and a valid ID", "Bank, credit union or cash", "Insurance cover note before collection"],
    action: { href: "/how-to-buy/", label: "What to bring" },
  },
];

export function Steps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`steps${compact ? " steps--compact" : ""}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step__n" aria-hidden="true">
            {i + 1}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {!compact && (
            <>
              <ul className="step__list">
                {s.detail.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {s.action.external ? (
                <a className="text-link" href={s.action.href} target="_blank" rel="noopener">
                  {s.action.label}
                </a>
              ) : (
                <Link className="text-link" href={s.action.href}>
                  {s.action.label}
                </Link>
              )}
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

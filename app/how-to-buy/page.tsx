import type { Metadata } from "next";
import { Steps } from "@/components/Steps";
import { WhatsAppIcon } from "@/components/Icons";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to buy",
  description: "Reserve a Japanese import in three steps: pick your car, reserve on WhatsApp or at the Kingston yard, then sign and drive away.",
};

const grades = [
  ["S / 6", "Brand new or under a year old, delivery mileage."],
  ["5", "Like new. Very low mileage, no visible marks."],
  ["4.5", "Excellent. Tiny marks only a trained inspector would find."],
  ["4", "Good. Light wear for its age and mileage, nothing that needs fixing."],
  ["3.5", "Fair. Visible scratches or dents; priced to match."],
  ["R / RA", "Repaired accident history. We don't import these."],
];

const faqs = [
  ["Are your prices the final price?", "Yes. The price on each listing already includes import duty, port charges, registration, fitness and plates. The only extra is your insurance."],
  ["Can I pay in US dollars?", "Yes. Pay in JMD or USD by bank transfer, manager's cheque or financing through your bank or credit union. We'll send a pro-forma invoice your lender can use."],
  ["How long does shipping from Japan take?", "Usually four to six weeks from auction to Kingston Wharves, plus about a week for customs clearance and inspection."],
  ["Can you find a car that isn't listed?", "Yes. Tell us the make, model, year range and budget on WhatsApp. We bid at the Japanese auctions every week and send you the auction sheet before we buy."],
  ["Do I need to come to the yard?", "Not until collection. You can reserve, see extra photos and video, and arrange financing on WhatsApp. Most buyers still like a test drive first."],
];

export default function HowToBuy() {
  return (
    <>
      <section className="phead">
        <div className="wrap">
          <h1>How to buy</h1>
          <p>No guesswork and no import paperwork on your side. You choose the car; we handle Japan, the wharf and the Jamaican registration.</p>
        </div>
      </section>

      <section className="wrap section">
        <Steps />
      </section>

      <section className="board-band">
        <div className="wrap section split">
          <div>
            <h2>What to bring on collection day</h2>
            <ul className="ticks ticks--plain">
              <li>Taxpayer Registration Number (TRN)</li>
              <li>Valid government ID: driver&apos;s licence, passport or national ID</li>
              <li>Proof of address dated within the last three months</li>
              <li>Insurance cover note in your name</li>
              <li>Balance payment or your lender&apos;s approval letter</li>
            </ul>
          </div>
          <div>
            <h2>Reading an auction grade</h2>
            <p className="section__sub">Japanese auction houses inspect every car before sale and give it an overall grade and an interior letter (A best, E worst).</p>
            <dl className="gradetable">
              {grades.map(([g, d]) => (
                <div key={g}>
                  <dt>{g}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap section narrow">
        <h2>Questions buyers ask</h2>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a className="btn btn--wa" href={waLink("Hi Kaizen Yard, I have a question about buying: ")} target="_blank" rel="noopener">
          <WhatsAppIcon /> Ask us anything on WhatsApp
        </a>
      </section>
    </>
  );
}

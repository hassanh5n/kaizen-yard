import type { Metadata } from "next";
import { Anchor, Ship } from "lucide-react";
import { cars, photoSrcSet, photoUrl } from "@/lib/cars";
import { waLink } from "@/lib/site";
import { CarCard } from "@/components/CarCard";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "New arrivals",
  description: "Japanese imports that landed at Kingston Wharves this week, and the ones still on the water.",
};

const SHIP = "a/a5/BYD_Hefei%2C_Porto_di_Livorno%2C_2025.jpg";

export default function NewArrivals() {
  const landed = cars.filter((c) => c.isNew && c.status !== "transit");
  const sailing = cars.filter((c) => c.status === "transit");

  return (
    <>
      <section className="phead phead--photo">
        <img src={photoUrl(SHIP, 1280)} srcSet={photoSrcSet(SHIP)} sizes="100vw" alt="" width={1280} height={800} fetchPriority="high" />
        <div className="wrap">
          <h1>New arrivals</h1>
          <p>Fresh stock lands at Kingston Wharves every few weeks. The best cars go within days, so check back often or get a WhatsApp message when the next ship docks.</p>
          <a className="btn btn--wa" href={waLink("Hi Kaizen Yard, please message me when new stock lands. I'm interested in: ")} target="_blank" rel="noopener">
            <WhatsAppIcon /> Alert me when stock lands
          </a>
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <div>
            <h2>
              <Anchor size={26} aria-hidden="true" /> Landed this week
            </h2>
            <p className="section__sub">Cleared customs and waiting in the yard. Test drives available today.</p>
          </div>
        </div>
        <div className="grid">
          {landed.map((c, i) => (
            <CarCard key={c.slug} car={c} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="board-band">
        <div className="wrap section">
          <div className="section__head">
            <div>
              <h2>
                <Ship size={26} aria-hidden="true" /> On the water
              </h2>
              <p className="section__sub">Shipped from Yokohama, arriving at Kingston Wharves soon. Reserve now with a refundable deposit and be first in line.</p>
            </div>
          </div>
          <div className="voyage" role="img" aria-label={`Next ship from Yokohama due at Kingston Wharves on ${sailing[0]?.eta}`}>
            <span>
              <b>Yokohama</b> Departed
            </span>
            <i aria-hidden="true">
              <Ship size={20} />
            </i>
            <span>
              <b>Kingston Wharves</b> ETA {sailing[0]?.eta}
            </span>
          </div>
          <div className="grid">
            {sailing.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Mail, Navigation, Phone } from "lucide-react";
import { mapDirections, mapEmbed, site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Visit our Kingston and Montego Bay yards, call, or chat on WhatsApp. Opening hours and directions.",
};

export default function Contact() {
  return (
    <>
      <section className="phead">
        <div className="wrap">
          <h1>Contact us</h1>
          <p>WhatsApp is the fastest way to reach us. We reply within the hour during opening times, and most evenings too.</p>
          <a className="btn btn--wa btn--lg" href={waLink("Hi Kaizen Yard, ")} target="_blank" rel="noopener">
            <WhatsAppIcon size={22} /> Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="wrap section yards">
        {site.yards.map((y) => (
          <article key={y.id} className="yard">
            <div className="yard__map">
              <iframe
                title={`Map of the ${y.name}`}
                src={mapEmbed(y.mapQuery)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="yard__info">
              <h2>{y.name}</h2>
              <p>{y.address}, Jamaica</p>
              <div className="yard__actions">
                <a className="btn btn--dark btn--sm" href={mapDirections(y.mapQuery)} target="_blank" rel="noopener">
                  <Navigation size={16} aria-hidden="true" /> Get directions
                </a>
                <a className="btn btn--ghost btn--sm" href={`tel:${y.phone.replace(/[^\d+]/g, "")}`}>
                  <Phone size={16} aria-hidden="true" /> {y.phone}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="board-band">
        <div className="wrap section split">
          <div>
            <h2>Opening hours</h2>
            <dl className="hours">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="section__sub">Both yards keep the same hours. Test drives run until an hour before closing.</p>
          </div>
          <div>
            <h2>Other ways to reach us</h2>
            <ul className="contact-list">
              <li>
                <a href={site.phoneHref}>
                  <Phone size={20} aria-hidden="true" />
                  <span>
                    <b>Call</b>
                    {site.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>
                  <Mail size={20} aria-hidden="true" />
                  <span>
                    <b>Email</b>
                    {site.email}
                  </span>
                </a>
              </li>
              <li>
                <a href={waLink("Hi Kaizen Yard, ")} target="_blank" rel="noopener">
                  <WhatsAppIcon />
                  <span>
                    <b>WhatsApp</b>
                    {site.phone}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

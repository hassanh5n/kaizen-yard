import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { nav, site, mapDirections, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <p className="footer__name">Kaizen Yard</p>
          <p>Japanese used car imports, auction-graded and sold from Kingston and Montego Bay.</p>
          <a className="btn btn--wa" href={waLink("Hi Kaizen Yard, I'm looking for a car.")} target="_blank" rel="noopener">
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>

        <div>
          <h2>Visit</h2>
          <ul className="footer__list">
            {site.yards.map((y) => (
              <li key={y.id}>
                <a href={mapDirections(y.mapQuery)} target="_blank" rel="noopener">
                  <MapPin size={16} aria-hidden="true" />
                  <span>
                    <b>{y.name}</b>
                    <br />
                    {y.address}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Opening hours</h2>
          <dl className="hours hours--dark">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2>Explore</h2>
          <ul className="footer__list footer__list--plain">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.phoneHref}>
                <Phone size={16} aria-hidden="true" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <Mail size={16} aria-hidden="true" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__legal">
        <p>
          Demo website. Listings, prices, auction grades, reviews and contact details are sample content. Vehicle photos from Wikimedia Commons, see{" "}
          <Link href="/credits/">photo credits</Link>.
        </p>
        <p>© {new Date().getFullYear()} Kaizen Yard</p>
      </div>
    </footer>
  );
}

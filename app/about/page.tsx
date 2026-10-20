import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { photoSrcSet, photoUrl } from "@/lib/cars";

export const metadata: Metadata = {
  title: "About us",
  description: "A Kingston family business importing quality used cars from Japan since 2011.",
};

const photos = [
  { path: "2/21/Toyota_Corolla_Axio_%28Jamaica%29.jpg", alt: "A Toyota Corolla Axio parked on a street in Jamaica", caption: "A Japanese-spec Axio at home on a Jamaican street." },
  { path: "6/6b/Street_in_Montigo_Bay_Jamaica_Photo_Don_Ramey_Logan.jpg", alt: "Busy street in Montego Bay", caption: "Montego Bay, home of our second yard." },
  { path: "a/a5/BYD_Hefei%2C_Porto_di_Livorno%2C_2025.jpg", alt: "Roll-on roll-off car carrier ship in port", caption: "Every car crosses on a roll-on, roll-off carrier." },
];

const reviews = [
  { name: "Sample review", where: "Portmore", text: "They sent me the auction sheet and a walkaround video before I even left work. Picked up my Fit on Saturday, exactly as described." },
  { name: "Sample review", where: "Mandeville", text: "Bought a Probox for the business. Paperwork done in a week, and they explained every fee upfront. Second car I've bought here." },
  { name: "Sample review", where: "Montego Bay", text: "Reserved my Vezel while it was still on the ship. Got WhatsApp updates until it cleared the wharf. Easy." },
];

export default function About() {
  return (
    <>
      <section className="phead">
        <div className="wrap">
          <h1>About Kaizen Yard</h1>
          <p>Kaizen is Japanese for steady improvement. It&apos;s how we run the yard: small, careful choices that add up to cars you can trust.</p>
        </div>
      </section>

      <section className="wrap section split split--story">
        <div className="prose">
          <h2>Fifteen years between Tokyo and Kingston</h2>
          <p>
            We started in 2011 with three cars and a borrowed lot on Hagley Park Road. Today we import a few hundred cars a year, still chosen one at a time from the
            auction houses in Tokyo, Nagoya and Osaka.
          </p>
          <p>
            Our buyer in Japan reads every auction sheet before we bid. We pass on anything with repaired-accident history, flood marks or a grade below 3.5, and we
            send you the same sheet we bought from, translated into plain English.
          </p>
          <p>
            Once a car lands at Kingston Wharves our team clears customs, services it, and gets it registered and plated. When you collect it, it&apos;s ready for
            Jamaican roads.
          </p>
        </div>
        <ul className="facts">
          <li>
            <b>Since 2011</b> importing from Japan
          </li>
          <li>
            <b>3.5 and up</b> minimum auction grade we buy
          </li>
          <li>
            <b>2 yards</b> in Kingston and Montego Bay
          </li>
        </ul>
      </section>

      <section className="wrap gallery-strip" aria-label="Photos">
        {photos.map((p) => (
          <figure key={p.path}>
            <img src={photoUrl(p.path, 960)} srcSet={photoSrcSet(p.path)} sizes="(min-width: 900px) 33vw, 90vw" alt={p.alt} width={960} height={640} loading="lazy" />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </section>
      <p className="wrap demo-note">Demo: replace these with photos of your own yard and showroom.</p>

      <section className="board-band">
        <div className="wrap section">
          <div className="section__head">
            <div>
              <h2>What buyers say</h2>
              <p className="section__sub">Sample reviews for the demo. Connect your Google Business Profile to show real ones here.</p>
            </div>
          </div>
          <div className="reviews">
            {reviews.map((r) => (
              <figure key={r.where} className="review">
                <div className="review__stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={18} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  {r.name}, {r.where}
                </figcaption>
              </figure>
            ))}
          </div>
          <Link className="btn btn--gold" href="/inventory/">
            Find your car
          </Link>
        </div>
      </section>
    </>
  );
}

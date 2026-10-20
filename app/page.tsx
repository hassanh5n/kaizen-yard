import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Ship } from "lucide-react";
import { cars, photoSrcSet, photoUrl } from "@/lib/cars";
import { carTitle, site, waLink } from "@/lib/site";
import { CarCard } from "@/components/CarCard";
import { ArrivalBoard } from "@/components/ArrivalBoard";
import { Plate } from "@/components/Plate";
import { QuickSearch, StickySearch } from "@/components/Search";
import { WhatsAppIcon } from "@/components/Icons";
import { Steps } from "@/components/Steps";

export default function Home() {
  const hero = cars[0];
  const featured = cars.filter((c) => c.featured);
  const arrivals = cars.filter((c) => c.isNew);

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <h1>Find your next Japanese import in Kingston, Jamaica</h1>
            <p className="hero__lede">
              Auction-graded Toyotas, Hondas, Nissans and Mazdas, shipped direct from Japan. Right-hand drive, low mileage, ready to see at our Hagley Park Road yard.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--gold" href="/inventory/">
                Browse all {cars.length} cars <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn btn--wa" href={waLink("Hi Kaizen Yard, I'm looking for a car.")} target="_blank" rel="noopener">
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <figure className="hero__car">
            <Link href={`/cars/${hero.slug}/`} className="hero__photo">
              <img
                src={photoUrl(hero.photos[0].path, 1280)}
                srcSet={photoSrcSet(hero.photos[0].path)}
                sizes="(min-width: 1000px) 600px, 100vw"
                alt={hero.photos[0].alt}
                width={1280}
                height={853}
                fetchPriority="high"
              />
            </Link>
            <div className="hero__plate">
              <Plate stock={hero.stock} size="lg" animate />
            </div>
            <figcaption>
              <Link href={`/cars/${hero.slug}/`}>
                <b>{carTitle(hero)}</b> {hero.variant}
              </Link>
              <span>Grade {hero.grade} · {hero.km.toLocaleString("en-JM")} km · in the yard now</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap qs-wrap">
        <QuickSearch />
      </div>
      <StickySearch />

      <section className="wrap trust" aria-label="Why buy from Kaizen Yard">
        <div>
          <BadgeCheck size={28} aria-hidden="true" />
          <h2>Verified auction grades</h2>
          <p>Every car comes with its original Japanese auction sheet, translated, so you know its grade and history before you visit.</p>
        </div>
        <div>
          <Ship size={28} aria-hidden="true" />
          <h2>Direct Japan imports</h2>
          <p>We buy at the auctions in Tokyo, Nagoya and Osaka and ship straight to Kingston Wharves. No middlemen, no surprises.</p>
        </div>
        <div>
          <MapPin size={28} aria-hidden="true" />
          <h2>Kingston yard delivery</h2>
          <p>Registered, fitness-tested and plated in Jamaica. Collect from the yard or we bring it to you in the Corporate Area.</p>
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>Featured this week</h2>
          <Link className="more" href="/inventory/">
            All {cars.length} cars <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid">
          {featured.map((c) => (
            <CarCard key={c.slug} car={c} />
          ))}
        </div>
      </section>

      <section className="board-band">
        <div className="wrap section">
          <div className="section__head">
            <div>
              <h2>Recent arrivals</h2>
              <p className="section__sub">Landed at Kingston Wharves this month, or on the water now.</p>
            </div>
            <Link className="more" href="/new-arrivals/">
              New arrivals <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ArrivalBoard list={arrivals} />
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <h2>Buying is three steps</h2>
          <Link className="more" href="/how-to-buy/">
            How to buy <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Steps compact />
      </section>

      <section className="visit">
        <div className="wrap visit__grid">
          <h2>Come see them in person</h2>
          {site.yards.map((y) => (
            <div key={y.id} className="visit__yard">
              <h3>{y.name}</h3>
              <p>{y.address}</p>
              <p>{y.phone}</p>
            </div>
          ))}
          <div className="visit__cta">
            <p>Mon–Fri 8:30–5:30 · Sat 9–4</p>
            <Link className="btn btn--dark" href="/contact/">
              Directions and hours <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

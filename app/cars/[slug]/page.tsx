import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Phone } from "lucide-react";
import { cars, getCar, photoUrl, statusLabel } from "@/lib/cars";
import { carTitle, num, site, waForCar } from "@/lib/site";
import { Carousel } from "@/components/Carousel";
import { CarCard, StatusBadge } from "@/components/CarCard";
import { Odometer, Plate } from "@/components/Plate";
import { Price, TestDriveButton } from "@/components/Providers";
import { WhatsAppIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => cars.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = getCar((await params).slug);
  if (!car) return {};
  return {
    title: `${carTitle(car)} ${car.variant}`,
    description: `${carTitle(car)} ${car.variant}, ${num(car.km)} km, ${num(car.cc)} cc, RHD ${car.transmission}, auction grade ${car.grade}. JMD $${num(car.jmd)}. ${statusLabel[car.status]}.`,
    openGraph: { images: [photoUrl(car.photos[0].path, 1280)] },
  };
}

export default async function CarPage({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();

  const sheet: [string, string, React.ReactNode][] = [
    ["在庫番号", "Stock no.", car.stock],
    ["車台番号", "Chassis", car.chassis],
    ["年式", "Year", car.year],
    ["走行距離", "Mileage", <Odometer key="km" km={car.km} />],
    ["排気量", "Engine", `${num(car.cc)} cc`],
    ["ハンドル", "Steering", "Right-hand drive"],
    ["変速機", "Transmission", car.transmission],
    ["燃料", "Fuel", car.fuel],
    ["車体", "Body", car.body],
    ["色", "Colour", car.colour],
    ["乗車定員", "Seats", car.seats],
    ["評価点", "Auction grade", `${car.grade} overall · ${car.interior} interior`],
  ];

  const similar = cars
    .filter((c) => c.slug !== car.slug)
    .sort((a, b) => Number(b.body === car.body) - Number(a.body === car.body) || Math.abs(a.jmd - car.jmd) - Math.abs(b.jmd - car.jmd))
    .slice(0, 3);

  return (
    <>
      <div className="wrap detail">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/inventory/">Inventory</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href={`/inventory/?make=${car.make}`}>{car.make}</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{car.model}</span>
        </nav>

        <div className="detail__grid">
          <div className="detail__gallery">
            <Carousel photos={car.photos} thumbs priority sizes="(min-width: 1000px) 720px, 100vw" label={`${carTitle(car)} photos`} />
          </div>

          <aside className="buy">
            <StatusBadge car={car} />
            <h1>{carTitle(car)}</h1>
            <p className="buy__variant">
              {car.variant} · {car.body} · {car.colour}
            </p>
            <div className="card__id">
              <Plate stock={car.stock} />
              <span className="grade">
                <small>Grade</small>
                {car.grade}
                <small>/{car.interior}</small>
              </span>
            </div>
            <ul className="buy__chips">
              <li>{num(car.km)} km</li>
              <li>{num(car.cc)} cc</li>
              <li>RHD</li>
              <li>{car.transmission}</li>
            </ul>
            <Price car={car} size="lg" />
            <div className="buy__cta">
              <a className="btn btn--wa btn--lg btn--block" href={waForCar(car)} target="_blank" rel="noopener">
                <WhatsAppIcon size={22} /> Chat on WhatsApp
              </a>
              <TestDriveButton car={car} className="btn btn--ghost btn--block" />
              <a className="btn btn--plain btn--block" href={site.phoneHref}>
                <Phone size={18} aria-hidden="true" /> Call {site.phone}
              </a>
            </div>
            <p className="buy__note">
              {car.status === "transit"
                ? `Arriving at Kingston Wharves around ${car.eta}. A refundable deposit reserves it before it lands.`
                : "Ask on WhatsApp for the full translated auction sheet and more photos."}
            </p>
          </aside>
        </div>

        <div className="detail__lower">
          <section className="specsheet" aria-labelledby="spec-h">
            <h2 id="spec-h">Japanese spec sheet</h2>
            <dl>
              {sheet.map(([jp, en, v]) => (
                <div key={en}>
                  <dt>
                    <span lang="ja">{jp}</span>
                    {en}
                  </dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="about-car" aria-labelledby="about-h">
            <h2 id="about-h">About this car</h2>
            <p>{car.blurb}</p>
            <h3>Price includes</h3>
            <ul className="ticks">
              {["Import duty and port charges paid", "Jamaican registration, fitness and plates", "Full service and fresh oil before collection", "Translated Japanese auction sheet"].map((t) => (
                <li key={t}>
                  <Check size={18} aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="board-band">
        <div className="wrap section">
          <div className="section__head">
            <h2>You might also like</h2>
          </div>
          <div className="grid">
            {similar.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>

      <div className="actionbar">
        <Price car={car} />
        <TestDriveButton car={car} className="btn btn--ghost btn--icon" />
        <a className="btn btn--wa" href={waForCar(car)} target="_blank" rel="noopener">
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </>
  );
}

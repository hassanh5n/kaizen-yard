import Link from "next/link";
import { Cog, Gauge } from "lucide-react";
import { statusLabel, type Car } from "@/lib/cars";
import { carTitle, num, waForCar } from "@/lib/site";
import { Carousel } from "./Carousel";
import { Odometer, Plate } from "./Plate";
import { Price, TestDriveButton } from "./Providers";
import { SteeringIcon, WhatsAppIcon } from "./Icons";

export function StatusBadge({ car }: { car: Car }) {
  return (
    <span className={`status status--${car.status}`}>
      <i aria-hidden="true" />
      {car.status === "transit" ? `On the water · ETA ${car.eta}` : statusLabel[car.status]}
    </span>
  );
}

export function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
  const href = `/cars/${car.slug}/`;
  return (
    <article className="card">
      <div className="card__media">
        <Carousel photos={car.photos} href={href} priority={priority} label={`${carTitle(car)} photos`} />
        <div className="card__badges">
          <StatusBadge car={car} />
          {car.isNew && car.status !== "transit" && <span className="tag-new">Just landed</span>}
        </div>
      </div>

      <div className="card__body">
        <div className="card__id">
          <Plate stock={car.stock} />
          <span className="grade" title="Japanese auction grade (overall / interior)">
            <small>Grade</small>
            {car.grade}
            <small>/{car.interior}</small>
          </span>
        </div>

        <h3 className="card__title">
          <Link href={href}>{carTitle(car)}</Link>
        </h3>
        <p className="card__variant">
          {car.variant} · {car.body}
        </p>

        <dl className="specs">
          <div className="specs__km">
            <dt>Mileage</dt>
            <dd>
              <Odometer km={car.km} />
            </dd>
          </div>
          <div>
            <dt>
              <Gauge size={16} aria-hidden="true" /> Engine
            </dt>
            <dd>{num(car.cc)} cc</dd>
          </div>
          <div>
            <dt>
              <SteeringIcon size={16} /> Steering
            </dt>
            <dd>RHD</dd>
          </div>
          <div>
            <dt>
              <Cog size={16} aria-hidden="true" /> Gearbox
            </dt>
            <dd>{car.transmission}</dd>
          </div>
        </dl>
        <p className="card__chassis">
          Chassis <span>{car.chassis}</span>
        </p>

        <div className="card__foot">
          <Price car={car} />
          <a className="btn btn--wa btn--block" href={waForCar(car)} target="_blank" rel="noopener">
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          <TestDriveButton car={car} className="btn btn--ghost btn--block" />
        </div>
      </div>
    </article>
  );
}

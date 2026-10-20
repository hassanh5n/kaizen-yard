import Link from "next/link";
import { photoUrl, type Car } from "@/lib/cars";
import { carTitle, num, waForCar } from "@/lib/site";
import { StatusBadge } from "./CarCard";
import { Plate } from "./Plate";
import { Price } from "./Providers";
import { WhatsAppIcon } from "./Icons";

// Dense, scannable rows, like a port arrivals board. Contrasts with the photo-led grid above it.
export function ArrivalBoard({ list }: { list: Car[] }) {
  return (
    <ol className="board">
      {list.map((c) => (
        <li key={c.slug} className="board__row">
          <img className="board__img" src={photoUrl(c.photos[0].path, 500)} alt="" width={160} height={107} loading="lazy" />
          <div className="board__car">
            <Plate stock={c.stock} />
            <h3>
              <Link href={`/cars/${c.slug}/`}>{carTitle(c)}</Link>
            </h3>
            <p>
              {c.variant} · {num(c.km)} km · {num(c.cc)} cc · {c.transmission}
            </p>
          </div>
          <StatusBadge car={c} />
          <Price car={c} />
          <a className="btn btn--wa btn--sm board__wa" href={waForCar(c)} target="_blank" rel="noopener" aria-label={`Chat on WhatsApp about the ${carTitle(c)}`}>
            <WhatsAppIcon size={18} /> <span>Chat</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

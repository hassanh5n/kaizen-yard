import type { Car } from "./cars";

// Demo contact details: replace before going live.
export const site = {
  name: "Kaizen Yard",
  tagline: "Japanese imports, Kingston",
  whatsapp: "18765550142",
  phone: "+1 (876) 555-0142",
  phoneHref: "tel:+18765550142",
  email: "sales@kaizenyard.example",
  yards: [
    {
      id: "kingston",
      name: "Kingston yard",
      address: "Hagley Park Road, Kingston 11",
      mapQuery: "Hagley Park Road, Kingston, Jamaica",
      phone: "+1 (876) 555-0142",
    },
    {
      id: "montego",
      name: "Montego Bay yard",
      address: "Howard Cooke Boulevard, Montego Bay",
      mapQuery: "Howard Cooke Boulevard, Montego Bay, Jamaica",
      phone: "+1 (876) 555-0177",
    },
  ],
  hours: [
    { days: "Monday to Friday", time: "8:30 am – 5:30 pm" },
    { days: "Saturday", time: "9:00 am – 4:00 pm" },
    { days: "Sunday & public holidays", time: "Closed, WhatsApp replies" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/inventory/", label: "Inventory" },
  { href: "/new-arrivals/", label: "New arrivals" },
  { href: "/how-to-buy/", label: "How to buy" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const carTitle = (c: Car) => `${c.year} ${c.make} ${c.model}`;

export const waForCar = (c: Car) =>
  waLink(
    `Hi Kaizen Yard, I'm interested in the ${carTitle(c)} ${c.variant} (Stock ${c.stock}, JMD ${jmd(c.jmd)}). Is it still available?`
  );

const nf = new Intl.NumberFormat("en-JM");
export const num = (n: number) => nf.format(n);
export const jmd = (n: number) => `$${nf.format(n)}`;
export const usd = (n: number) => `$${nf.format(n)}`;

export const mapEmbed = (q: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
export const mapDirections = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

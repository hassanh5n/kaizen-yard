# Kaizen Yard: Japanese import dealership demo

A mobile-first demo site for a Japanese used-car dealer in Kingston, Jamaica. Built with Next.js 16 as a **static export**, so the finished site is plain HTML/CSS/JS that runs on any host.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and deploy

```bash
npm run build      # writes the static site to ./out
```

The `out/` folder (already included in this delivery) is the whole website. Any of these work:

- **Netlify Drop**: drag the `out` folder onto https://app.netlify.com/drop. Live in seconds.
- **Vercel**: import this folder/repo; it detects Next.js and deploys with no settings.
- **GitHub Pages / cPanel / any static host**: upload the contents of `out/`.

## Before going live, replace the sample content

All placeholders live in two files:

| What | File |
| --- | --- |
| WhatsApp number, phones, email, yard addresses, opening hours | `lib/site.ts` |
| Cars: specs, prices, photos, stock/chassis IDs, in-yard or in-transit | `lib/cars.ts` |
| Testimonials (marked as samples) | `app/about/page.tsx` |
| Yard/showroom photos | `app/about/page.tsx` |

Car photos are Wikimedia Commons images of each model (credited on `/credits`). Swap them for photos of your actual stock: put images in `public/cars/` and point `photoUrl` in `lib/cars.ts` at them.

## What's in it

- **Pages**: Home, Inventory, New arrivals, How to buy, About, Contact, a page per vehicle, photo credits.
- **Filters**: make, model, year, price (JMD/USD), body type, availability (Kingston yard / Montego Bay yard / in transit), mileage, engine cc, transmission, RHD. Filter state lives in the URL, so a filtered search can be shared.
- **WhatsApp everywhere**: sticky header button on every page, a green button on every listing with the car's stock number pre-filled, and a sticky action bar on phones on vehicle pages.
- **Book a test drive**: modal form with inline validation. With no backend, it composes the request and hands it to WhatsApp in one tap.
- **JMD / USD toggle**: remembered per visitor.

## Checks

```bash
node --experimental-strip-types lib/filter.check.ts   # filter + sort logic
```

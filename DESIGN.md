# Design system: Kaizen Yard

Recorded from the built site. Tokens live in `app/globals.css` `:root`.

## World

Japanese number plates and odometers. Japanese plate colours (white plate / green characters, green commercial plates, yellow kei plates, black) happen to be the Jamaican flag's colours, so one palette serves both sides of the import story.

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `--green-900` | #0a3524 | Committed fields: hero, page heads, primary/dark buttons |
| `--green-950` | #062016 | Footer |
| `--green-700` | #17724a | Plate characters, icons, links, focus of selection |
| `--gold` | #f5c518 | In-transit status, gold CTA ("Browse"), Visit band, focus ring |
| `--wa` / `--wa-ink` | #25d366 / #032a16 | WhatsApp only. Never reuse for other actions |
| `--ink`, `--ink-2`, `--ink-3` | #111a15, #3f4d45, #5d6b63 | Text levels (all ≥ 4.5:1 on white) |
| `--ground` / `--surface` / `--plate` | #eef2ef / #fff / #fbfcf8 | Page, cards, plate face |

Rule: WhatsApp green is reserved for WhatsApp. Gold means "attention / in transit". Red is used only for form errors.

## Type

- Display: Barlow Semi Condensed 800 (self-hosted). Headings, car names, prices.
- Body/UI: Barlow 400–700. Barlow is drawn from highway signage and licence plates, which is why it was chosen.
- Numbers use `tabular-nums` (prices, km, chassis).
- Kanji spec labels use the system Japanese font stack (`--font-jp`), never downloaded.

## Signature components

- **Plate** (`components/Plate.tsx`): stock ID as a Japanese private plate. `sm` on cards, `lg` in the hero where its serial rolls in once on load (the site's single orchestrated motion).
- **Odometer**: mileage as drum cells, last cell inverted like a tenths drum.
- **Grade pill**: gold-soft pill, "Grade 4.5 /B".
- **Status pill**: white with green dot = in a yard; gold = on the water with ETA.
- **Arrival board**: dense rows ruled with a 2px ink top line; used for recent arrivals. Same ruled-list grammar for spec sheet, hours, grade table, FAQ.

## Shape and depth

Radii: 8 (inputs), 12 (buttons), 18 (cards, panels). Plates: 5/10. Shadows always offset + blur (`--shadow`, `--shadow-lg`). Translucent material only on sticky chrome (header, mobile search strip, vehicle action bar), with solid fallbacks under `prefers-reduced-transparency` and `prefers-contrast: more`.

## Motion

Exponential ease-out (`--ease-out`). Dialogs: bottom sheet slide-up on phones, small pop-in on desktop; the menu slides from the right and exits the same way. Carousels are native scroll-snap. Everything collapses under `prefers-reduced-motion`.

## Layout

Max width 1280, gutter 16/24/40. Card grid `auto-fit, minmax(272px, 1fr)`. Inventory: 280px sticky filter rail ≥1000px; below that a sticky search + Filters bar opening a bottom sheet.

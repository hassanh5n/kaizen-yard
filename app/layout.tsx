import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const body = localFont({
  src: [
    { path: "./fonts/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/barlow-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/barlow-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/barlow-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

const display = localFont({
  src: [
    { path: "./fonts/barlow-semi-condensed-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/barlow-semi-condensed-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaizenyard.example"),
  title: { default: "Kaizen Yard · Japanese used car imports in Kingston, Jamaica", template: "%s · Kaizen Yard" },
  description:
    "Auction-graded Toyota, Honda, Nissan and Mazda imports shipped direct from Japan. Browse the Kingston yard, see what's on the water, and chat on WhatsApp.",
  openGraph: { type: "website", siteName: "Kaizen Yard", locale: "en_JM" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A3524",
  width: "device-width",
  initialScale: 1,
};

const contract = `<!--
THESIS: A Japanese-import yard told in the language of Japanese number plates and odometers; refuses the navy-and-chrome dealer template.
OWN-WORLD: Plate white, plate green (#0A3524 fields, #17724A characters), kei/flag gold #F5C518, black ink; Barlow (plate/highway lettering) with Semi Condensed 800 display; plate-shaped stock IDs, odometer-drum mileage.
STORY: See a graded, RHD car you can afford, check where it is (yard or on the water), tap WhatsApp.
FIRST VIEWPORT: Full-bleed green field, headline left at display size, featured car photo right with its stock plate rolling in over the bumper line, white quick-search panel straddling the field's bottom edge. WhatsApp stays top-right.
FORM: grounded candidate 3 of 7 (number plate + odometer), seed 78bd5687.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-JM" className={`${body.variable} ${display.variable}`}>
      <head>
        <link rel="preconnect" href="https://upload.wikimedia.org" />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

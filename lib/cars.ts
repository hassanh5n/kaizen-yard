// Single source of truth for the demo inventory.
// Photos are Wikimedia Commons files (see /credits). `path` is "<hash>/<encoded filename>".

export type Make = "Toyota" | "Honda" | "Nissan" | "Mazda";
export type Body = "Sedan" | "Hatchback" | "SUV" | "Wagon";
export type Status = "kingston" | "montego" | "transit";

export type Photo = { path: string; alt: string; credit: string; license: string };

export type Car = {
  slug: string;
  stock: string;
  chassis: string;
  year: number;
  make: Make;
  model: string;
  variant: string;
  body: Body;
  km: number;
  cc: number;
  transmission: "CVT" | "Automatic";
  fuel: string;
  colour: string;
  grade: string; // Japanese auction grade
  interior: string; // auction interior grade
  seats: number;
  status: Status;
  eta?: string; // for cars in transit
  isNew?: boolean; // landed this week
  featured?: boolean;
  jmd: number;
  usd: number;
  blurb: string;
  photos: Photo[];
};

const C = "CC BY-SA 4.0";

export const cars: Car[] = [
  {
    slug: "2018-toyota-vitz-ky24081",
    stock: "KY-24081",
    chassis: "NSP130-2291746",
    year: 2018,
    make: "Toyota",
    model: "Vitz",
    variant: "1.3 F Safety Edition",
    body: "Hatchback",
    km: 48210,
    cc: 1300,
    transmission: "CVT",
    fuel: "Petrol",
    colour: "Super White II",
    grade: "4.5",
    interior: "B",
    seats: 5,
    status: "kingston",
    isNew: true,
    featured: true,
    jmd: 1250000,
    usd: 8000,
    blurb:
      "The facelifted Vitz with Toyota Safety Sense: pre-collision braking, lane departure alert and auto high beams. Light on gas, easy to park in Half Way Tree traffic, and parts are everywhere.",
    photos: [
      { path: "5/53/2018_Toyota_Yaris_%28NCP130R%29_Ascent_5-door_hatchback_%282018-10-01%29_01.jpg", alt: "White 2018 Toyota Vitz, front three-quarter view", credit: "EurovisionNim", license: C },
      { path: "1/11/2018_Toyota_Yaris_%28NCP130R%29_Ascent_5-door_hatchback_%282018-10-01%29_02.jpg", alt: "White 2018 Toyota Vitz, rear three-quarter view", credit: "EurovisionNim", license: C },
    ],
  },
  {
    slug: "2017-honda-fit-ky24077",
    stock: "KY-24077",
    chassis: "GK3-1312058",
    year: 2017,
    make: "Honda",
    model: "Fit",
    variant: "13G F Package",
    body: "Hatchback",
    km: 56900,
    cc: 1300,
    transmission: "CVT",
    fuel: "Petrol",
    colour: "White Orchid Pearl",
    grade: "4",
    interior: "B",
    seats: 5,
    status: "kingston",
    featured: true,
    jmd: 1350000,
    usd: 8600,
    blurb:
      "Honda's Magic Seats fold flat or flip up, so the Fit swallows a fridge or a week of groceries. Smooth CVT, bright cabin and the best rear legroom in its class.",
    photos: [
      { path: "6/68/2018_Honda_Jazz_%28GK5_MY18%29_VTi-S_hatchback_%282018-08-06%29_01.jpg", alt: "White Honda Fit GK, front three-quarter view", credit: "EurovisionNim", license: C },
      { path: "4/4f/2018_Honda_Jazz_%28GK5_MY18%29_VTi-S_hatchback_%282018-08-06%29_02.jpg", alt: "White Honda Fit GK, rear three-quarter view", credit: "EurovisionNim", license: C },
      { path: "3/33/2017_Honda_Jazz_EX_Navi_i-VTEC_CVT_1.3_Front.jpg", alt: "White Honda Fit, front view", credit: "Vauxford", license: C },
      { path: "8/83/Honda_FIT_HYBRID%E3%83%BBL_Honda_SENSING_%28DAA-GP5%29_interior.jpg", alt: "Honda Fit dashboard and right-hand-drive steering wheel", credit: "Tokumeigakarinoaoshima", license: C },
    ],
  },
  {
    slug: "2019-nissan-note-e-power-ky24093",
    stock: "KY-24093",
    chassis: "HE12-0213377",
    year: 2019,
    make: "Nissan",
    model: "Note",
    variant: "e-Power AUTECH",
    body: "Hatchback",
    km: 39450,
    cc: 1200,
    transmission: "Automatic",
    fuel: "Hybrid (e-Power)",
    colour: "Ocean Blue",
    grade: "4.5",
    interior: "A",
    seats: 5,
    status: "transit",
    eta: "4 Nov",
    isNew: true,
    featured: true,
    jmd: 1450000,
    usd: 9200,
    blurb:
      "Drives like an electric car, refuels like a petrol one. The engine only charges the battery, so you get instant torque and serious fuel savings in stop-start traffic.",
    photos: [
      { path: "2/2c/Nissan_NOTE_e-POWER_AUTECH.jpg", alt: "Blue Nissan Note e-Power AUTECH, front three-quarter view", credit: "Tokumeigakarinoaoshima", license: C },
      { path: "9/9c/Nissan_Note_X-DIG-S_interior.jpg", alt: "Nissan Note dashboard, right-hand drive", credit: "TTTNIS", license: "Public domain" },
    ],
  },
  {
    slug: "2018-toyota-probox-ky24069",
    stock: "KY-24069",
    chassis: "NCP160V-0098214",
    year: 2018,
    make: "Toyota",
    model: "Probox",
    variant: "DX Comfort",
    body: "Wagon",
    km: 71300,
    cc: 1500,
    transmission: "CVT",
    fuel: "Petrol",
    colour: "White",
    grade: "4",
    interior: "B",
    seats: 5,
    status: "kingston",
    isNew: true,
    jmd: 1150000,
    usd: 7300,
    blurb:
      "Jamaica's favourite workhorse. A flat cargo floor, a 1.5 litre engine that runs forever, and running costs that make sense for deliveries, contractors and route work.",
    photos: [
      { path: "1/14/2018_Toyota_Probox_Van_DX_Comfort_in_White%2C_front_right.jpg", alt: "White 2018 Toyota Probox DX Comfort, front three-quarter view", credit: "Mr.choppers", license: "CC BY-SA 3.0" },
      { path: "a/a3/Toyota_Probox_GL_NCP160V.jpg", alt: "White Toyota Probox, side view", credit: "Ypy31", license: "CC0" },
      { path: "b/be/Toyota_Probox_GL_NCP160V_rear.jpg", alt: "White Toyota Probox, rear three-quarter view", credit: "Ypy31", license: "CC0" },
      { path: "b/b6/Toyota_Probox_GL_NCP160V_interior.jpg", alt: "Toyota Probox dashboard, right-hand drive", credit: "Ypy31", license: "CC0" },
    ],
  },
  {
    slug: "2016-honda-vezel-ky24098",
    stock: "KY-24098",
    chassis: "RU1-1104529",
    year: 2016,
    make: "Honda",
    model: "Vezel",
    variant: "1.5 X (HR-V)",
    body: "SUV",
    km: 62800,
    cc: 1500,
    transmission: "CVT",
    fuel: "Petrol",
    colour: "Lunar Silver Metallic",
    grade: "4",
    interior: "B",
    seats: 5,
    status: "transit",
    eta: "12 Nov",
    isNew: true,
    jmd: 2100000,
    usd: 13400,
    blurb:
      "Sold as the HR-V outside Japan. Compact SUV height for rough roads and rainy-season potholes, with Fit-style Magic Seats and a coupe-like roofline.",
    photos: [
      { path: "e/e2/2018_Honda_HR-V_VTi-S_wagon_%282018-08-27%29_01.jpg", alt: "Silver Honda Vezel, front three-quarter view", credit: "EurovisionNim", license: C },
      { path: "0/06/2018_Honda_HR-V_VTi-S_wagon_%282018-08-27%29_02.jpg", alt: "Silver Honda Vezel, rear three-quarter view", credit: "EurovisionNim", license: C },
    ],
  },
  {
    slug: "2015-toyota-axio-ky24052",
    stock: "KY-24052",
    chassis: "NKE165-7104863",
    year: 2015,
    make: "Toyota",
    model: "Axio",
    variant: "Hybrid G",
    body: "Sedan",
    km: 84100,
    cc: 1500,
    transmission: "CVT",
    fuel: "Hybrid",
    colour: "Black Mica",
    grade: "4",
    interior: "B",
    seats: 5,
    status: "kingston",
    jmd: 1550000,
    usd: 9900,
    blurb:
      "The Corolla sedan Japan keeps for itself. Hybrid economy, a proper boot, and the quiet, upright comfort that makes it a favourite with taxi operators and families alike.",
    photos: [
      { path: "4/47/Toyota_Corolla_Axio_Hybrid_%2715_%281%29.jpg", alt: "Black 2015 Toyota Corolla Axio Hybrid, front three-quarter view", credit: "Oq10pass", license: "CC0" },
      { path: "9/9e/Toyota_Corolla_Axio_Hybrid_%2715_%282%29.jpg", alt: "Black 2015 Toyota Corolla Axio Hybrid, rear three-quarter view", credit: "Oq10pass", license: "CC0" },
      { path: "0/07/Toyota_COROLLA_Axio_HYBRID_G%22W%C3%97B%22_%28DAA-NKE165-AEXEB%29_interior.jpg", alt: "Toyota Axio Hybrid dashboard, right-hand drive", credit: "Tokumeigakarinoaoshima", license: C },
    ],
  },
  {
    slug: "2017-mazda-demio-ky24088",
    stock: "KY-24088",
    chassis: "DJ5FS-312044",
    year: 2017,
    make: "Mazda",
    model: "Demio",
    variant: "XD Touring L Package",
    body: "Hatchback",
    km: 52600,
    cc: 1500,
    transmission: "Automatic",
    fuel: "Diesel",
    colour: "Soul Red",
    grade: "4.5",
    interior: "A",
    seats: 5,
    status: "montego",
    isNew: true,
    jmd: 1380000,
    usd: 8800,
    blurb:
      "Mazda's SkyActiv-D diesel with a six-speed automatic: big torque, long range between fill-ups, and a leather-trimmed cabin that feels a class above.",
    photos: [
      { path: "d/d3/Mazda_Demio_XD_Touring_L_Package.jpg", alt: "Red Mazda Demio XD Touring, front three-quarter view", credit: "TTTNIS", license: "CC0" },
    ],
  },
];

export const statusLabel: Record<Status, string> = {
  kingston: "In Kingston yard",
  montego: "In Montego Bay yard",
  transit: "In transit from Japan",
};

export const getCar = (slug: string) => cars.find((c) => c.slug === slug);

export const photoUrl = (path: string, w: 500 | 960 | 1280) => {
  const file = path.split("/")[2];
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${w}px-${file}`;
};

export const photoSrcSet = (path: string) =>
  ([500, 960, 1280] as const).map((w) => `${photoUrl(path, w)} ${w}w`).join(", ");

export const commonsPage = (path: string) =>
  `https://commons.wikimedia.org/wiki/File:${path.split("/")[2]}`;

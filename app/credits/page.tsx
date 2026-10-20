import type { Metadata } from "next";
import { cars, commonsPage } from "@/lib/cars";
import { carTitle } from "@/lib/site";

export const metadata: Metadata = { title: "Photo credits", robots: { index: false } };

const extra = [
  { path: "2/21/Toyota_Corolla_Axio_%28Jamaica%29.jpg", by: "Jason Lawrence", license: "CC BY 2.0", use: "About page" },
  { path: "6/6b/Street_in_Montigo_Bay_Jamaica_Photo_Don_Ramey_Logan.jpg", by: "Don Ramey Logan", license: "CC BY-SA 3.0", use: "About page" },
  { path: "a/a5/BYD_Hefei%2C_Porto_di_Livorno%2C_2025.jpg", by: "Marcxosm", license: "CC BY 4.0", use: "New arrivals, About page" },
];

export default function Credits() {
  const rows = [
    ...cars.flatMap((c) => c.photos.map((p) => ({ path: p.path, by: p.credit, license: p.license, use: carTitle(c) }))),
    ...extra,
  ];
  return (
    <section className="wrap section narrow">
      <h1 className="h1-plain">Photo credits</h1>
      <p className="section__sub">
        Vehicle and location photos are from Wikimedia Commons and used under their free licences. They illustrate each model; they are not photos of specific stock.
      </p>
      <table className="credits">
        <thead>
          <tr>
            <th scope="col">Used for</th>
            <th scope="col">Photographer</th>
            <th scope="col">Licence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.path + r.use}>
              <td>
                <a href={commonsPage(r.path)} target="_blank" rel="noopener">
                  {r.use}
                </a>
              </td>
              <td>{r.by}</td>
              <td>{r.license}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

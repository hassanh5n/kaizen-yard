import type { Metadata } from "next";
import { Suspense } from "react";
import { InventoryView } from "@/components/Search";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Every Japanese import in our Kingston and Montego Bay yards and on the water, with auction grade, mileage, engine size and price in JMD or USD.",
};

export default function InventoryPage() {
  return (
    <>
      <section className="phead phead--slim">
        <div className="wrap">
          <h1>All cars</h1>
          <p>Every car in our Kingston and Montego Bay yards, plus the ones on the water from Japan. All right-hand drive, all auction-graded.</p>
        </div>
      </section>
      <div className="wrap">
        <Suspense fallback={<p className="inv__loading">Loading cars…</p>}>
          <InventoryView />
        </Suspense>
      </div>
    </>
  );
}

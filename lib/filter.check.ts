// Run: npx tsx lib/filter.check.ts  (or node --experimental-strip-types)
import assert from "node:assert/strict";
import { cars } from "./cars.ts";
import { applyFilters, parseFilters, toParams } from "./filter.ts";

const slugs = (f: Parameters<typeof applyFilters>[1], s?: Parameters<typeof applyFilters>[2]) =>
  applyFilters(cars, f, s).map((c) => c.model);

assert.equal(applyFilters(cars, {}).length, cars.length);
assert.deepEqual(slugs({ make: "Honda" }).sort(), ["Fit", "Vezel"]);
assert.deepEqual(slugs({ body: ["Sedan"] }), ["Axio"]);
assert.deepEqual(slugs({ status: ["transit"] }).sort(), ["Note", "Vezel"]);
assert.deepEqual(slugs({ priceMax: 1250000 }).sort(), ["Probox", "Vitz"]);
assert.deepEqual(slugs({ engine: "small" }).sort(), ["Fit", "Note", "Vitz"]);
assert.deepEqual(slugs({ q: "ky-24098" }), ["Vezel"]);
assert.equal(slugs({}, "price-asc")[0], "Probox");
assert.equal(slugs({}, "km-asc")[0], "Note");
assert.equal(slugs({}, "year-desc")[0], "Note");
assert.deepEqual(slugs({ make: "Mazda", body: ["SUV"] }), []);

const f = { make: "Toyota", body: ["Hatchback", "Wagon"], priceMax: 1400000 };
assert.deepEqual(parseFilters(new URLSearchParams(toParams(f, "recommended"))), f);
console.log("filter checks passed");

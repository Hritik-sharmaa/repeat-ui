// Keep in sync with cli/registry.js and scripts/build-registry.ts.
export const FLAVORS = ["ts-tailwind", "ts-css", "js-tailwind", "js-css"] as const;
export type Flavor = (typeof FLAVORS)[number];
export const DEFAULT_FLAVOR: Flavor = "ts-tailwind";

export const isFlavor = (value: string): value is Flavor =>
  (FLAVORS as readonly string[]).includes(value);

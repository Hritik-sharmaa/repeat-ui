// The shape of every component's meta.ts, plus the category order.
// scripts/build-registry.ts reads both and fails on anything that does not match.

// Sidebar order. Every folder in src/registry/ must be one of these.
export const CATEGORIES = [
  "button",
  "card",
  "carousel",
  "text-effect",
  "grid",
  "cursor",
  "image",
  "commons",
] as const;

// A field of an object prop.
export interface PropField {
  name: string;
  type: string;
  optional?: boolean;
  default?: string;
  description: string;
  properties?: PropField[];
}

export interface PropDoc {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
  properties?: PropField[];
}

// A knob in the website's Customize panel. `prop` is a documented prop of preview.tsx
// (or "children"), and `default` is the value the component uses when the prop is left out.
export type Control = { prop: string; label?: string } & (
  | { type: "text"; default: string }
  | { type: "number"; default: number; min: number; max: number; step?: number; unit?: string }
  | { type: "color"; default: string }
  | { type: "boolean"; default: boolean }
  | { type: "select"; default: string; options: string[] }
);

export interface ComponentMeta {
  description: string;
  // YYYY-MM-DD. Components added in the last 30 days get a "New" badge, and a
  // category lists its components oldest first.
  dateAdded: string;
  // Everything is free for now; "pro" is reserved for a paid tier.
  tier: "free" | "pro";
  // Bump when the component changes in a way users would want to pull.
  version: string;
  // The props of preview.tsx. The build checks these names against its TypeScript props.
  props: PropDoc[];
  // What the Customize panel lets visitors change, in order.
  controls?: Control[];
  // JSX attributes the usage snippet always starts with: required data the panel cannot edit, like `items={items}`.
  usage?: string[];
}

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
}

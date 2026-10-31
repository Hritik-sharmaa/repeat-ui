import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  globalIgnores([".next/**", "next-env.d.ts", "public/r/**", "src/registry/__generated__/**", "drafts/**"]),
  ...nextVitals,
  ...nextTs,
  // Registry components are copied into any React app, so they cannot use next/image.
  { files: ["src/registry/**"], rules: { "@next/next/no-img-element": "off" } },
]);

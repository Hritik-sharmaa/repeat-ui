import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: [".next/**", "public/r/**", "src/registry/__generated__/**", "drafts/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Registry components are copied into any React app, so they cannot use next/image.
  { files: ["src/registry/**"], rules: { "@next/next/no-img-element": "off" } },
];

export default eslintConfig;

// npm run new <category> <name>
// Creates src/registry/<category>/<name>/ with a meta.ts and a working css/ and tailwind/ starter
// that already passes every check in scripts/build-registry.ts.
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { posix } from "path";
import { CATEGORIES } from "../src/registry/catalog";

const { join } = posix;
const [category, name] = process.argv.slice(2);

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

if (!category || !name) fail("Usage: npm run new <category> <name>, for example: npm run new button glow");
if (!(CATEGORIES as readonly string[]).includes(category)) {
  fail(`Unknown category "${category}". Use one of: ${CATEGORIES.join(", ")}\n` +
    `For a new category, add it to CATEGORIES in src/registry/catalog.ts first.`);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) fail(`Use lowercase words joined by dashes for the name, for example "glow-card".`);

const dir = join("src/registry", category, name);
if (existsSync(dir)) fail(`${dir} already exists.`);

const pascal = name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
// An identifier cannot start with a digit, as in "3d-card".
const component = /^\d/.test(pascal) ? `Rui${pascal}` : pascal;
const today = new Date().toISOString().slice(0, 10);

const preview = (className: string, styleImport: string) => `${styleImport}interface ${component}Props {
  text?: string;
  className?: string;
}

const ${component} = ({ text = "${component}", className = "" }: ${component}Props) => {
  return <div className={\`${className} \${className}\`}>{text}</div>;
};

export default ${component};
`;

const demo = `import ${component} from "./preview";

const ${component}Demo = () => {
  return <${component} />;
};

export default ${component}Demo;
`;

const files: Record<string, string> = {
  "meta.ts": `import type { ComponentMeta } from "../../catalog";

export default {
  description: "Describe this component in one line.",
  dateAdded: "${today}",
  tier: "free",
  version: "1.0.0",
  props: [
    {
      name: "text",
      type: "string",
      default: '"${component}"',
      description: "The text to show.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Extra classes for the root element.",
    },
  ],
} satisfies ComponentMeta;
`,
  "tailwind/preview.tsx": preview("rounded-lg px-4 py-2", ""),
  "tailwind/demo.tsx": demo,
  // Class names and @keyframes in style.css are global, so prefix them with rui-.
  "css/preview.tsx": preview(`rui-${name}`, `import "./style.css";\n\n`),
  "css/demo.tsx": demo,
  "css/style.css": `.rui-${name} {\n  border-radius: 0.5rem;\n  padding: 0.5rem 1rem;\n}\n`,
};

async function main() {
  for (const [path, content] of Object.entries(files)) {
    await mkdir(join(dir, path, ".."), { recursive: true });
    await writeFile(join(dir, path), content);
  }
  console.log(`Created ${dir}:\n${Object.keys(files).map((f) => `  ${f}`).join("\n")}

Next:
  1. Build the component in tailwind/preview.tsx and css/preview.tsx (same props in both).
  2. Fill in meta.ts: the description, and one entry per prop.
  3. npm run dev, then open /components/${category}/${name}
`);
}

main();

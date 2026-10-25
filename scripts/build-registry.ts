// Builds the component registry from src/registry and fails on anything that
// would ship broken to users. Output:
//   public/r/<flavor>/<name>.json      fetched by the CLI
//   public/r/index.json                component list for the CLI
//   src/registry/__generated__/...     same items, imported by the website
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { posix } from "path";
import ts from "typescript";
import { blankSourceFile } from "ts-blank-space";
import * as prettier from "prettier";
import { categories } from "../src/data/categories";

const { dirname, join } = posix;
const SRC = "src/registry";
const GENERATED = join(SRC, "__generated__");
const PUBLIC = "public/r";
const STYLES = ["css", "tailwind"] as const;
const LANGS = ["ts", "js"] as const;
// Every React app already has these, so the CLI never installs them.
const PROVIDED = new Set(["react", "react-dom"]);
// Matches `import x from "y"`, `import "y"` and `export ... from "y"`, across lines.
const IMPORT_RE = /(?:^|[\s;])(?:import|export)\s+(?:[^'"`;]*?\sfrom\s*)?["']([^"']+)["']/g;

interface RegistryFile {
  path: string;
  content: string;
}

interface RegistryItem {
  name: string;
  title: string;
  description: string;
  category: string;
  flavor: string;
  dependencies: string[];
  files: RegistryFile[];
}

const errors: string[] = [];

const packageName = (spec: string) =>
  spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/");

const title = (name: string) =>
  name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function resolveLocal(spec: string, fileNames: string[]) {
  const base = spec.replace(/^\.\//, "");
  return ["", ".tsx", ".ts"].map((ext) => base + ext).find((f) => fileNames.includes(f));
}

async function toJs(source: string, where: string) {
  const sf = ts.createSourceFile(where, source, ts.ScriptTarget.ESNext, false, ts.ScriptKind.TSX);
  const js = blankSourceFile(sf, (node) => {
    errors.push(`${where}: TypeScript syntax that cannot be stripped to JS: ${node.getText(sf).slice(0, 60)}`);
  });
  return prettier.format(js, { parser: "babel", bracketSameLine: true });
}

async function buildFlavorStyle(dir: string) {
  let fileNames: string[];
  try {
    fileNames = await readdir(dir);
  } catch {
    errors.push(`${dir}: folder is missing`);
    return null;
  }
  for (const required of ["preview.tsx", "demo.tsx"]) {
    if (!fileNames.includes(required)) errors.push(`${dir}: missing ${required}`);
  }

  const files: RegistryFile[] = await Promise.all(
    fileNames.map(async (f) => ({ path: f, content: await readFile(join(dir, f), "utf8") }))
  );
  const dependencies = new Set<string>();
  const used = new Set(["preview.tsx", "demo.tsx"]);

  for (const { path, content } of files) {
    if (!/\.tsx?$/.test(path)) continue;
    for (const [, spec] of content.matchAll(IMPORT_RE)) {
      if (spec.startsWith(".")) {
        const target = resolveLocal(spec, fileNames);
        if (target) used.add(target);
        else errors.push(`${dir}/${path}: import "${spec}" does not match a file in this folder`);
      } else if (spec.startsWith("@/") || packageName(spec) === "next") {
        errors.push(`${dir}/${path}: import "${spec}" only works inside this website`);
      } else if (!PROVIDED.has(packageName(spec))) {
        dependencies.add(packageName(spec));
      }
    }
  }
  for (const f of fileNames) {
    if (!used.has(f)) errors.push(`${dir}/${f}: not imported by any file, so it would ship as dead code`);
  }
  return { files, dependencies: [...dependencies].sort() };
}

async function checkNoStrayFolders(known: Set<string>) {
  for (const category of await readdir(SRC)) {
    if (category === "__generated__") continue;
    for (const variant of await readdir(join(SRC, category))) {
      if (!known.has(`${category}/${variant}`)) {
        errors.push(`${SRC}/${category}/${variant}: folder is not listed in src/data/categories.ts`);
      }
    }
  }
}

async function writeJson(path: string, data: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2) + "\n");
}

async function main() {
  const items: RegistryItem[] = [];
  const known = new Set<string>();

  for (const sub of categories.flatMap((c) => c.subcategories)) {
    const category = sub.name.toLowerCase();
    for (const variant of sub.variants) {
      known.add(`${category}/${variant.name}`);
      const name = `${category}-${variant.name}`;
      for (const style of STYLES) {
        const dir = join(SRC, category, variant.name, style);
        const built = await buildFlavorStyle(dir);
        if (!built) continue;
        for (const lang of LANGS) {
          const files =
            lang === "ts"
              ? built.files
              : await Promise.all(
                  built.files.map(async (f) =>
                    /\.tsx?$/.test(f.path)
                      ? { path: f.path.replace(/\.ts(x?)$/, ".js$1"), content: await toJs(f.content, `${dir}/${f.path}`) }
                      : f
                  )
                );
          items.push({
            name,
            title: title(variant.name),
            description: variant.description ?? "",
            category,
            flavor: `${lang}-${style}`,
            dependencies: built.dependencies,
            files,
          });
        }
      }
    }
  }
  await checkNoStrayFolders(known);

  if (errors.length) {
    console.error(`Registry has ${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }

  await rm(PUBLIC, { recursive: true, force: true });
  await rm(GENERATED, { recursive: true, force: true });
  for (const item of items) {
    await writeJson(join(PUBLIC, item.flavor, `${item.name}.json`), item);
    await writeJson(join(GENERATED, item.flavor, `${item.name}.json`), item);
  }
  const index = items
    .filter((i) => i.flavor === "ts-tailwind")
    .map(({ name, title, description, category }) => ({ name, title, description, category }));
  await writeJson(join(PUBLIC, "index.json"), index);
  console.log(`Registry built: ${index.length} components, ${items.length} items.`);
}

main();

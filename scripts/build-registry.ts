// Builds the component registry from src/registry and fails on anything that
// would ship broken to users. Output:
//   public/r/<name>[-css|-js|-js-css].json   shadcn registry items, fetched by both CLIs
//   public/r/registry.json                   shadcn registry index
//   public/r/index.json                      component list for our CLI
//   src/registry/__generated__/<flavor>/...  same items, imported by the website
//   src/registry/__generated__/catalog.json  every component's metadata, for the website's navigation
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { posix, resolve } from "path";
import { pathToFileURL } from "url";
import ts from "typescript";
import { blankSourceFile } from "ts-blank-space";
import * as prettier from "prettier";
import { CATEGORIES, type ComponentMeta } from "../src/registry/catalog";

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
    fileNames.map(async (f) => ({
      path: f,
      // Same line endings for every user, whatever OS checked out the repo.
      content: (await readFile(join(dir, f), "utf8")).replace(/\r\n/g, "\n"),
    }))
  );
  const dependencies = new Set<string>();
  const used = new Set(["preview.tsx", "demo.tsx"]);

  for (const { path, content } of files) {
    // Keyframes are global, so a plain name like "pulse" or "spin" would override Tailwind's own.
    for (const [, name] of content.matchAll(/@keyframes\s+([\w-]+)/g)) {
      if (!name.startsWith("rui-")) errors.push(`${dir}/${path}: rename @keyframes ${name} to rui-${name}`);
    }
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

interface Component {
  category: string;
  name: string;
  meta: ComponentMeta;
}

// Every folder under src/registry/<category>/ is a component: meta.ts plus a css/ and a tailwind/ folder.
async function findComponents() {
  const components: Component[] = [];
  for (const entry of await readdir(SRC, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "__generated__") continue;
    const category = entry.name;
    if (!(CATEGORIES as readonly string[]).includes(category)) {
      errors.push(`${SRC}/${category}: add "${category}" to CATEGORIES in ${SRC}/catalog.ts`);
      continue;
    }
    for (const name of await readdir(join(SRC, category))) {
      const dir = join(SRC, category, name);
      const entries = await readdir(dir).catch(() => null);
      if (!entries) {
        errors.push(`${dir}: expected a component folder`);
        continue;
      }
      for (const e of entries) {
        if (e !== "meta.ts" && !(STYLES as readonly string[]).includes(e)) errors.push(`${dir}/${e}: unexpected file`);
      }
      if (!entries.includes("meta.ts")) {
        errors.push(`${dir}: missing meta.ts`);
        continue;
      }
      const meta: ComponentMeta = (await import(pathToFileURL(resolve(dir, "meta.ts")).href)).default;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.dateAdded) || isNaN(Date.parse(meta.dateAdded))) {
        errors.push(`${dir}/meta.ts: dateAdded must be a YYYY-MM-DD date`);
      }
      components.push({ category, name, meta });
    }
  }
  const order = (c: Component) => CATEGORIES.indexOf(c.category as (typeof CATEGORIES)[number]);
  return components.sort(
    (a, b) => order(a) - order(b) || a.meta.dateAdded.localeCompare(b.meta.dateAdded) || a.name.localeCompare(b.name)
  );
}

// The props a component accepts: `all` includes inherited ones such as HTML attributes,
// `own` only those declared in the registry's own code.
function readProps(program: ts.Program, file: string) {
  const checker = program.getTypeChecker();
  const sf = program.getSourceFile(file);
  const source = sf && checker.getSymbolAtLocation(sf);
  let component = source && checker.tryGetMemberInModuleExports("default", source);
  if (!sf || !component) return null;
  if (component.flags & ts.SymbolFlags.Alias) component = checker.getAliasedSymbol(component);
  const signature = checker.getTypeOfSymbolAtLocation(component, sf).getCallSignatures()[0];
  if (!signature) return null;
  const all = new Set<string>();
  const own = new Set<string>();
  const param = signature.parameters[0];
  if (param) {
    const type = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(param, sf));
    for (const prop of checker.getPropertiesOfType(type)) {
      all.add(prop.name);
      if (prop.declarations?.some((d) => !d.getSourceFile().fileName.includes("/node_modules/"))) own.add(prop.name);
    }
  }
  return { all, own };
}

// The props table on the website comes from meta.ts, so it must match what preview.tsx accepts.
function checkPropDocs(components: Component[]) {
  const files = components.flatMap((c) => STYLES.map((style) => resolve(SRC, c.category, c.name, style, "preview.tsx")));
  const config = ts.getParsedCommandLineOfConfigFile("tsconfig.registry.json", {}, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (d) => {
      throw new Error(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
    },
  });
  const program = ts.createProgram(files, config!.options);
  for (const c of components) {
    const documented = new Set(c.meta.props.map((p) => p.name));
    for (const style of STYLES) {
      const where = join(SRC, c.category, c.name, style, "preview.tsx");
      const props = readProps(program, resolve(where));
      if (!props) {
        errors.push(`${where}: default export is not a component`);
        continue;
      }
      for (const name of documented) {
        if (!props.all.has(name)) errors.push(`${where}: meta.ts documents prop "${name}", which this component does not accept`);
      }
      for (const name of props.own) {
        if (!documented.has(name)) errors.push(`${where}: prop "${name}" is not documented in meta.ts`);
      }
    }
  }
}

// Flat names, because the shadcn directory only accepts items at the registry root.
// Keep in sync with cli/registry.js.
const SUFFIX: Record<string, string> = { "ts-tailwind": "", "ts-css": "-css", "js-tailwind": "-js", "js-css": "-js-css" };
const LABEL: Record<string, string> = { "ts-tailwind": "", "ts-css": " (CSS)", "js-tailwind": " (JS)", "js-css": " (JS, CSS)" };

function toShadcnItem(item: RegistryItem) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name + SUFFIX[item.flavor],
    type: "registry:component",
    title: item.title + LABEL[item.flavor],
    description: item.description,
    dependencies: item.dependencies,
    files: item.files.map((f) => ({
      path: f.path,
      type: f.path.endsWith(".css") ? "registry:file" : "registry:component",
      // One folder per component, or every component's preview.tsx would land on the same path.
      target: `@components/repeat-ui/${item.name}/${f.path}`,
      content: f.content,
    })),
  };
}

async function writeJson(path: string, data: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2) + "\n");
}

async function main() {
  const items: RegistryItem[] = [];
  const components = await findComponents();

  for (const { category, name: variant, meta } of components) {
    const name = `${category}-${variant}`;
    for (const style of STYLES) {
      const dir = join(SRC, category, variant, style);
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
          title: title(variant),
          description: meta.description,
          category,
          flavor: `${lang}-${style}`,
          dependencies: built.dependencies,
          files,
        });
      }
    }
  }
  // Only once every folder is complete, or the type checker reports missing files instead.
  if (!errors.length) checkPropDocs(components);

  if (errors.length) {
    console.error(`Registry has ${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
    process.exit(1);
  }

  await rm(PUBLIC, { recursive: true, force: true });
  await rm(GENERATED, { recursive: true, force: true });
  const shadcnItems = items.map(toShadcnItem);
  for (const [i, item] of items.entries()) {
    await writeJson(join(PUBLIC, `${shadcnItems[i].name}.json`), shadcnItems[i]);
    await writeJson(join(GENERATED, item.flavor, `${item.name}.json`), { ...item, shadcnName: shadcnItems[i].name });
  }
  // The registry index for the shadcn directory; it must not contain file contents.
  await writeJson(join(PUBLIC, "registry.json"), {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "repeat-ui",
    homepage: "https://repeatui.vercel.app",
    items: shadcnItems.map(({ name, type, title, description, dependencies, files }) => ({
      name,
      type,
      title,
      description,
      dependencies,
      files: files.map(({ path, type, target }) => ({ path, type, target })),
    })),
  });
  const index = items
    .filter((i) => i.flavor === "ts-tailwind")
    .map(({ name, title, description, category }) => ({ name, title, description, category }));
  await writeJson(join(PUBLIC, "index.json"), index);
  // Without props, which only the component's own page needs: this ships in the website's navigation.
  await writeJson(
    join(GENERATED, "catalog.json"),
    CATEGORIES.map((category) => ({
      name: category,
      variants: components
        .filter((c) => c.category === category)
        .map(({ name, meta: { description, dateAdded, tier, version } }) => ({ name, description, dateAdded, tier, version })),
    })).filter((c) => c.variants.length)
  );
  console.log(`Registry built: ${index.length} components, ${items.length} items.`);
}

main();

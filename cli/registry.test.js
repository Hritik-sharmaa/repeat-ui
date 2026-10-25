// Run `npm run registry` in the repo root first: these tests install from the built public/r folder.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "fs";
import { mkdir, mkdtemp, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { addComponent, detectPackageManager, FLAVORS } from "./registry.js";

const registry = join(dirname(fileURLToPath(import.meta.url)), "../public/r");
const index = JSON.parse(readFileSync(join(registry, "index.json"), "utf8"));
const RELATIVE_IMPORT = /(?:import|from)\s*["'](\.\/[^"']+)["']/g;

test("every component installs with imports that resolve", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  for (const flavor of FLAVORS) {
    for (const { name } of index) {
      const { files } = await addComponent(name, { variant: flavor, output: flavor, registry, cwd });
      for (const file of files) {
        for (const [, spec] of readFileSync(file, "utf8").matchAll(RELATIVE_IMPORT)) {
          const base = join(dirname(file), spec);
          const found = ["", ".tsx", ".ts", ".jsx", ".js"].some((ext) => existsSync(base + ext));
          assert.ok(found, `${flavor}/${name}: ${file} imports missing "${spec}"`);
        }
      }
    }
  }
});

test("reports missing packages against the project's package.json", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  await writeFile(join(cwd, "package.json"), JSON.stringify({ dependencies: { motion: "^12" } }));
  const { missing } = await addComponent("carousel-simple-carousel", { variant: "ts-tailwind", output: "c", registry, cwd });
  assert.deepEqual(missing, ["lucide-react"]);
});

test("refuses to overwrite unless asked", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  const opts = { variant: "ts-css", output: "c", registry, cwd };
  await addComponent("button-simple", opts);
  await assert.rejects(addComponent("button-simple", opts), /already exist/);
  await addComponent("button-simple", { ...opts, overwrite: true });
});

test("unknown component gives a clear error", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  await assert.rejects(addComponent("button-nope", { variant: "ts-css", output: "c", registry, cwd }), /not found/);
});

test("rejects registry files that would escape the component folder", async () => {
  const evil = await mkdtemp(join(tmpdir(), "rui-registry-"));
  await mkdir(join(evil, "ts-css"));
  await writeFile(
    join(evil, "ts-css", "button-evil.json"),
    JSON.stringify({ dependencies: [], files: [{ path: "../../evil.js", content: "" }] })
  );
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  await assert.rejects(addComponent("button-evil", { variant: "ts-css", output: "c", registry: evil, cwd }), /unsafe file name/);
});

test("picks the package manager from the lockfile", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "rui-"));
  assert.deepEqual(detectPackageManager(cwd), ["npm", "install"]);
  await writeFile(join(cwd, "pnpm-lock.yaml"), "");
  assert.deepEqual(detectPackageManager(cwd), ["pnpm", "add"]);
});

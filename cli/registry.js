import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

export const DEFAULT_REGISTRY = "https://repeatui.vercel.app/r";
export const FLAVORS = ["ts-tailwind", "ts-css", "js-tailwind", "js-css"];

const COMPONENT_NAME = /^[a-z0-9-]+$/;
const FILE_NAME = /^[\w-]+(\.[\w-]+)+$/;
const PACKAGE_NAME = /^(@[a-z0-9._-]+\/)?[a-z0-9._-]+$/;

// The registry is a URL in normal use, or a local folder (the site's public/r) for tests and offline work.
export async function getJson(registry, path) {
  if (!/^https?:\/\//.test(registry)) {
    try {
      return JSON.parse(await readFile(join(registry, path), "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  let response;
  try {
    response = await fetch(`${registry}/${path}`);
  } catch (error) {
    throw new Error(`Could not reach ${registry}. Check your internet connection. (${error.message})`);
  }
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${registry}/${path} answered ${response.status} ${response.statusText}`);
  return response.json();
}

export function detectPackageManager(cwd) {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return ["pnpm", "add"];
  if (existsSync(join(cwd, "yarn.lock"))) return ["yarn", "add"];
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) return ["bun", "add"];
  return ["npm", "install"];
}

async function installedPackages(cwd) {
  try {
    const pkg = JSON.parse(await readFile(join(cwd, "package.json"), "utf8"));
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    return null;
  }
}

// Writes the component's files to <output>/<name>/ and returns the packages the project still needs.
export async function addComponent(name, { variant, output, overwrite = false, registry = DEFAULT_REGISTRY, cwd = process.cwd() }) {
  if (!FLAVORS.includes(variant)) {
    throw new Error(`Unknown variant "${variant}". Use one of: ${FLAVORS.join(", ")}`);
  }
  if (!COMPONENT_NAME.test(name)) throw new Error(`Invalid component name "${name}"`);

  const item = await getJson(registry, `${variant}/${name}.json`);
  if (!item) throw new Error(`Component "${name}" not found. Run "repeat-ui list" to see all components.`);

  // The registry is fetched over the network, so never let it write outside the component folder
  // or pass anything but a package name to the install command.
  const badFile = item.files.find((f) => !FILE_NAME.test(f.path));
  if (badFile) throw new Error(`Registry sent an unsafe file name: "${badFile.path}"`);
  const badDep = item.dependencies.find((d) => !PACKAGE_NAME.test(d));
  if (badDep) throw new Error(`Registry sent an unsafe package name: "${badDep}"`);

  const dir = join(cwd, output, name);
  const files = item.files.map((f) => ({ path: join(dir, f.path), content: f.content }));
  if (!overwrite) {
    const existing = files.filter((f) => existsSync(f.path)).map((f) => f.path);
    if (existing.length) {
      throw new Error(`These files already exist:\n  ${existing.join("\n  ")}\nUse --overwrite to replace them.`);
    }
  }
  await mkdir(dir, { recursive: true });
  for (const f of files) await writeFile(f.path, f.content);

  const installed = await installedPackages(cwd);
  return {
    files: files.map((f) => f.path),
    missing: item.dependencies.filter((d) => !installed?.[d]),
    hasPackageJson: installed !== null,
  };
}

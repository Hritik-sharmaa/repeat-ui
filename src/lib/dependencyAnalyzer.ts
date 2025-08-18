import { readFile } from "fs/promises";
import { join } from "path";

export interface Dependency {
  name: string;
  version: string;
  description?: string;
  isDevDependency?: boolean;
}

export interface ComponentDependencies {
  dependencies: Dependency[];
  imports: string[];
}

export interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export async function analyzeComponentDependencies(
  sourceCode: string,
  packageJsonPath?: string
): Promise<ComponentDependencies> {
  const imports = extractImports(sourceCode);
  const thirdPartyImports = filterThirdPartyImports(imports);

  let packageJson: PackageJson = {};

  try {
    const packageJsonContent = await readFile(
      packageJsonPath || join(process.cwd(), "package.json"),
      "utf-8"
    );
    packageJson = JSON.parse(packageJsonContent);
  } catch (error) {
    console.warn("Could not read package.json:", error);
  }

  const dependencies = await resolveDependencies(
    thirdPartyImports,
    packageJson
  );

  return {
    dependencies,
    imports: thirdPartyImports,
  };
}

function extractImports(sourceCode: string): string[] {
  const importRegex = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(sourceCode)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

function filterThirdPartyImports(imports: string[]): string[] {
  const nodeBuiltins = new Set([
    "fs",
    "path",
    "crypto",
    "http",
    "https",
    "url",
    "querystring",
    "util",
    "stream",
    "events",
    "buffer",
    "process",
    "os",
    "child_process",
    "react",
    "next",
  ]);

  return imports.filter((importPath) => {
    if (importPath.startsWith(".") || importPath.startsWith("/")) {
      return false;
    }

    if (nodeBuiltins.has(importPath)) {
      return false;
    }

    if (importPath.startsWith("@/")) {
      return false;
    }

    return true;
  });
}

function getBasePackageName(importPath: string): string {
  if (importPath.startsWith("@")) {
    const parts = importPath.split("/");
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
  }

  return importPath.split("/")[0];
}

async function resolveDependencies(
  imports: string[],
  packageJson: PackageJson
): Promise<Dependency[]> {
  const dependencies: Dependency[] = [];
  const processedPackages = new Set<string>();

  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const importPath of imports) {
    const basePackageName = getBasePackageName(importPath);

    if (processedPackages.has(basePackageName)) {
      continue;
    }

    processedPackages.add(basePackageName);

    const version = allDependencies[basePackageName];
    const isDevDependency =
      packageJson.devDependencies?.[basePackageName] !== undefined;

    if (version) {
      dependencies.push({
        name: basePackageName,
        version,
        isDevDependency,
        description: await getPackageDescription(basePackageName),
      });
    }
  }

  return dependencies.sort((a, b) => a.name.localeCompare(b.name));
}

async function getPackageDescription(
  packageName: string
): Promise<string | undefined> {
  const knownDescriptions: Record<string, string> = {
    "react-icons": "Popular icon library for React",
    "motion/react": "Production-ready motion library for React",
    gsap: "Professional-grade animation library",
    "@radix-ui/react-dropdown-menu":
      "Unstyled, accessible dropdown menu component",
    "@radix-ui/react-slot": "Merges its props onto its immediate child",
    "lucide-react": "Beautiful & consistent React icons",
    "next-themes": "Perfect theme switching for Next.js",
    three: "3D graphics library",
    "@react-three/fiber": "React renderer for Three.js",
    "@react-three/drei": "Useful helpers for react-three-fiber",
    clsx: "Utility for constructing className strings",
    "tailwind-merge": "Merge Tailwind CSS classes without style conflicts",
    "class-variance-authority": "Build type-safe UI components with variants",
  };

  return knownDescriptions[packageName];
}

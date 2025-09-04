import fetch from "node-fetch";
import { readFile } from "fs/promises";
import path from "path";
import { ComponentInfo } from "./registry.js";
import { analyzeComponentDependencies } from "../lib/dependencyAnalyzer.js";

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/hritik-sharmaa/repeat-ui/refs/heads/main/src/app/components/content";

async function tryFetchFromGitHub(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // GitHub fetch failed
  }
  return null;
}

async function tryReadFromLocal(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    // Local read failed
  }
  return null;
}

export async function fetchComponentFiles(
  componentKey: string,
  component: ComponentInfo,
  variant: string
): Promise<{ files: Record<string, string>; dependencies: string[] }> {
  const files: Record<string, string> = {};
  const [lang, style] = variant.split("-");
  const allDependencies = new Set(component.dependencies);

  // Map component keys to folder names
  let componentFolderName: string;
  if (componentKey.startsWith("button-")) {
    componentFolderName = componentKey.replace("button-", "");
  } else if (componentKey.startsWith("card-")) {
    componentFolderName = componentKey.replace("card-", "");
  } else if (componentKey.startsWith("texteffect-")) {
    componentFolderName = componentKey.replace("texteffect-", "");
  } else if (componentKey.startsWith("text-effect-")) {
    componentFolderName = componentKey.replace("text-effect-", "");
  } else if (componentKey.startsWith("grid-")) {
    componentFolderName = componentKey.replace("grid-", "");
  } else if (componentKey.startsWith("carousel-")) {
    componentFolderName = componentKey.replace("carousel-", "");
  } else {
    componentFolderName = componentKey;
  }

  try {
    // Fetch main component file
    const componentExt = lang === "ts" ? "tsx" : "jsx";
    const componentUrl = `${GITHUB_RAW_BASE}/${component.category}/${variant}/${componentFolderName}/${component.files.component}.${componentExt}`;
    const componentLocalPath = path.join(
      process.cwd(),
      "src/app/components/content",
      component.category,
      variant,
      componentFolderName,
      `${component.files.component}.${componentExt}`
    );

    let componentContent = await tryFetchFromGitHub(componentUrl);
    if (!componentContent) {
      componentContent = await tryReadFromLocal(componentLocalPath);
    }

    if (componentContent) {
      files[`${componentFolderName}.${componentExt}`] = componentContent;

      // Analyze dependencies from the actual component code
      try {
        const { dependencies: analyzedDeps } =
          await analyzeComponentDependencies(componentContent);
        analyzedDeps.forEach((dep) => {
          if (!dep.name.startsWith(".") && !isBuiltInPackage(dep.name)) {
            allDependencies.add(dep.name);
          }
        });
      } catch (error) {
        console.warn(`Warning: Could not analyze dependencies: ${error}`);
      }
    } else {
      console.warn(
        `Warning: Could not fetch component file from GitHub or local filesystem`
      );
    }

    // Fetch styles if CSS variant and file exists
    if (style === "css" && component.files.styles) {
      const stylesUrl = `${GITHUB_RAW_BASE}/${component.category}/${variant}/${componentFolderName}/${component.files.styles}`;
      const stylesLocalPath = path.join(
        process.cwd(),
        "src/app/components/content",
        component.category,
        variant,
        componentFolderName,
        component.files.styles
      );

      let stylesContent = await tryFetchFromGitHub(stylesUrl);
      if (!stylesContent) {
        stylesContent = await tryReadFromLocal(stylesLocalPath);
      }

      if (stylesContent) {
        files[`${componentFolderName}.css`] = stylesContent;
      }
    }

    // Fetch demo file
    const demoExt = lang === "ts" ? "tsx" : "jsx";
    const demoUrl = `${GITHUB_RAW_BASE}/${component.category}/${variant}/${componentFolderName}/${component.files.demo}.${demoExt}`;
    const demoLocalPath = path.join(
      process.cwd(),
      "src/app/components/content",
      component.category,
      variant,
      componentFolderName,
      `${component.files.demo}.${demoExt}`
    );

    let demoContent = await tryFetchFromGitHub(demoUrl);
    if (!demoContent) {
      demoContent = await tryReadFromLocal(demoLocalPath);
    }

    if (demoContent) {
      files[`${componentFolderName}.demo.${demoExt}`] = demoContent;
    }

    return { files, dependencies: Array.from(allDependencies) };
  } catch (error) {
    throw new Error(`Failed to fetch component files: ${error}`);
  }
}

// Helper function to identify built-in packages that shouldn't be installed
function isBuiltInPackage(packageName: string): boolean {
  const builtInPackages = [
    "react",
    "react-dom",
    "next",
    "next/image",
    "next/router",
    "next/link",
    "fs",
    "path",
    "util",
    "crypto",
    "http",
    "https",
    "url",
    "querystring",
  ];

  return builtInPackages.some(
    (builtIn) =>
      packageName === builtIn || packageName.startsWith(`${builtIn}/`)
  );
}

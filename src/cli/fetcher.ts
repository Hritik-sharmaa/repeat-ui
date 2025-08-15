import fetch from "node-fetch";
import { readFile } from "fs/promises";
import path from "path";
import { ComponentInfo } from "./registry.js";

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

  // Map component keys to folder names
  let componentFolderName: string;
  if (componentKey.startsWith("button-")) {
    componentFolderName = componentKey.replace("button-", "");
  } else if (componentKey.startsWith("card-")) {
    componentFolderName = componentKey.replace("card-", "");
  } else if (componentKey.startsWith("texteffect-")) {
    componentFolderName = componentKey.replace("texteffect-", "");
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

    return { files, dependencies: component.dependencies };
  } catch (error) {
    throw new Error(`Failed to fetch component files: ${error}`);
  }
}

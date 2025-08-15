import fs from "fs-extra";
import path from "path";

export interface WriteOptions {
  outputDir: string;
  componentName: string;
  overwrite: boolean;
  format: boolean;
}

export async function writeComponentFiles(
  files: Record<string, string>,
  options: WriteOptions
): Promise<void> {
  const { outputDir, overwrite, format } = options;

  // Create output directory if it doesn't exist
  await fs.ensureDir(outputDir);

  // Check if any files would be overwritten
  if (!overwrite) {
    for (const fileName of Object.keys(files)) {
      const filePath = path.join(outputDir, fileName);
      if (await fs.pathExists(filePath)) {
        throw new Error(
          `File ${fileName} already exists in ${outputDir}. Use --overwrite to replace it.`
        );
      }
    }
  }

  // Write each file
  for (const [fileName, content] of Object.entries(files)) {
    let processedContent = content;

    if (format && (fileName.endsWith(".tsx") || fileName.endsWith(".jsx"))) {
      try {
        // Basic formatting - remove extra whitespace and normalize line endings
        processedContent = content.trim() + "\n";
      } catch {
        console.warn(`Warning: Could not format ${fileName}`);
      }
    }

    const filePath = path.join(outputDir, fileName);
    await fs.writeFile(filePath, processedContent, "utf-8");
  }
}

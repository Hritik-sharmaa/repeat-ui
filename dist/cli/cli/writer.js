import fs from "fs-extra";
import path from "path";
// Helper function to update categories.ts when a new component is added
export async function updateCategoriesWithNewComponent(category, componentName, projectRoot) {
    const categoriesPath = path.join(projectRoot, "src/data/categories.ts");
    if (await fs.pathExists(categoriesPath)) {
        try {
            let categoriesContent = await fs.readFile(categoriesPath, "utf-8");
            // Find the category and add the new component with today's date
            const today = new Date().toISOString().split("T")[0];
            const newVariant = `createVariant("${componentName}", "${today}")`;
            // Look for the category section and add the new variant
            const categoryRegex = new RegExp(`(name: "${category}"[\\s\\S]*?variants: \\[[\\s\\S]*?)(\\]\\s*,?)`, "i");
            const match = categoriesContent.match(categoryRegex);
            if (match) {
                const beforeClosing = match[1];
                const closing = match[2];
                // Check if there are existing variants to determine comma placement
                const hasExistingVariants = beforeClosing.includes("createVariant(");
                const comma = hasExistingVariants ? "," : "";
                const replacement = `${beforeClosing}${comma}\n          ${newVariant}${closing}`;
                categoriesContent = categoriesContent.replace(categoryRegex, replacement);
                await fs.writeFile(categoriesPath, categoriesContent, "utf-8");
                console.log(`✓ Updated categories.ts with new component: ${componentName}`);
            }
        }
        catch (error) {
            console.warn(`Warning: Could not update categories.ts automatically: ${error}`);
        }
    }
}
export async function writeComponentFiles(files, options) {
    const { outputDir, overwrite, format } = options;
    // Create output directory if it doesn't exist
    await fs.ensureDir(outputDir);
    // Check if any files would be overwritten
    if (!overwrite) {
        for (const fileName of Object.keys(files)) {
            const filePath = path.join(outputDir, fileName);
            if (await fs.pathExists(filePath)) {
                throw new Error(`File ${fileName} already exists in ${outputDir}. Use --overwrite to replace it.`);
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
            }
            catch {
                console.warn(`Warning: Could not format ${fileName}`);
            }
        }
        const filePath = path.join(outputDir, fileName);
        await fs.writeFile(filePath, processedContent, "utf-8");
    }
}

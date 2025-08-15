"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeComponentFiles = writeComponentFiles;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function writeComponentFiles(files, options) {
    const { outputDir, overwrite, format } = options;
    // Create output directory if it doesn't exist
    await fs_extra_1.default.ensureDir(outputDir);
    // Check if any files would be overwritten
    if (!overwrite) {
        for (const fileName of Object.keys(files)) {
            const filePath = path_1.default.join(outputDir, fileName);
            if (await fs_extra_1.default.pathExists(filePath)) {
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
        const filePath = path_1.default.join(outputDir, fileName);
        await fs_extra_1.default.writeFile(filePath, processedContent, "utf-8");
    }
}

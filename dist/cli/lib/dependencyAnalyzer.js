import { readFile } from "fs/promises";
import { join } from "path";
export async function analyzeComponentDependencies(sourceCode, packageJsonPath) {
    const imports = extractImports(sourceCode);
    const thirdPartyImports = filterThirdPartyImports(imports);
    let packageJson = {};
    try {
        const packageJsonContent = await readFile(packageJsonPath || join(process.cwd(), "package.json"), "utf-8");
        packageJson = JSON.parse(packageJsonContent);
    }
    catch (error) {
        console.warn("Could not read package.json:", error);
    }
    const dependencies = await resolveDependencies(thirdPartyImports, packageJson);
    return {
        dependencies,
        imports: thirdPartyImports,
    };
}
function extractImports(sourceCode) {
    const importRegex = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
    const imports = [];
    let match;
    while ((match = importRegex.exec(sourceCode)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}
function filterThirdPartyImports(imports) {
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
    ]);
    const reactEcosystem = new Set([
        "react",
        "react-dom",
        "next/image",
        "next/link",
        "next/router",
        "next/head",
        "next/navigation",
    ]);
    return imports.filter((importPath) => {
        // Skip relative imports
        if (importPath.startsWith(".") || importPath.startsWith("/")) {
            return false;
        }
        // Skip Node.js built-ins
        if (nodeBuiltins.has(importPath)) {
            return false;
        }
        // Skip React ecosystem (assumed to be available)
        if (reactEcosystem.has(importPath)) {
            return false;
        }
        // Skip internal/alias imports
        if (importPath.startsWith("@/")) {
            return false;
        }
        return true;
    });
}
function getBasePackageName(importPath) {
    // Handle special cases like motion/react -> motion
    const specialMappings = {
        "motion/react": "motion",
        "framer-motion": "framer-motion",
    };
    if (specialMappings[importPath]) {
        return specialMappings[importPath];
    }
    if (importPath.startsWith("@")) {
        const parts = importPath.split("/");
        return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
    }
    return importPath.split("/")[0];
}
async function resolveDependencies(imports, packageJson) {
    const dependencies = [];
    const processedPackages = new Set();
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
        const isDevDependency = packageJson.devDependencies?.[basePackageName] !== undefined;
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
async function getPackageDescription(packageName) {
    const knownDescriptions = {
        "react-icons": "Popular icon library for React",
        "motion/react": "Production-ready motion library for React",
        gsap: "Professional-grade animation library",
        "@radix-ui/react-dropdown-menu": "Unstyled, accessible dropdown menu component",
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

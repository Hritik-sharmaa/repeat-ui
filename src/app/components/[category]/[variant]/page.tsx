import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import ComponentTabs from "../../../components/site/ui/ComponentTabs";
import PropTable from "../../site/ui/PropTable";
import InstallationGuide from "../../site/ui/InstallationGuide";
import { analyzeComponentDependencies } from "@/lib/dependencyAnalyzer";
import { categories } from "@/data/categories";
import { generateComponentMetadata } from "@/lib/faviconGenerator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category?: string; variant?: string }>;
}) {
  const category = (await params)?.category?.toLowerCase();
  const variant = (await params)?.variant?.toLowerCase();

  if (!category || !variant) {
    return {
      title: "Component Not Found - Repeat UI",
      description: "The requested component could not be found.",
    };
  }

  return generateComponentMetadata(category, variant);
}

export default async function ComponentVariantPage({
  params,
  searchParams,
}: {
  params: Promise<{ category?: string; variant?: string }>;
  searchParams?: Promise<{ flavor?: string }>;
}) {
  const category = (await params)?.category?.toLowerCase();
  const variant = (await params)?.variant?.toLowerCase();

  const flavor = (await searchParams)?.flavor || "ts-tailwind";
  const [lang, style] = flavor.split("-");

  if (!category || !variant) return notFound();

  const categoryData = categories.find((cat) =>
    cat.subcategories.some((sub) => sub.name.toLowerCase() === category)
  );
  const subcategoryData = categoryData?.subcategories.find(
    (sub) => sub.name.toLowerCase() === category
  );
  const variantData = subcategoryData?.variants.find(
    (v) => v.name.toLowerCase() === variant
  );
  const description = variantData?.description;

  const DemoModule = await import(
    `@/app/components/content/${category}/${flavor}/${variant}/demo`
  );
  const Demo = DemoModule.default;
  const propData = DemoModule.propData || DemoModule.default.propData;

  let sourceCode = "";
  let fileName = "demo.tsx";
  const extensions = lang === "ts" ? ["tsx", "ts"] : ["jsx", "js"];

  try {
    for (const ext of extensions) {
      try {
        const filePath = join(
          process.cwd(),
          "src/app/components/content",
          category,
          flavor,
          variant,
          `preview.${ext}`
        );
        sourceCode = await readFile(filePath, "utf-8");
        fileName = `preview.${ext}`;
        break;
      } catch {}
    }

    if (!sourceCode) {
      sourceCode = "// Source code not available";
      fileName = "preview";
    }
    let cssCode: string | null = null;
    if (style === "css") {
      try {
        const cssPath = join(
          process.cwd(),
          "src/app/components/content",
          category,
          flavor,
          variant,
          "style.css"
        );
        cssCode = await readFile(cssPath, "utf-8");
      } catch {
        cssCode = "// CSS file not found";
      }
    }
    const dependencies = await analyzeComponentDependencies(sourceCode);

    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-6xl font-bold capitalize mb-4 mt-8 font-cal-sans">
            {variant.replace(/-/g, " ")}
          </h1>
          {description && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
              {description}
            </p>
          )}
        </div>

        <ComponentTabs
          component={<Demo />}
          sourceCode={sourceCode}
          fileName={fileName}
          cssCode={cssCode}
        />

        <InstallationGuide
          componentName={`${category}-${variant}`}
          variant={flavor}
          dependencies={dependencies}
        />

       

        <PropTable data={propData} />
      </main>
    );
  } catch (err) {
    console.error("Component not found:", err);
    return notFound();
  }
}

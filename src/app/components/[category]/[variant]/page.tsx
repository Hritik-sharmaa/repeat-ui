import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import ComponentTabs from "../../../components/site/ui/ComponentTabs";
import PropTable from "../../site/ui/PropTable";
import DependencyDisplay from "../../site/ui/DependencyDisplay";
import { analyzeComponentDependencies } from "@/lib/dependencyAnalyzer";

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

  const DemoModule = await import(
    `@/app/components/content/${category}/${flavor}/${variant}/demo`
  );
  const Demo = DemoModule.default;
  // Try both ways to get propData
  const propData = DemoModule.propData || DemoModule.default.propData;

  // Debug: Log what we imported
  console.log(
    `Imported from ${category}/${flavor}/${variant}/demo:`,
    DemoModule
  );
  console.log("propData:", propData);
  console.log("propData type:", typeof propData);
  console.log("propData is array:", Array.isArray(propData));
  console.log("propData length:", propData?.length);
  console.log("DemoModule.propData:", DemoModule.propData);
  console.log("DemoModule.default.propData:", DemoModule.default.propData);

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
          <h1 className="text-6xl font-bold capitalize mb-8 mt-8">
            {variant.replace(/-/g, " ")}
          </h1>
        </div>

        <ComponentTabs
          component={<Demo />}
          sourceCode={sourceCode}
          fileName={fileName}
          cssCode={cssCode}
        />

        <DependencyDisplay dependencies={dependencies} />

        <PropTable data={propData} />
      </main>
    );
  } catch (err) {
    console.error("Component not found:", err);
    return notFound();
  }
}

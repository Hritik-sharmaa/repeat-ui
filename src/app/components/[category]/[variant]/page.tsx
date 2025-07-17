import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import ComponentTabs from "../../../components/site/ui/ComponentTabs";

export default async function ComponentVariantPage({
  params,
  searchParams,
}: {
  params: { category?: string; variant?: string };
  searchParams?: { flavor?: string };
}) {
  const category = params.category?.toLowerCase();
  const variant = params.variant?.toLowerCase();

  const flavor = searchParams?.flavor || "ts-tailwind";
  const [lang, style] = flavor.split("-");

  if (!category || !variant) return notFound();

  const Component = (
    await import(
      `@/app/components/content/${category}/${flavor}/${variant}/preview`
    )
  ).default;

  let sourceCode = "";
  let fileName = "preview.tsx";
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
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold capitalize mb-2">
            {variant.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {category.replace(/-/g, " ")} Component
          </p>
        </div>

        <ComponentTabs
          component={<Component />}
          sourceCode={sourceCode}
          fileName={fileName}
          cssCode={cssCode}
        />
      </main>
    );
  } catch (err) {
    console.error("Component not found:", err);
    return notFound();
  }
}

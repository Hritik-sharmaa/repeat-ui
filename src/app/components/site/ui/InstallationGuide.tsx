"use client";

import { useState } from "react";
import { Copy, Check, Terminal, FileText } from "lucide-react";

interface Dependency {
  name: string;
  version: string;
  description?: string;
  isDevDependency?: boolean;
}

interface ComponentDependencies {
  dependencies: Dependency[];
  imports: string[];
}

interface ManualStep {
  title: string;
  code: string;
  description: string;
  isCodeStep?: boolean;
}

interface InstallationGuideProps {
  componentName: string;
  variant?: string;
  className?: string;
  dependencies?: ComponentDependencies;
}

export default function InstallationGuide({
  componentName,
  variant = "ts-tailwind",
  className = "",
  dependencies,
}: InstallationGuideProps) {
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli");
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const cliCommand = `npx @hritik-sharmaa/repeat-ui add ${componentName} --variant ${variant}`;

  const depNames = dependencies?.dependencies?.map((dep) => dep.name) || [];
  const hasDependendencies = depNames.length > 0;

  const manualSteps: ManualStep[] = [
    ...(hasDependendencies
      ? [
          {
            title: "Install dependencies",
            code: `npm install ${depNames.join(" ")}`,
            description: `Install the required ${depNames.length} ${
              depNames.length === 1 ? "dependency" : "dependencies"
            }: ${depNames.join(", ")}`,
          },
        ]
      : []),
    {
      title: "Copy the component code",
      code: `// 1. Click "Go to Code" button below\n// 2. Navigate to the Code tab above\n// 3. Copy the component source code\n// 4. Save it as ${componentName}.${
        variant.includes("ts") ? "tsx" : "jsx"
      }`,
      description:
        "Navigate to the code section above to copy the component source code and save it in your components directory.",
      isCodeStep: true,
    },
    {
      title: "Import and use",
      code: `import ${componentName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(
          ""
        )} from '@/components/${componentName}';\n\nexport default function MyPage() {\n  return (\n    <div>\n      <${componentName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")} />\n    </div>\n  );\n}`,
      description:
        "Import the component in your project and use it in your pages or components.",
    },
  ];

  const handleCopy = async (text: string, stepIndex?: number) => {
    try {
      await navigator.clipboard.writeText(text);
      if (stepIndex !== undefined) {
        setCopiedStep(stepIndex);
        setTimeout(() => setCopiedStep(null), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTabChange = (tab: "cli" | "manual") => {
    if (tab === activeTab) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 150);
  };

  const handleGoToCode = () => {
    const codeSection = document.querySelector("[data-component-tabs]");
    if (codeSection) {
      codeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const codeTab = document.querySelector(
          "[data-code-tab]"
        ) as HTMLButtonElement;
        if (codeTab) {
          codeTab.click();
        }
      }, 500);
    }
  };

  return (
    <section className={`mt-8 lg:mt-12 ${className}`}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Installation
            </h2>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm lg:text-base">
          Choose your preferred installation method. CLI is recommended for the
          fastest setup.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-8">
        <button
          onClick={() => handleTabChange("cli")}
          className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2 rounded-xl font-medium text-sm transition-all duration-300 border group ${
            activeTab === "cli"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-lg scale-[1.02]"
              : "tab-theme hover:scale-[1.01] hover:shadow-md"
          }`}>
          <Terminal className="w-4 h-4" />
          <span>CLI (Recommended)</span>
        </button>

        <button
          onClick={() => handleTabChange("manual")}
          className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2 rounded-xl font-medium text-sm transition-all duration-300 border group ${
            activeTab === "manual"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white shadow-lg scale-[1.02]"
              : "tab-theme hover:scale-[1.01] hover:shadow-md"
          }`}>
          <FileText className="w-4 h-4" />
          <span>Manual Installation</span>
        </button>
      </div>

      <div
        className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-300 ${
          isAnimating ? "opacity-50 scale-98" : "opacity-100 scale-100"
        }`}>
        {activeTab === "cli" ? (
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Quick Install</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    One command, zero configuration
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="flex flex-col lg:flex-row gap-3 p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-950 dark:to-zinc-900 rounded-xl border border-zinc-700 shadow-inner">
                <code className="flex-1 text-sm font-mono text-green-400 overflow-x-auto scrollbar-none">
                  <span className="text-zinc-500">$</span> {cliCommand}
                </code>

                <button
                  onClick={() => handleCopy(cliCommand, -1)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    copiedStep === -1
                      ? "bg-green-600 text-white shadow-lg scale-105"
                      : "bg-zinc-700 hover:bg-zinc-600 text-white hover:shadow-md hover:scale-105"
                  }`}
                  title={copiedStep === -1 ? "Copied!" : "Copy command"}>
                  {copiedStep === -1 ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 lg:p-8">
            <div className="space-y-8">
              {manualSteps.map((step: ManualStep, index: number) => (
                <div key={index} className="group relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg lg:text-xl font-semibold">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="ml-0 lg:ml-14">
                    <div className="flex flex-col lg:flex-row gap-3">
                      <div className="flex-1 relative group">
                        <code className="block text-sm font-mono bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-950 dark:to-zinc-900 text-zinc-300 p-4 rounded-xl border border-zinc-700 overflow-x-auto whitespace-pre-wrap shadow-inner">
                          {step.code}
                        </code>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        {step.isCodeStep ? (
                          <button
                            onClick={handleGoToCode}
                            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-black text-white transition-all duration-200 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                            title="Go to code section">
                            <FileText className="w-4 h-4" />
                            <span>Go to Code</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCopy(step.code, index)}
                            className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap ${
                              copiedStep === index
                                ? "bg-green-600 text-white shadow-lg scale-105"
                                : "bg-black hover:to-zinc-500 text-white hover:shadow-lg hover:scale-105"
                            }`}
                            title={
                              copiedStep === index ? "Copied!" : "Copy code"
                            }>
                            {copiedStep === index ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {index < manualSteps.length - 1 && (
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-10 flex justify-center">
                        <div className="w-px h-6 bg-gradient-to-b from-zinc-300 to-transparent dark:from-zinc-600"></div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-transparent dark:from-zinc-700 dark:via-zinc-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

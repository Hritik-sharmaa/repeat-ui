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
  const [showAllSteps] = useState(false);

  const cliCommand = `npx @hritik-sharmaa/repeat-ui add ${componentName} --variant ${variant}`;

  const depNames = dependencies?.dependencies?.map((dep) => dep.name) || [];
  const hasDependendencies = depNames.length > 0;

  const manualSteps = [
    ...(hasDependendencies
      ? [
          {
            title: "Install dependencies",
            code: `npm install ${depNames.join(" ")}`,
            description: `Install the required dependencies: ${depNames.join(
              ", "
            )}`,
          },
        ]
      : []),
    {
      title: "Copy the component code",
      code: `// 1. Click "Go to Code" button below
// 2. Navigate to the Code tab above
// 3. Copy the component source code
// 4. Save it as ${componentName}.${variant.includes("ts") ? "tsx" : "jsx"}`,
      description:
        "Navigate to the code section above to copy the component source code and save it in your components directory.",
      isCodeStep: true,
    },
    {
      title: "Import and use",
      code: `import ${componentName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")} from '@/components/${componentName}';

export default function MyPage() {
  return (
    <div>
      <${componentName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")} />
    </div>
  );
}`,
      description:
        "Import the component in your project and use it in your pages or components.",
    },
  ];

  const visibleSteps = showAllSteps ? manualSteps : manualSteps.slice(0, 4);

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
    <div className={`mt-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Installation</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Choose your preferred installation method below.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("cli")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border ${
            activeTab === "cli"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
              : "tab-theme"
          }`}>
          <Terminal className="w-4 h-4" />
          CLI (Recommended)
        </button>

        <button
          onClick={() => setActiveTab("manual")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 border ${
            activeTab === "manual"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
              : "tab-theme"
          }`}>
          <FileText className="w-4 h-4" />
          Manual
        </button>
      </div>

      <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 overflow-hidden">
        {activeTab === "cli" ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                  1
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                Install with one command
              </h3>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <code className="flex-1 text-sm font-mono bg-zinc-900 dark:bg-zinc-950 text-white px-4 py-3 rounded-lg border border-zinc-700 overflow-x-auto">
                <span className="text-zinc-400">{cliCommand}</span>
              </code>

              <button
                onClick={() => handleCopy(cliCommand, -1)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  copiedStep === -1
                    ? "bg-green-600 text-white"
                    : "bg-black hover:bg-zinc-800 text-white hover:shadow-md"
                }`}
                title={copiedStep === -1 ? "Copied!" : "Copy command"}>
                {copiedStep === -1 ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {visibleSteps.map((step, index) => (
              <div
                key={index}
                className="border-b dark:border-zinc-700 last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 ml-11">
                  {step.description}
                </p>

                <div className="ml-11">
                  <div className="flex items-start gap-3">
                    <code className="flex-1 text-sm font-mono bg-zinc-900 dark:bg-zinc-950 text-zinc-300 px-4 py-3 rounded-lg border border-zinc-700 overflow-x-auto whitespace-pre-wrap">
                      {step.code}
                    </code>

                    {step.isCodeStep ? (
                      <button
                        onClick={handleGoToCode}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-black hover:bg-zinc-800 text-white transition-all duration-200 hover:shadow-md"
                        title="Go to code section">
                        <FileText className="w-4 h-4" />
                        Go to Code
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCopy(step.code, index)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          copiedStep === index
                            ? "bg-green-600 text-white"
                            : "bg-black hover:bg-zinc-800 text-white hover:shadow-md"
                        }`}
                        title={copiedStep === index ? "Copied!" : "Copy code"}>
                        {copiedStep === index ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

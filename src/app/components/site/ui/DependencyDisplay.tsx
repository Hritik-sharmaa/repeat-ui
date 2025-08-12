"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { ComponentDependencies } from "@/lib/dependencyAnalyzer";

interface DependencyDisplayProps {
  dependencies: ComponentDependencies;
  className?: string;
}

export default function DependencyDisplay({
  dependencies,
  className = "",
}: DependencyDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (dependencies.dependencies.length === 0) {
    return null;
  }

  const handleCopy = async () => {
    const installCommand = `npm install ${dependencies.dependencies
      .map((dep) => dep.name)
      .join(" ")}`;

    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`mt-6 p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-3 mb-6">

        <div className="flex-1">
          <h3 className="text-xl font-semibold">
            Dependencies
          </h3>
        </div>
      </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <code className="block w-full text-sm font-mono bg-slate-900 dark:bg-slate-950 text-green-400 px-4 py-3 rounded-lg border border-slate-700 overflow-x-auto">
              <span className="text-slate-500">$</span> npm install{" "}
              {dependencies.dependencies.map((dep) => dep.name).join(" ")}
            </code>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
            }`}
            title={copied ? "Copied!" : "Copy install command"}>
            {copied ? (
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

  );
}

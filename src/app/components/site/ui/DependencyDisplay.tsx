"use client";

import React from "react";
import { Package } from "lucide-react";
import type { ComponentDependencies } from "@/lib/dependencyAnalyzer";

interface DependencyDisplayProps {
  dependencies: ComponentDependencies;
  className?: string;
}

export default function DependencyDisplay({
  dependencies,
  className = "",
}: DependencyDisplayProps) {
  if (dependencies.dependencies.length === 0) {
    return null;
  }

  return (
    <div
      className={`mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dependencies
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({dependencies.dependencies.length})
        </span>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-700">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Quick Install
        </h4>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
            npm install{" "}
            {dependencies.dependencies.map((dep) => dep.name).join(" ")}
          </code>
          <button
            onClick={() => {
              const installCommand = `npm install ${dependencies.dependencies
                .map((dep) => dep.name)
                .join(" ")}`;
              navigator.clipboard.writeText(installCommand);
            }}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Copy install command">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

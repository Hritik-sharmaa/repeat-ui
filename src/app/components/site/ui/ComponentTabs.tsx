"use client";

import { useState } from "react";
import { Check, Copy, Eye, Code } from "lucide-react";

interface ComponentTabsProps {
  component: React.ReactNode;
  sourceCode: string;
  fileName: string;
  cssCode?: string | null;
}

export default function ComponentTabs({
  component,
  sourceCode,
  fileName,
  cssCode,
}: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "css">(
    "preview"
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
            ${
              activeTab === "preview"
                ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-900"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }
          `}>
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
            ${
              activeTab === "code"
                ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-900"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }
          `}>
          <Code className="w-4 h-4" />
          <span>{fileName}</span>
        </button>

        {cssCode && (
          <button
            onClick={() => setActiveTab("css")}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === "css"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-gray-900"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }
            `}>
            <Code className="w-4 h-4" />
            <span>style.css</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === "preview" && (
          <div className="p-8 bg-white dark:bg-gray-900 min-h-[400px] flex items-center justify-center">
            {component}
          </div>
        )}

        {(activeTab === "code" || activeTab === "css") && (
          <div className="relative">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-sm">
              <span className="font-mono">
                {activeTab === "css" ? "style.css" : fileName}
              </span>
              <button
                onClick={() =>
                  handleCopy(activeTab === "css" ? cssCode || "" : sourceCode)
                }
                className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-700 rounded transition-colors">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto">
              <pre className="bg-gray-900 text-gray-100 p-4 text-sm leading-relaxed">
                <code>{activeTab === "css" ? cssCode : sourceCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

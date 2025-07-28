"use client";
import { useState } from "react";
import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  const [showFullCode, setShowFullCode] = useState(false);

  const codeToDisplay = (
    activeTab === "css" ? cssCode || "" : sourceCode
  ).split("\n");

  const visibleCode = showFullCode ? codeToDisplay : codeToDisplay.slice(0, 20);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getLanguage = (filename: string, isCSS = false) => {
    if (isCSS) return "css";

    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "tsx":
      case "jsx":
        return "tsx";
      case "ts":
        return "typescript";
      case "js":
        return "javascript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      default:
        return "typescript";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("preview")}
          className={`group flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm
            ${
              activeTab === "preview"
                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-100 dark:shadow-blue-900/20"
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
            }
          `}>
          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`group flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm
            ${
              activeTab === "code"
                ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-100 dark:shadow-blue-900/20"
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
            }
          `}>
          <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Code</span>
        </button>

        {cssCode && (
          <button
            onClick={() => setActiveTab("css")}
            className={`group flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm
              ${
                activeTab === "css"
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-blue-100 dark:shadow-blue-900/20"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
              }
            `}>
            <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>CSS</span>
          </button>
        )}
      </div>

      <div className="border border-gray-200/60 dark:border-gray-700/60 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900">
        {activeTab === "preview" && (
          <div className="p-8 bg-gradient-to-br from-gray-50/30 to-white dark:from-gray-900/30 dark:to-gray-900 min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-full flex justify-center">
              {component}
            </div>
          </div>
        )}

        {(activeTab === "code" || activeTab === "css") && (
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="font-mono text-sm text-gray-300">
                  {activeTab === "css" ? "style.css" : fileName}
                </span>
              </div>

              <button
                onClick={() =>
                  handleCopy(activeTab === "css" ? cssCode || "" : sourceCode)
                }
                className="group flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-700/50 rounded-lg transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400 transition-transform group-hover:scale-110" />
                    <span className="text-green-400 text-sm font-medium">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-300 transition-transform group-hover:scale-110" />
                    <span className="text-gray-300 text-sm font-medium">
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto max-w-full">
              <SyntaxHighlighter
                language={getLanguage(fileName, activeTab === "css")}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "24px",
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
                showLineNumbers={false}
                wrapLines={true}
                wrapLongLines={true}>
                {visibleCode.join("\n")}
              </SyntaxHighlighter>

              {codeToDisplay.length > 20 && (
                <div className="text-center p-2 bg-gray-100 dark:bg-gray-800">
                  <button
                    onClick={() => setShowFullCode(!showFullCode)}
                    className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    {showFullCode ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

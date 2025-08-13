"use client";
import { useState } from "react";
import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Eye,
  Code,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

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
  const [componentKey, setComponentKey] = useState(0);

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

  const handleReloadComponent = () => {
    setComponentKey((prev) => prev + 1);
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
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
            activeTab === "preview" ? "tab-active-theme" : "tab-theme"
          }`}>
          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
            activeTab === "code" ? "tab-active-theme" : "tab-theme"
          }`}>
          <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Code</span>
        </button>

        {cssCode && (
          <button
            onClick={() => setActiveTab("css")}
            className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
              activeTab === "css" ? "tab-active-theme" : "tab-theme"
            }`}>
            <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>CSS</span>
          </button>
        )}
      </div>

      <div className="rounded-xl overflow-hidden shadow-sm tab-content-theme border-theme">
        {activeTab === "preview" && (
          <div className="relative p-8 tab-preview-theme min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-full flex justify-center">
              <div key={componentKey}>{component}</div>
            </div>

            <button
              onClick={handleReloadComponent}
              className="absolute bottom-4 right-4 group flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm tab-theme hover:tab-active-theme backdrop-blur-sm"
              title="Reload component animation">
              <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
            </button>
          </div>
        )}

        {(activeTab === "code" || activeTab === "css") && (
          <div className="relative">
            <div className="flex items-center justify-between px-5 py-3 float-right">
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
                <div className="relative">
                  {!showFullCode && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-sm"></div>
                  )}
                  <div className="relative text-center p-6">
                    <button
                      onClick={() => setShowFullCode(!showFullCode)}
                      className="flex items-center gap-2 px-6 py-3 text-sm rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 shadow-lg">
                      <span>{showFullCode ? "Show Less" : "Show More"}</span>
                      {showFullCode ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

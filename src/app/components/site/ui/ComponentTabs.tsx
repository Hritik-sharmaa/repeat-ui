"use client";
import { useState } from "react";
import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
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

  const getCustomTheme = () => {
    const isLight = theme === "light";
    return {
      'code[class*="language-"]': {
        color: isLight ? "#1f2937" : "#e5e7eb",
        background: "transparent",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: "1.5",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        tabSize: "4",
        hyphens: "none",
      },
      'pre[class*="language-"]': {
        color: isLight ? "#1f2937" : "#e5e7eb",
        background: "transparent",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: "1.5",
        direction: "ltr",
        textAlign: "left",
        whiteSpace: "pre",
        wordSpacing: "normal",
        wordBreak: "normal",
        wordWrap: "normal",
        tabSize: "4",
        hyphens: "none",
      },
      token: {
        color: isLight ? "#1f2937" : "#e5e7eb",
      },
      "token.comment": {
        color: isLight ? "#6b7280" : "#9ca3af",
        fontStyle: "italic",
      },
      "token.prolog": {
        color: isLight ? "#6b7280" : "#9ca3af",
      },
      "token.doctype": {
        color: isLight ? "#6b7280" : "#9ca3af",
      },
      "token.cdata": {
        color: isLight ? "#6b7280" : "#9ca3af",
      },
      "token.punctuation": {
        color: isLight ? "#374151" : "#d1d5db",
      },
      "token.property": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.tag": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.boolean": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.number": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.constant": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.symbol": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.deleted": {
        color: isLight ? "#dc2626" : "#f87171",
      },
      "token.selector": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.attr-name": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.string": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.char": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.builtin": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.inserted": {
        color: isLight ? "#059669" : "#34d399",
      },
      "token.operator": {
        color: isLight ? "#2563eb" : "#60a5fa",
      },
      "token.entity": {
        color: isLight ? "#2563eb" : "#60a5fa",
        cursor: "help",
      },
      "token.url": {
        color: isLight ? "#2563eb" : "#60a5fa",
      },
      "token.variable": {
        color: isLight ? "#2563eb" : "#60a5fa",
      },
      "token.atrule": {
        color: isLight ? "#7c3aed" : "#a78bfa",
      },
      "token.attr-value": {
        color: isLight ? "#7c3aed" : "#a78bfa",
      },
      "token.function": {
        color: isLight ? "#7c3aed" : "#a78bfa",
      },
      "token.class-name": {
        color: isLight ? "#7c3aed" : "#a78bfa",
      },
      "token.keyword": {
        color: isLight ? "#dc2626" : "#f87171",
        fontWeight: "bold",
      },
      "token.regex": {
        color: isLight ? "#ea580c" : "#fb923c",
      },
      "token.important": {
        color: isLight ? "#ea580c" : "#fb923c",
        fontWeight: "bold",
      },
    };
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
    <div className="w-full" data-component-tabs>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("preview")}
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm  ${
            activeTab === "preview" ? "bg-zinc-900 text-white dark:bg-white dark:text-black" : "tab-theme"
          }`}>
          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          data-code-tab
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
            activeTab === "code" ? "bg-zinc-900 text-white dark:bg-white dark:text-black" : "tab-theme"
          }`}>
          <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Code</span>
        </button>

        {cssCode && (
          <button
            onClick={() => setActiveTab("css")}
            className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
              activeTab === "css" ? "bg-zinc-900 text-white dark:bg-white dark:text-black" : "tab-theme"
            }`}>
            <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>CSS</span>
          </button>
        )}
      </div>

      <div className="rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900/20 bg-[#f7ce89]/40">
        {activeTab === "preview" && (
          <div className="relative p-8 dark:bg-zinc-900/20 min-h-[400px] flex items-center justify-center">
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
            <div className="absolute top-3 right-5 z-10">
              <button
                onClick={() =>
                  handleCopy(activeTab === "css" ? cssCode || "" : sourceCode)
                }
                className="group flex items-center space-x-2 px-3 py-1.5 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 border dark:border-gray-600/30 dark:hover:border-gray-500/50 bg-zinc-800 text-white backdrop-blur-sm">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 dark:text-green-400 text-green-400 transition-transform group-hover:scale-110" />
                    <span className="dark:text-green-400 text-green-400 text-sm font-medium">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 dark:text-gray-300 transition-transform group-hover:scale-110" />
                    <span className="dark:text-gray-300 text-sm font-medium">
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>

            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-max">
                <SyntaxHighlighter
                  language={getLanguage(fileName, activeTab === "css")}
                  style={getCustomTheme()}
                  customStyle={{
                    margin: 0,
                    padding: "24px",
                    paddingTop: "20px",
                    backgroundColor: "transparent",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    width: "max-content",
                    minWidth: "100%",
                  }}
                  showLineNumbers={false}
                  wrapLines={false}
                  wrapLongLines={false}>
                  {visibleCode.join("\n")}
                </SyntaxHighlighter>
              </div>
            </div>

            {codeToDisplay.length > 20 && (
              <div className="relative">
                {!showFullCode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-sm pointer-events-none"></div>
                )}
                <div className="relative text-center p-6">
                  <button
                    onClick={() => setShowFullCode(!showFullCode)}
                    className="flex items-center gap-2 px-6 py-3 text-sm rounded-lg bg-zinc-800 text-white border-zinc-900 dark:bg-white/10 backdrop-blur-md border dark:border-white/20 dark:text-white dark:hover:bg-white/20 transition-all duration-200 shadow-lg">
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
        )}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
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
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { useRef } from "react";

declare module "react-syntax-highlighter/dist/cjs/styles/prism";

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
  const tabListRef = useRef<HTMLDivElement>(null);

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
    return theme === "light" ? oneLight : tomorrow;
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

  const smoothScroll = (direction: "up" | "down", amount?: number) => {
    const el = tabListRef.current;
    if (!el) return;
    const scrollAmount = amount ?? 820;
    const targetY =
      direction === "up"
        ? el.scrollTop - scrollAmount
        : el.scrollTop + scrollAmount;
    gsap.to(el, {
      duration: 2.5,
      scrollTo: { y: targetY },
      ease: "expo.out",
    });
  };

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      smoothScroll(e.deltaY < 0 ? "up" : "down", Math.abs(e.deltaY));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeTab]);

  return (
    <div className="w-full" data-component-tabs>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("preview")}
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm  ${
            activeTab === "preview"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
              : "tab-theme"
          }`}>
          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          data-code-tab
          className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
            activeTab === "code"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
              : "tab-theme"
          }`}>
          <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Code</span>
        </button>

        {cssCode && (
          <button
            onClick={() => setActiveTab("css")}
            className={`group flex items-center space-x-2 px-4 py-[6px] rounded-lg font-medium text-sm transition-all duration-200 border shadow-sm ${
              activeTab === "css"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                : "tab-theme"
            }`}>
            <Code className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>CSS</span>
          </button>
        )}
      </div>

      <div className="rounded-xl overflow-hidden shadow-sm dark:bg-zinc-900/20 bg-neutral-200">
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
                className="group flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 text-white backdrop-blur-sm bg-black dark:bg-neutral-100 dark:text-black">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 dark:text-green-400 text-green-400 transition-transform group-hover:scale-110" />
                    <span className="dark:text-green-400 text-green-400 text-sm font-medium">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div
              className="w-full overflow-x-auto custom-scrollbar relative"
              ref={tabListRef}>
              <div className="min-w-max">
                <SyntaxHighlighter
                  language={getLanguage(fileName, activeTab === "css")}
                  style={getCustomTheme()}
                  customStyle={{
                    margin: 0,
                    padding: "24px",
                    paddingTop: "20px",
                    paddingBottom:
                      codeToDisplay.length > 20 && !showFullCode
                        ? "80px"
                        : "24px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                  className={
                    theme === "light"
                      ? "custom-linenumber-light"
                      : "custom-linenumber-dark"
                  }>
                  {visibleCode.join("\n")}
                </SyntaxHighlighter>
                <style>{`
                  .custom-linenumber-light .react-syntax-highlighter-line-number {
                    color: #6b7280 !important;
                  }
                  .custom-linenumber-dark .react-syntax-highlighter-line-number {
                    color: #a1a1aa !important;
                  }
                `}</style>
              </div>

              <button
                className="absolute top-2 right-2 z-20 bg-black/60 text-white rounded-full p-2 shadow hover:bg-black"
                onClick={() => smoothScroll("up")}
                title="Scroll Up"
                style={{ display: "block" }}>
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                className="absolute bottom-2 right-2 z-20 bg-black/60 text-white rounded-full p-2 shadow hover:bg-black"
                onClick={() => smoothScroll("down")}
                title="Scroll Down"
                style={{ display: "block" }}>
                <ChevronDown className="w-4 h-4" />
              </button>

              {codeToDisplay.length > 20 && (
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  {!showFullCode && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-lg pointer-events-none rounded-b-xl" />
                  )}
                  <div className="relative text-center p-6">
                    <button
                      onClick={() => setShowFullCode(!showFullCode)}
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-black dark:bg-white/10 dark:hover:bg-white/20 hover:bg-black/70 text-white border border-white/20 hover:border-white/30 transition-all duration-200 shadow-sm mx-auto">
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

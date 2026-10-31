"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { tintStyle } from "@/site/categoryStyle";
import { AnimatePresence, motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ChevronDown, Code2, Eye, Maximize2, Minimize2, Palette, RotateCcw } from "lucide-react";
import { Segmented } from "@/site/ui/Segmented";
import { CopyButton } from "@/site/ui/CopyButton";
import { codeTheme } from "@/site/ui/codeTheme";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code" | "css";
const COLLAPSED_LINES = 24;

interface ComponentTabsProps {
  category: string;
  component: React.ReactNode;
  sourceCode: string;
  fileName: string;
  cssCode?: string | null;
}

export default function ComponentTabs({ category, component, sourceCode, fileName, cssCode }: ComponentTabsProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [replay, setReplay] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const preview = (
    <div
      className={cn(
        "relative flex flex-col bg-surface",
        fullscreen && "h-full overflow-hidden rounded-3xl border border-line-strong shadow-2xl"
      )}>
      <div aria-hidden className="tint-glow pointer-events-none absolute inset-0" />
      <div className="relative flex items-center justify-between border-b border-line py-1.5 pl-5 pr-2">
        <span className="inline-flex items-center gap-2 text-xs text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--tint) opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-(--tint)" />
          </span>
          Live preview
        </span>
        <div className="flex items-center gap-1">
          <ToolButton label="Replay the animation" onClick={() => setReplay((n) => n + 1)}>
            <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-180" />
          </ToolButton>
          <ToolButton label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => setFullscreen((f) => !f)}>
            {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </ToolButton>
        </div>
      </div>
      {/* Wide components scroll sideways; "safe" centring keeps their left edge reachable. */}
      <div
        className={cn(
          "thin-scrollbar relative flex flex-1 items-center overflow-auto p-6 sm:p-10",
          !fullscreen && "min-h-[420px] sm:min-h-[500px]"
        )}>
        <div aria-hidden className="bg-dots fade-edges pointer-events-none absolute inset-0" />
        <div key={replay} className="relative flex w-full justify-center-safe">
          {component}
        </div>
      </div>
    </div>
  );

  const options = [
    { value: "preview" as const, label: <><Eye className="size-3.5" />Preview</> },
    { value: "code" as const, label: <><Code2 className="size-3.5" />Code</> },
    ...(cssCode ? [{ value: "css" as const, label: <><Palette className="size-3.5" />CSS</> }] : []),
  ];

  return (
    <div id="preview" data-component-tabs className="scroll-mt-20">
      <div className="mb-3">
        <Segmented label="View" value={tab} onChange={setTab} options={options} />
      </div>

      {/* Lets the Installation guide open the Code tab. */}
      <button type="button" data-code-tab hidden onClick={() => setTab("code")} />

      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.18 }}>
            {tab === "preview" ? (
              fullscreen ? (
                // Fullscreen renders on <body>: the fade on this wrapper would otherwise trap a fixed panel.
                <>
                  <div className="min-h-[420px] sm:min-h-[500px]" />
                  {createPortal(
                    <div className="fixed inset-0 z-50 bg-black/50 p-3 backdrop-blur-sm sm:p-6" style={tintStyle(category)}>
                      {preview}
                    </div>,
                    document.body
                  )}
                </>
              ) : (
                preview
              )
            ) : (
              <CodeView
                code={tab === "css" ? cssCode ?? "" : sourceCode}
                fileName={tab === "css" ? "style.css" : fileName}
                language={tab === "css" ? "css" : /\.jsx?$/.test(fileName) ? "jsx" : "tsx"}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="group grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg">
      {children}
    </button>
  );
}

function CodeView({ code, fileName, language }: { code: string; fileName: string; language: string }) {
  const [expanded, setExpanded] = useState(false);
  const lines = code.split("\n");
  const collapsible = lines.length > COLLAPSED_LINES;
  const shown = collapsible && !expanded ? lines.slice(0, COLLAPSED_LINES).join("\n") : code;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line py-1.5 pl-5 pr-2">
        <span className="font-mono text-xs text-muted">{fileName}</span>
        <CopyButton text={code} label={`Copy ${fileName}`} />
      </div>
      <div className="relative">
        <div className="thin-scrollbar overflow-x-auto">
          <SyntaxHighlighter
            language={language}
            style={codeTheme}
            showLineNumbers
            lineNumberStyle={{ color: "var(--subtle)", minWidth: "2.5em", paddingRight: "1.25em" }}
            customStyle={{ padding: "20px 20px 20px 8px" }}>
            {shown}
          </SyntaxHighlighter>
        </div>
        {collapsible && (
          <div
            className={cn(
              "flex justify-center pb-5",
              !expanded && "absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/90 to-transparent pt-24"
            )}>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg">
              {expanded ? "Collapse" : `Show all ${lines.length} lines`}
              <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ChevronDown, Code2, Eye, Palette, RotateCcw } from "lucide-react";
import { Segmented } from "@/site/ui/Segmented";
import { CopyButton } from "@/site/ui/CopyButton";
import { codeTheme } from "@/site/ui/codeTheme";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code" | "css";
const COLLAPSED_LINES = 24;

interface ComponentTabsProps {
  component: React.ReactNode;
  sourceCode: string;
  fileName: string;
  cssCode?: string | null;
}

export default function ComponentTabs({ component, sourceCode, fileName, cssCode }: ComponentTabsProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [replay, setReplay] = useState(0);

  const options = [
    { value: "preview" as const, label: <><Eye className="size-3.5" />Preview</> },
    { value: "code" as const, label: <><Code2 className="size-3.5" />Code</> },
    ...(cssCode ? [{ value: "css" as const, label: <><Palette className="size-3.5" />CSS</> }] : []),
  ];

  return (
    <div data-component-tabs className="scroll-mt-20">
      <div className="mb-3 flex items-center justify-between gap-3">
        <Segmented label="View" value={tab} onChange={setTab} options={options} />
        {tab === "preview" && (
          <button
            type="button"
            onClick={() => setReplay((n) => n + 1)}
            className="group inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg">
            <RotateCcw className="size-3.5 transition-transform duration-500 group-hover:-rotate-180" />
            Replay
          </button>
        )}
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
              // Wide components scroll sideways; "safe" centring keeps their left edge reachable.
              <div className="thin-scrollbar relative flex min-h-[420px] items-center overflow-x-auto p-6 sm:min-h-[480px] sm:p-10">
                <div aria-hidden className="bg-dots fade-edges pointer-events-none absolute inset-0" />
                <div key={replay} className="relative flex w-full justify-center-safe">
                  {component}
                </div>
              </div>
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

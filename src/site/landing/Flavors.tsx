"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileCode2 } from "lucide-react";
import tsTailwind from "@/registry/__generated__/ts-tailwind/button-simple.json";
import tsCss from "@/registry/__generated__/ts-css/button-simple.json";
import jsTailwind from "@/registry/__generated__/js-tailwind/button-simple.json";
import jsCss from "@/registry/__generated__/js-css/button-simple.json";
import { Segmented } from "@/site/ui/Segmented";
import { Reveal } from "@/site/motion/Reveal";
import { cn } from "@/lib/utils";

// The real files for one component, as the CLI writes them.
const ITEMS = { "ts-tailwind": tsTailwind, "ts-css": tsCss, "js-tailwind": jsTailwind, "js-css": jsCss };

export function Flavors() {
  const [lang, setLang] = useState<"ts" | "js">("ts");
  const [style, setStyle] = useState<"tailwind" | "css">("tailwind");
  const files = ITEMS[`${lang}-${style}`].files.filter((f) => !f.path.startsWith("demo."));
  const [fileIndex, setFileIndex] = useState(0);
  const file = files[Math.min(fileIndex, files.length - 1)];

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex gap-1">
                {files.map((f, i) => (
                  <button
                    key={f.path}
                    type="button"
                    onClick={() => setFileIndex(i)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs transition-colors",
                      f === file ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                    )}>
                    <FileCode2 className="size-3.5" />
                    {f.path}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Segmented
                  size="sm"
                  label="Language"
                  value={lang}
                  onChange={setLang}
                  options={[{ value: "ts", label: "TS" }, { value: "js", label: "JS" }]}
                />
                <Segmented
                  size="sm"
                  label="Styling"
                  value={style}
                  onChange={setStyle}
                  options={[{ value: "tailwind", label: "Tailwind" }, { value: "css", label: "CSS" }]}
                />
              </div>
            </div>
            <div className="relative h-[340px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={`${lang}-${style}-${file.path}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.25 }}
                  className="thin-scrollbar absolute inset-0 overflow-auto p-5 font-mono text-[12.5px] leading-relaxed text-muted">
                  {file.content}
                </motion.pre>
              </AnimatePresence>
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Flavors</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Four flavors. <span className="font-serif font-normal">One</span> component.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Every component ships in TypeScript and JavaScript, styled with Tailwind or plain CSS.
            Flip the switches: this is the real code you get.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Segmented } from "@/site/ui/Segmented";
import { CopyButton } from "@/site/ui/CopyButton";
import { Command } from "@/site/ui/Command";

interface InstallationGuideProps {
  componentName: string;
  shadcnName: string;
  variant?: string;
  dependencies?: string[];
}

type Method = "cli" | "shadcn" | "manual";

export default function InstallationGuide({
  componentName,
  shadcnName,
  variant = "ts-tailwind",
  dependencies = [],
}: InstallationGuideProps) {
  const [method, setMethod] = useState<Method>("cli");
  const folder = `components/repeat-ui/${componentName}`;
  const ext = variant.startsWith("ts") ? "tsx" : "jsx";
  const pascal = componentName.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase()).replace(/^(\d)/, "C$1");

  const usage = `import ${pascal} from "@/${folder}/preview";\n\nexport default function Page() {\n  return <${pascal} />;\n}`;

  const openCode = () => {
    document.querySelector("[data-component-tabs]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector<HTMLButtonElement>("[data-code-tab]")?.click();
  };

  return (
    <section id="installation" className="mt-16 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <Segmented
          label="Installation method"
          value={method}
          onChange={setMethod}
          options={[
            { value: "cli", label: "CLI" },
            { value: "shadcn", label: "shadcn" },
            { value: "manual", label: "Manual" },
          ]}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="mt-5">
          {method === "cli" && (
            <Steps>
              <Step title="Run the command" text="Adds the files and installs any packages they need. Works with npm, pnpm, yarn and bun.">
                <Command text={`npx @hritik-sharmaa/repeat-ui add ${componentName} --variant ${variant}`} />
              </Step>
              <Step title="Use it" text={`The files are in ${folder}/.`}>
                <Snippet text={usage} />
              </Step>
            </Steps>
          )}
          {method === "shadcn" && (
            <Steps>
              <Step title="Run the command" text="For projects already set up with shadcn (they have a components.json).">
                {/* shortcut: full URL until @repeat-ui is listed in the shadcn registry directory,
                    then switch to `npx shadcn@latest add @repeat-ui/${shadcnName}`. */}
                <Command text={`npx shadcn@latest add https://repeatui.vercel.app/r/${shadcnName}.json`} />
              </Step>
              <Step title="Use it" text={`The files are in ${folder}/.`}>
                <Snippet text={usage} />
              </Step>
            </Steps>
          )}
          {method === "manual" && (
            <Steps>
              {dependencies.length > 0 && (
                <Step title="Install the packages" text={`This component uses ${dependencies.join(", ")}.`}>
                  <Command text={`npm install ${dependencies.join(" ")}`} />
                </Step>
              )}
              <Step
                title="Copy the code"
                text={`Save the Code tab as ${folder}/preview.${ext}${variant.endsWith("css") ? ", and the CSS tab as style.css next to it" : ""}.`}>
                <button
                  type="button"
                  onClick={openCode}
                  className="inline-flex h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-transform active:scale-[0.97]">
                  Open the code
                </button>
              </Step>
              <Step title="Use it">
                <Snippet text={usage} />
              </Step>
            </Steps>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="relative space-y-8 border-l border-line pl-8 [counter-reset:step]">{children}</ol>;
}

function Step({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <li className="relative [counter-increment:step] before:absolute before:-left-[45px] before:top-0 before:grid before:size-[26px] before:place-items-center before:rounded-full before:border before:border-line before:bg-bg before:font-mono before:text-xs before:text-muted before:content-[counter(step)]">
      <h3 className="font-medium">{title}</h3>
      {text && <p className="mt-1 text-sm text-muted">{text}</p>}
      {children && <div className="mt-3">{children}</div>}
    </li>
  );
}

function Snippet({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl border border-line bg-surface">
      <pre className="thin-scrollbar overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-relaxed">{text}</pre>
      <CopyButton text={text} label="Copy snippet" className="absolute right-1.5 top-1.5" />
    </div>
  );
}

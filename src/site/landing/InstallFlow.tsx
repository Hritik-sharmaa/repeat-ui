"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/site/motion/Reveal";
import { cn } from "@/lib/utils";

// Real components with their real files and packages (see public/r/<name>.json).
const RUNS = [
  { name: "text-effect-typing-text", deps: ["motion"] },
  { name: "carousel-loop-deck", deps: ["lucide-react"] },
  { name: "button-wiggle", deps: [] },
];

const STEPS = [
  { title: "Pick", text: "Find a component, then choose TypeScript or JavaScript, Tailwind or plain CSS." },
  { title: "Add", text: "Run our CLI, or the shadcn CLI. The packages it needs install for you." },
  { title: "Own it", text: "The files land in your repo. No runtime package, nothing to update, change anything." },
];

// The terminal plays: type the command, add, list files, pause, then the next component.
type Phase = "typing" | "adding" | "done" | "pause";

export function InstallFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const current = RUNS[run];
  const command = `npx @hritik-sharmaa/repeat-ui add ${current.name}`;

  useEffect(() => {
    if (!inView || reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      timer = typed < command.length
        ? setTimeout(() => setTyped((n) => n + 1), 28)
        : setTimeout(() => setPhase("adding"), 300);
    } else if (phase === "adding") {
      timer = setTimeout(() => setPhase("done"), 900);
    } else if (phase === "done") {
      timer = setTimeout(() => setPhase("pause"), 2600);
    } else {
      timer = setTimeout(() => {
        setRun((r) => (r + 1) % RUNS.length);
        setTyped(0);
        setPhase("typing");
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [inView, reduce, phase, typed, command.length]);

  // Without motion, show one finished run.
  const shownTyped = reduce ? command.length : typed;
  const shownPhase: Phase = reduce ? "done" : phase;
  const activeStep = shownPhase === "typing" ? 1 : shownPhase === "pause" ? 0 : 2;

  return (
    <section id="install" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Install</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            One command. <span className="font-serif font-normal">Your</span> code.
          </h2>
          <ol className="mt-10 space-y-2">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "relative rounded-2xl border p-5 transition-colors duration-500",
                  i === activeStep ? "border-line-strong bg-surface" : "border-transparent"
                )}>
                <div className="flex items-baseline gap-4">
                  <span className={cn("font-mono text-sm transition-colors", i === activeStep ? "text-accent" : "text-subtle")}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-[#0b0b0d] text-[13px] text-zinc-300 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              {["bg-white/15", "bg-white/15", "bg-white/15"].map((c, i) => (
                <span key={i} className={cn("size-2.5 rounded-full", c)} />
              ))}
              <span className="ml-3 font-mono text-xs text-zinc-500">~/my-app</span>
            </div>
            <div className="min-h-[300px] space-y-1.5 p-6 font-mono leading-relaxed">
              <p className="break-all">
                <span className="text-zinc-500">$ </span>
                {command.slice(0, shownTyped)}
                {shownPhase === "typing" && (
                  <motion.span
                    className="ml-px inline-block h-4 w-2 translate-y-0.5 bg-accent"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </p>
              <AnimatePresence mode="popLayout">
                {shownPhase === "adding" && (
                  <motion.p key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-zinc-400">
                    <Spinner /> Adding {current.name}...
                  </motion.p>
                )}
                {(shownPhase === "done" || shownPhase === "pause") && (
                  <motion.div key={`done-${run}`} initial="hidden" animate="show" exit={{ opacity: 0 }} variants={{ show: { transition: { staggerChildren: 0.14 } } }}>
                    {[
                      <><span className="text-emerald-400">✔</span> Added {current.name}</>,
                      <><span className="text-emerald-400">+</span> components/repeat-ui/{current.name}/preview.tsx</>,
                      <><span className="text-emerald-400">+</span> components/repeat-ui/{current.name}/demo.tsx</>,
                      ...(current.deps.length
                        ? [<><span className="text-sky-400">→</span> Installing {current.deps.join(", ")}...</>]
                        : []),
                    ].map((line, i) => (
                      <motion.p
                        key={i}
                        className="break-all"
                        variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                        {line}
                      </motion.p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <motion.span
      className="inline-block text-accent"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
      ◐
    </motion.span>
  );
}

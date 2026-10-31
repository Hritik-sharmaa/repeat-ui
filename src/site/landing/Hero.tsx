"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allComponents } from "@/data/categories";
import { CopyButton } from "@/site/ui/CopyButton";
import { formatName } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const COMMAND = "npx @hritik-sharmaa/repeat-ui add";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-8 sm:pt-44">
      {/* Grid that fades out from the middle, and a warm glow above the headline. */}
      <div aria-hidden className="absolute inset-0 bg-grid fade-edges opacity-70" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div {...rise(0)}>
          <Link
            href="/components"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-1 pr-3 text-sm backdrop-blur transition-colors hover:border-line-strong">
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-fg">
              {allComponents.length} components
            </span>
            <span className="text-shimmer">Free and open source</span>
            <ArrowRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <h1 className="mt-8 text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          {["Copy.", "Paste."].map((word, i) => (
            <motion.span key={word} className="mr-[0.22em] inline-block" {...rise(0.1 + i * 0.12)}>
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block pr-[0.08em] font-serif font-normal tracking-[-0.02em] text-accent"
            {...rise(0.4)}>
            Repeat.
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-xl text-balance text-lg text-muted sm:text-xl"
          {...rise(0.55)}>
          Animated React components you own. Add one with a single command, in TypeScript or
          JavaScript, with Tailwind or plain CSS.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          {...rise(0.7)}>
          <Link
            href="/components"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-transform active:scale-[0.97]">
            Browse components
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="inline-flex h-11 max-w-full items-center gap-3 rounded-full border border-line bg-surface/70 pl-5 pr-1.5 font-mono text-[13px] backdrop-blur">
            <span className="text-subtle">$</span>
            <span className="no-scrollbar overflow-x-auto whitespace-nowrap">{COMMAND}</span>
            <CopyButton text={COMMAND} label="Copy install command" className="rounded-full" />
          </div>
        </motion.div>
      </div>

      <motion.div className="relative mt-20" {...rise(0.9)}>
        <Ticker />
      </motion.div>
    </section>
  );
}

// Every component name, scrolling past forever. Hovering pauses it.
function Ticker() {
  // The track holds the list twice and slides by one copy, so the loop has no seam.
  const items = [0, 1].flatMap((copy) =>
    allComponents.map((c) => (
      <Link
        key={`${copy}-${c.category}-${c.name}`}
        href={`/components/${c.category}/${c.name}`}
        aria-hidden={copy === 1 || undefined}
        tabIndex={copy === 1 ? -1 : undefined}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg">
        <span className="size-1.5 rounded-full bg-subtle transition-colors group-hover:bg-accent" />
        {formatName(c.name)}
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    ))
  );
  return (
    <div className="group/ticker overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      <div
        className="flex w-max animate-marquee gap-3 [--marquee-gap:0.75rem] group-hover/ticker:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: "70s" }}>
        {items}
      </div>
    </div>
  );
}

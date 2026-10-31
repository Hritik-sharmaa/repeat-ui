"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { LogoMark } from "@/site/brand/Logo";
import { Reveal } from "@/site/motion/Reveal";
import { GITHUB_URL } from "@/lib/utils";

export function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div ref={ref} className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-20 text-center">
          <div aria-hidden className="bg-grid fade-edges absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
          <div className="relative">
            {/* The mark plays its beat once when the section comes into view. */}
            {inView && <LogoMark animate className="mx-auto size-14" />}
            {!inView && <div className="mx-auto size-14" />}
            <h2 className="mt-8 text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              Ship it. Then <span className="font-serif font-normal text-accent">repeat</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted">
              Start with any component. Every one of them is free.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/components"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-transform active:scale-[0.97]">
                Browse components
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-6 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2">
                <Github className="size-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

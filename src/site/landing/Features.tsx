"use client";

import { Boxes, Github, Layers, Sparkles } from "lucide-react";
import { Reveal } from "@/site/motion/Reveal";
import { trackPointer } from "@/lib/utils";

const FEATURES = [
  { icon: Sparkles, title: "Motion built in", text: "Every component moves. Hover, press, type, drag, loop." },
  { icon: Layers, title: "Works with shadcn", text: "Add any component with npx shadcn add, into the same folder." },
  { icon: Boxes, title: "No lock-in", text: "No runtime package. The code is copied into your repo, yours to change." },
  { icon: Github, title: "Free and open source", text: "MIT licensed. Every component is free, and contributions are welcome." },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid overflow-hidden rounded-3xl border border-line sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={i * 0.06}
            onPointerMove={trackPointer}
            className="group relative border-line p-7 max-lg:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0">
            <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon className="relative size-5 text-accent" strokeWidth={1.75} />
            <h3 className="relative mt-5 font-medium">{title}</h3>
            <p className="relative mt-2 text-sm text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

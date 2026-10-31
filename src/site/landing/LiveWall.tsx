"use client";

import { DemoTile } from "@/site/ui/DemoTile";
import { Reveal } from "@/site/motion/Reveal";

const TILES = [
  { category: "text-effect", variants: ["typing-text"], title: "Typing Text", href: "/components/text-effect/typing-text", className: "md:col-span-2" },
  { category: "button", variants: ["wiggle", "bubble", "letter"], title: "Buttons", href: "/components/button" },
  { category: "card", variants: ["3d-card"], title: "3D Card", href: "/components/card/3d-card" },
  { category: "text-effect", variants: ["flow-text"], title: "Flow Text", href: "/components/text-effect/flow-text", className: "md:col-span-2", scale: 0.75 },
  { category: "carousel", variants: ["loop-deck"], title: "Loop Deck", href: "/components/carousel/loop-deck" },
  { category: "commons", variants: ["accordian"], title: "Accordion", href: "/components/commons/accordian", className: "md:col-span-2", scale: 0.8 },
];

export function LiveWall() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Live</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Made to be seen <span className="font-serif font-normal">moving</span>.
        </h2>
        <p className="mt-4 text-lg text-muted">
          Every tile is the real component, running right here. Click through for the code.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TILES.map(({ className, ...tile }, i) => (
          <Reveal key={tile.title} delay={(i % 3) * 0.08} className={className}>
            <DemoTile {...tile} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

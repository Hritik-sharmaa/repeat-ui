"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { cn, trackPointer } from "@/lib/utils";
import LoopDeckDemo from "@/registry/carousel/loop-deck/tailwind/demo";
import Card3DDemo from "@/registry/card/3d-card/tailwind/demo";
import FlowTextDemo from "@/registry/text-effect/flow-text/tailwind/demo";
import TextShadowDemo from "@/registry/text-effect/text-shadow/tailwind/demo";
import SplitRevealDemo from "@/registry/text-effect/split-reveal-text/tailwind/demo";
import FlippingTextDemo from "@/registry/text-effect/flipping-text/tailwind/demo";
import PopTextDemo from "@/registry/text-effect/pop-text/tailwind/demo";
import SimpleDemo from "@/registry/button/simple/tailwind/demo";
import PulseDemo from "@/registry/button/pulse/tailwind/demo";
import SketchyDemo from "@/registry/button/sketchy/tailwind/demo";
import BubbleDemo from "@/registry/button/bubble/tailwind/demo";
import FillDemo from "@/registry/button/fill/tailwind/demo";
import LayersDemo from "@/registry/button/layers/tailwind/demo";
import LetterDemo from "@/registry/button/letter/tailwind/demo";
import WiggleDemo from "@/registry/button/wiggle/tailwind/demo";

const buttons = [
  { name: "simple", Demo: SimpleDemo },
  { name: "pulse", Demo: PulseDemo },
  { name: "sketchy", Demo: SketchyDemo },
  { name: "bubble", Demo: BubbleDemo },
  { name: "fill", Demo: FillDemo },
  { name: "layers", Demo: LayersDemo },
  { name: "letter", Demo: LetterDemo },
  { name: "wiggle", Demo: WiggleDemo },
];

function Cell({
  href,
  name,
  category,
  className,
  shrink,
  children,
}: {
  href: string;
  name: string;
  category: string;
  className?: string;
  /** Renders the demo at full size in a bigger box, then scales it down to fit the tile. */
  shrink?: number;
  children: ReactNode;
}) {
  return (
    <div
      onPointerMove={trackPointer}
      className={cn(
        "spotlight relative flex flex-col overflow-hidden bg-bg",
        className,
      )}>
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        {shrink ? (
          <div
            className="absolute left-1/2 top-1/2 flex items-center justify-center"
            style={{
              width: `${100 / shrink}%`,
              height: `${100 / shrink}%`,
              transform: `translate(-50%, -50%) scale(${shrink})`,
            }}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-2 text-sm">
        <p>
          <span className="font-medium">{name}</span>{" "}
          <span className="text-muted">{category}</span>
        </p>
        <Link
          href={href}
          aria-label={`Open ${name}`}
          className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg transition-colors">
          <Code2 className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-line">
      <div className="grid auto-rows-[19rem] grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
        <Cell
          href="/components/carousel/loop-deck"
          name="Loop deck"
          category="Carousel"
          className="row-span-2 md:col-span-2">
          <div className="w-full max-w-xl">
            <LoopDeckDemo />
          </div>
        </Cell>
        <Cell
          href="/components/card/3d-card"
          name="3D card"
          category="Card"
          className="row-span-2">
          <Card3DDemo />
        </Cell>
        <Cell
          href="/components/text-effect/flow-text"
          name="Flow text"
          category="Text effect"
          className="md:col-span-2">
          <div className="w-full">
            <FlowTextDemo />
          </div>
        </Cell>
        <Cell
          href="/components/text-effect/text-shadow"
          name="Text shadow"
          category="Text effect"
          shrink={0.5}>
          <TextShadowDemo />
        </Cell>
        <Cell
          href="/components/text-effect/split-reveal-text"
          name="Split reveal"
          category="Text effect">
          <SplitRevealDemo />
        </Cell>
        <Cell
          href="/components/text-effect/flipping-text"
          name="Flipping text"
          category="Text effect"
          shrink={0.75}>
          <FlippingTextDemo />
        </Cell>
        <Cell
          href="/components/text-effect/pop-text"
          name="Pop text"
          category="Text effect"
          shrink={0.5}>
          <PopTextDemo />
        </Cell>
      </div>

      <div className="mt-px bg-bg">
        <div className="flex items-center justify-between px-5 pt-5 text-sm">
          <p>
            <span className="font-medium">Buttons</span>{" "}
            <span className="text-muted">{buttons.length} styles</span>
          </p>
          <Link
            href="/components/button"
            className="text-muted hover:text-fg transition-colors">
            See all buttons
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {buttons.map(({ name, Demo }) => (
            <div
              key={name}
              className="flex h-40 flex-col items-center justify-center gap-5 p-3">
              <Demo />
              <Link
                href={`/components/button/${name}`}
                className="text-xs capitalize text-muted hover:text-fg transition-colors">
                {name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

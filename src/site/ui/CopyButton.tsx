"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// Copying "repeats": each copy sends a ghost of the icon floating up, and copying again counts (×2, ×3).
export function CopyButton({
  text,
  className,
  label = "Copy",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const [copies, setCopies] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text is still selectable.
      return;
    }
    setCopies((n) => n + 1);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "relative grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg",
        className
      )}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}>
          {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
        </motion.span>
      </AnimatePresence>

      {/* The ghost: a copy of the icon that drifts up and fades. */}
      <AnimatePresence>
        {copied && (
          <motion.span
            key={copies}
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center text-accent"
            initial={{ y: 0, opacity: 0.7, scale: 1 }}
            animate={{ y: -18, opacity: 0, scale: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Copy className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && copies > 1 && (
          <motion.span
            key={`count-${copies}`}
            aria-hidden
            initial={{ y: 4, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -right-1 -top-1 rounded-full bg-accent px-1 font-mono text-[9px] leading-[14px] text-accent-fg">
            ×{copies}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

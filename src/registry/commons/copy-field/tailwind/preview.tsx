"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface CopyFieldProps {
  text?: string;
  prefix?: string;
  accentColor?: string;
  background?: string;
  textColor?: string;
  showCount?: boolean;
  onCopy?: (count: number) => void;
  className?: string;
}

// A command to copy. Each copy sends a ghost of the text floating up, sweeps a shine across the
// field and, from the second copy on, counts them.
const CopyField = ({
  text = "npx @hritik-sharmaa/repeat-ui add button-echo",
  prefix = "$",
  accentColor = "#fa5f1b",
  background = "#0a0a0a",
  textColor = "#e5e5e5",
  showCount = true,
  onCopy,
  className = "",
}: CopyFieldProps) => {
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
    onCopy?.(copies + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={`group relative flex w-full max-w-lg items-center gap-3 overflow-visible rounded-2xl border border-white/10 py-2 pl-5 pr-2 font-mono text-sm leading-none shadow-xl transition-colors duration-300 hover:border-white/20 ${className}`}
      style={{ background, color: textColor }}
    >
      <style>{`@keyframes rui-caret { 50% { opacity: 0; } }`}</style>
      {prefix && (
        <span
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          style={{ color: accentColor }}
        >
          {prefix}
        </span>
      )}
      <span className="relative min-w-0 flex-1">
        <span className="flex items-center overflow-x-auto whitespace-nowrap py-2 [scrollbar-width:none]">
          {text}
          {/* A terminal caret, blinking after the command. */}
          <span
            aria-hidden
            className="ml-1 inline-block h-[1.1em] w-[2px] shrink-0 animate-[rui-caret_1.1s_steps(1)_infinite]"
            style={{ background: accentColor }}
          />
        </span>
        <AnimatePresence>
          {copied && (
            <motion.span
              key={copies}
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-2 truncate whitespace-nowrap"
              style={{ color: accentColor }}
              initial={{ y: 0, opacity: 0.9 }}
              animate={{ y: -28, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <AnimatePresence>
          {copied && (
            <motion.span
              key={copies}
              className="absolute inset-y-0 w-1/3 -skew-x-12"
              style={{
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${accentColor} 25%, transparent), transparent)`,
              }}
              initial={{ left: "-40%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy"}
        className="relative grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/10 transition-[background-color,transform] duration-200 hover:bg-white/10 active:scale-90"
        style={{ color: copied ? accentColor : textColor }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.svg
            key={copied ? "check" : "copy"}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            {copied ? (
              <path d="M20 6 9 17l-5-5" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </motion.svg>
        </AnimatePresence>
        <AnimatePresence>
          {showCount && copied && copies > 1 && (
            <motion.span
              key={`n-${copies}`}
              className="absolute -right-1.5 -top-1.5 rounded-full px-1.5 font-sans text-[10px] font-bold leading-4 text-white"
              style={{ background: accentColor }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ×{copies}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default CopyField;

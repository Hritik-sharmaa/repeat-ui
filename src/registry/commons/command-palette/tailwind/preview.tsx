"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  trigger:
    "inline-flex h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/10 px-4 text-sm shadow-lg transition-colors duration-200 hover:border-white/25",
  kbd: "rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[11px] opacity-70",
  rowKbd: "relative rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[11px] opacity-70",
  overlay: "fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm",
  panel: "w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-2xl",
  search: "flex items-center gap-3 border-b border-white/10 px-4",
  input: "min-w-0 flex-1 border-0 bg-transparent text-sm outline-none placeholder:opacity-50",
  list: "max-h-80 overflow-y-auto p-2",
  group: "px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider opacity-50",
  row: "relative flex w-full cursor-pointer items-center gap-3 rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-sm",
  rowHighlight: "absolute inset-0 rounded-lg",
  rowIcon: "relative grid size-4 place-items-center opacity-70",
  rowLabel: "relative flex-1 truncate",
  empty: "px-3 py-10 text-center text-sm opacity-50",
  footer: "flex items-center gap-4 border-t border-white/10 px-4 py-2.5 text-[11px] opacity-50",
};

export interface CommandItem {
  id: string;
  label: string;
  group: string;
  shortcut?: string;
  icon?: ReactNode;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  buttonLabel?: string;
  hotkey?: string;
  accentColor?: string;
  background?: string;
  textColor?: string;
  onSelect?: (item: CommandItem) => void;
  className?: string;
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// ⌘K / Ctrl+K: a searchable list of actions in groups. Arrow keys move a highlight that glides
// between rows; Enter runs the action.
const CommandPalette = ({
  items,
  placeholder = "Type a command or search...",
  buttonLabel = "Search commands",
  hotkey = "k",
  accentColor = "#fa5f1b",
  background = "#171717",
  textColor = "#fafafa",
  onSelect,
  className = "",
}: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightId = useId();

  const show = () => {
    setQuery("");
    setActive(0);
    setOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        if (open) return setOpen(false);
        setQuery("");
        setActive(0);
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey, open]);

  // Matches, ordered by group, in the order groups first appear.
  const matches = items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
  const groups = [...new Set(matches.map((m) => m.group))];
  const ordered = groups.flatMap((g) => matches.filter((m) => m.group === g));
  const current = Math.min(active, ordered.length - 1);

  useEffect(() => {
    rowRefs.current[current]?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const run = (item: CommandItem) => {
    onSelect?.(item);
    setOpen(false);
  };

  const onInputKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + ordered.length) % Math.max(ordered.length, 1));
    }
    if (e.key === "Enter" && ordered[current]) run(ordered[current]);
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={show} className={`${C.trigger} ${className}`} style={{ background, color: textColor }}>
        <SearchIcon />
        <span style={{ opacity: 0.6 }}>{buttonLabel}</span>
        <kbd className={C.kbd}>Ctrl {hotkey.toUpperCase()}</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={C.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}>
            <motion.div
              role="dialog"
              aria-label="Command palette"
              className={C.panel}
              style={{ background, color: textColor }}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              onClick={(e) => e.stopPropagation()}>
              <div className={C.search}>
                <span style={{ opacity: 0.5 }}>
                  <SearchIcon />
                </span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder={placeholder}
                  className={C.input}
                  style={{ color: textColor, height: 52 }}
                />
                <kbd className={C.kbd}>Esc</kbd>
              </div>
              <div className={C.list}>
                {ordered.length === 0 && <p className={C.empty}>No results for “{query}”.</p>}
                {groups.map((group) => (
                  <div key={group}>
                    <p className={C.group}>{group}</p>
                    {ordered.map((item, i) =>
                      item.group !== group ? null : (
                        <button
                          key={item.id}
                          ref={(el) => {
                            rowRefs.current[i] = el;
                          }}
                          type="button"
                          className={C.row}
                          style={{ color: textColor }}
                          onMouseMove={() => i !== current && setActive(i)}
                          onClick={() => run(item)}>
                          {i === current && (
                            <motion.span
                              layoutId={highlightId}
                              className={C.rowHighlight}
                              style={{
                                background: `color-mix(in srgb, ${accentColor} 16%, transparent)`,
                                boxShadow: `inset 2px 0 0 ${accentColor}`,
                              }}
                              transition={{ type: "spring", stiffness: 500, damping: 38 }}
                            />
                          )}
                          {item.icon && <span className={C.rowIcon}>{item.icon}</span>}
                          <span className={C.rowLabel}>{item.label}</span>
                          {item.shortcut && <kbd className={C.rowKbd}>{item.shortcut}</kbd>}
                        </button>
                      ),
                    )}
                  </div>
                ))}
              </div>
              <div className={C.footer}>
                <span>↑ ↓ to move</span>
                <span>↵ to run</span>
                <span>Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;

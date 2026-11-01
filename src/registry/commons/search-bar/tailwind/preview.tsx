"use client";

import { useEffect, useState, type ChangeEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Search, X } from "lucide-react";

export type SearchWithHotkeyProps = {
  placeholder?: string;
  className?: string;
  enableHotkey?: boolean;
  enableModal?: boolean;
  hotkey?: string;
  width?: number;
  radius?: number;
  accentColor?: string;
  onSearch?: (query: string) => void;
};

// A search field. With `enableModal` it is a button that opens a search dialog, also on Ctrl/⌘ + hotkey.
const SearchWithHotkey = ({
  placeholder = "Search...",
  enableHotkey = true,
  enableModal = true,
  hotkey = "k",
  width = 300,
  radius = 12,
  accentColor = "#f97316",
  className = "",
  onSearch,
}: SearchWithHotkeyProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!enableHotkey || !enableModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableHotkey, enableModal, hotkey]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!enableModal) onSearch?.(e.target.value);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && enableModal) onSearch?.(query);
    if (e.key === "Escape") setOpen(false);
  };

  const shortcut = enableHotkey && (
    <kbd className="ml-auto rounded bg-neutral-200 px-2 py-1 font-sans text-xs text-neutral-500">Ctrl {hotkey.toUpperCase()}</kbd>
  );

  if (!enableModal) {
    return (
      <label
        className={`flex cursor-text items-center gap-2 border-2 border-transparent bg-neutral-100 px-4 py-2 transition focus-within:border-[var(--rui-accent)] hover:bg-neutral-200 ${className}`}
        style={{ width, borderRadius: radius, ["--rui-accent" as string]: accentColor }}>
        <Search className="size-4 shrink-0 text-neutral-500" />
        <input
          value={query}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-neutral-700 outline-none"
        />
        {shortcut}
      </label>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 bg-neutral-100 px-4 py-2 text-left transition hover:bg-neutral-200"
        style={{ width, borderRadius: radius }}>
        <Search className="size-4 shrink-0 text-neutral-500" />
        <span className="text-neutral-600">{placeholder}</span>
        {shortcut}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-label="Search"
            className="w-full max-w-lg bg-white p-4 shadow-2xl"
            style={{ borderRadius: radius + 4 }}
            onClick={(e) => e.stopPropagation()}>
            <div
              className="flex items-center gap-2 border-2 px-3 py-2"
              style={{ borderColor: accentColor, borderRadius: radius }}>
              <Search className="size-5 shrink-0 text-neutral-500" />
              <input
                autoFocus
                value={query}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
                type="text"
                placeholder={placeholder}
                className="w-full border-none bg-transparent text-neutral-700 outline-none"
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="cursor-pointer px-1 text-neutral-400 hover:text-neutral-600">
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithHotkey;

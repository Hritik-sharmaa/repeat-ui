"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Search, X } from "lucide-react";
import "./style.css";

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
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === hotkey.toLowerCase()
      ) {
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
    <kbd className="rui-search-kbd">Ctrl {hotkey.toUpperCase()}</kbd>
  );

  if (!enableModal) {
    return (
      <label
        className={`rui-search-field ${className}`}
        style={{
          width,
          maxWidth: "100%",
          borderRadius: radius,
          ["--rui-accent" as string]: accentColor,
        }}
      >
        <Search className="rui-search-icon" />
        <input
          value={query}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="rui-search-input"
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
        className="rui-search-trigger"
        style={{ width, maxWidth: "100%", borderRadius: radius }}
      >
        <Search className="rui-search-icon" />
        <span className="rui-search-placeholder">{placeholder}</span>
        {shortcut}
      </button>

      {open && (
        <div className="rui-search-overlay" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-label="Search"
            className="rui-search-dialog"
            style={{ borderRadius: radius + 4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rui-search-box"
              style={{ borderColor: accentColor, borderRadius: radius }}
            >
              <Search className="rui-search-icon rui-search-icon-lg" />
              <input
                autoFocus
                value={query}
                onChange={onChange}
                onKeyDown={onInputKeyDown}
                type="text"
                placeholder={placeholder}
                className="rui-search-input"
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rui-search-close"
              >
                <X className="rui-search-icon-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithHotkey;

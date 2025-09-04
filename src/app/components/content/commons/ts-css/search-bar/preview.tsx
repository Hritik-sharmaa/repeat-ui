"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import "./style.css";

type SearchWithHotkeyProps = {
  placeholder?: string;
  className?: string;
  enableHotkey?: boolean;
  enableModal?: boolean;
  onSearch?: (query: string) => void;
};

const SearchWithHotkey = ({
  placeholder = "Search...",
  enableHotkey = true,
  enableModal = true,
  className = "",
  onSearch,
}: SearchWithHotkeyProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!enableHotkey || !enableModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableHotkey, enableModal]);

  const handleSearch = (searchQuery: string) => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!enableModal) {
      handleSearch(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && enableModal) {
      handleSearch(query);
    }
  };

  if (!enableModal) {
    return (
      <div className={`${className}`}>
        <div className="search-box">
          <Search className="icon" />
          <input
            value={query}
            onChange={handleInputChange}
            type="text"
            placeholder={placeholder}
            className="search-input"
          />
          {enableHotkey && <kbd className="shortcut">Ctrl K</kbd>}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <button onClick={() => setOpen(true)} className="search-button">
        <Search className="icon" />
        <span className="placeholder-text">{placeholder}</span>
        {enableHotkey && <kbd className="shortcut">Ctrl K</kbd>}
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-input-wrapper">
              <Search className="icon" />
              <input
                autoFocus
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder={placeholder}
                className="search-input"
              />
              <button onClick={() => setOpen(false)} className="close-btn">
                <X className="icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithHotkey;

"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

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
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition w-[300px]">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={handleInputChange}
            type="text"
            placeholder={placeholder}
            className="w-full outline-none border-none bg-transparent text-gray-700"
          />
          {enableHotkey && (
            <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={` ${className}`}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition w-[300px]">
        <Search className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600">{placeholder}</span>
        {enableHotkey && (
          <kbd className="ml-auto px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">
            Ctrl K
          </kbd>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                autoFocus
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder={placeholder}
                className="w-full outline-none border-none bg-transparent text-gray-700"
              />
              <button
                onClick={() => setOpen(false)}
                className="px-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithHotkey;

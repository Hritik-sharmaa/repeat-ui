"use client";

import type { ComponentProps, ReactNode } from "react";
import CommandPalette from "./preview";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

const items = [
  {
    id: "home",
    group: "Navigation",
    label: "Go to home",
    shortcut: "G H",
    icon: (
      <Icon>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </Icon>
    ),
  },
  {
    id: "components",
    group: "Navigation",
    label: "Browse components",
    shortcut: "G C",
    icon: (
      <Icon>
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </Icon>
    ),
  },
  {
    id: "docs",
    group: "Navigation",
    label: "Read the docs",
    icon: (
      <Icon>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icon>
    ),
  },
  {
    id: "copy",
    group: "Actions",
    label: "Copy page link",
    shortcut: "⌘ L",
    icon: (
      <Icon>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </Icon>
    ),
  },
  {
    id: "theme",
    group: "Actions",
    label: "Toggle theme",
    shortcut: "⌘ J",
    icon: (
      <Icon>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </Icon>
    ),
  },
  {
    id: "new",
    group: "Actions",
    label: "New component",
    shortcut: "⌘ N",
    icon: (
      <Icon>
        <path d="M5 12h14M12 5v14" />
      </Icon>
    ),
  },
  {
    id: "github",
    group: "Links",
    label: "Open GitHub",
    icon: (
      <Icon>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
      </Icon>
    ),
  },
];

const CommandPaletteDemo = (
  props: Partial<ComponentProps<typeof CommandPalette>>,
) => <CommandPalette items={items} {...props} />;

export default CommandPaletteDemo;

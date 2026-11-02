"use client";

import type { ComponentProps, ReactNode } from "react";
import Dock from "./preview";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
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
    label: "Home",
    icon: (
      <Icon>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </Icon>
    ),
  },
  {
    label: "Search",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </Icon>
    ),
  },
  {
    label: "Music",
    icon: (
      <Icon>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </Icon>
    ),
  },
  {
    label: "Photos",
    icon: (
      <Icon>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </Icon>
    ),
  },
  {
    label: "Mail",
    icon: (
      <Icon>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </Icon>
    ),
  },
  {
    label: "Calendar",
    icon: (
      <Icon>
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </Icon>
    ),
  },
];

const DockDemo = (props: Partial<ComponentProps<typeof Dock>>) => (
  <div style={{ width: "100%", paddingTop: 80 }}>
    <Dock items={items} {...props} />
  </div>
);

export default DockDemo;

"use client";

import type { ComponentProps, ReactNode } from "react";
import SpotlightCard from "./preview";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden>
    {children}
  </svg>
);

const cards = [
  {
    title: "Copy",
    description: "Find a component you like and copy it straight from the page.",
    icon: (
      <Icon>
        <rect width="14" height="14" x="8" y="8" rx="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </Icon>
    ),
  },
  {
    title: "Paste",
    description: "Drop it into your app. It is your code now, so change anything.",
    icon: (
      <Icon>
        <rect width="8" height="4" x="8" y="2" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </Icon>
    ),
  },
  {
    title: "Repeat",
    description: "Come back for the next one. Every piece fits with the last.",
    icon: (
      <Icon>
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </Icon>
    ),
  },
];

// Three cards on a grid that wraps on narrow screens; the Customize panel's title and description change the first.
const SpotlightCardDemo = ({ title, description, ...props }: ComponentProps<typeof SpotlightCard>) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
      gap: 16,
      width: "100%",
      maxWidth: 896,
    }}>
    {cards.map((card, i) => (
      <SpotlightCard
        key={card.title}
        icon={card.icon}
        title={i === 0 && title ? title : card.title}
        description={i === 0 && description ? description : card.description}
        {...props}
      />
    ))}
  </div>
);

export default SpotlightCardDemo;

"use client";

import type { ComponentProps } from "react";
import ScrollTimeline from "./preview";

const items = [
  { date: "Aug 2025", title: "The first button", description: "Repeat UI starts with ten hover buttons and a copy button." },
  {
    date: "Sep 2025",
    title: "Cards and carousels",
    description: "3D cards, pricing tables and three kinds of carousel join in.",
  },
  { date: "Oct 2025", title: "A CLI", description: "One command adds any component to your project, in TS or JS." },
  { date: "Nov 2026", title: "Customize everything", description: "Every component gets a live panel of props to play with." },
  { date: "Next", title: "Your turn", description: "Copy one, paste it in, and make it yours." },
];

// Scroll the page: the line draws itself and each milestone lights up as it is reached.
const ScrollTimelineDemo = (props: Partial<ComponentProps<typeof ScrollTimeline>>) => (
  <div style={{ width: "100%", padding: "40px 0" }}>
    <ScrollTimeline items={items} {...props} />
  </div>
);

export default ScrollTimelineDemo;

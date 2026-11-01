"use client";

import type { ComponentProps } from "react";
import LoopText from "./preview";

// An arrow in the middle makes it a "scroll down" badge.
const LoopTextDemo = (props: ComponentProps<typeof LoopText>) => (
  <LoopText {...props}>
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  </LoopText>
);

export default LoopTextDemo;

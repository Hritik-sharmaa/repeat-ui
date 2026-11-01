"use client";

import type { ComponentProps } from "react";
import FlowText from "./preview";

// Two ribbons crossing, running opposite ways.
const FlowTextDemo = ({ rotate = 6, direction = "left", ...props }: ComponentProps<typeof FlowText>) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", overflow: "hidden", padding: "40px 0" }}>
    <FlowText text="Copy. Paste. Repeat." separator="  ✦  " rotate={rotate} direction={direction} {...props} />
    <FlowText
      text="Copy. Paste. Repeat."
      separator="  ✦  "
      background="#f472b6"
      {...props}
      rotate={-rotate}
      direction={direction === "left" ? "right" : "left"}
    />
  </div>
);

export default FlowTextDemo;

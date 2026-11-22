"use client";

import type { ComponentProps } from "react";
import NameTag from "./preview";

// Click the name to write your own. Hover to see the corner lift.
const NameTagDemo = (props: ComponentProps<typeof NameTag>) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      padding: 24,
    }}
  >
    <NameTag {...props} />
  </div>
);

export default NameTagDemo;

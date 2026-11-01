"use client";

import type { ComponentProps } from "react";
import TrailCursor from "./preview";

const TrailCursorDemo = (props: ComponentProps<typeof TrailCursor>) => (
  <div>
    <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", opacity: 0.35 }}>Move the cursor</h1>
    <TrailCursor {...props} />
  </div>
);

export default TrailCursorDemo;

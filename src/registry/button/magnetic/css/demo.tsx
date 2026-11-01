"use client";

import type { ComponentProps } from "react";
import Magnetic from "./preview";

// Any prop passes straight through to the button.
const MagneticDemo = (props: ComponentProps<typeof Magnetic>) => (
  <Magnetic {...props}>{props.children ?? "Get started →"}</Magnetic>
);

export default MagneticDemo;

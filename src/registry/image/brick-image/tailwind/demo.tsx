"use client";

import type { ComponentProps } from "react";
import BrickImage from "./preview";

// It builds itself from the bottom up. Hover to lift bricks, and click to smash a hole that repairs itself.
const BrickImageDemo = (props: ComponentProps<typeof BrickImage>) => (
  <BrickImage alt="A mountain lake at sunset" {...props} />
);

export default BrickImageDemo;

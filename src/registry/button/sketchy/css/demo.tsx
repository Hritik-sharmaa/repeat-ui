"use client";

import type { ComponentProps } from "react";
import Sketchy from "./preview";

// Any prop passes straight through to the button.
const SketchyBtnDemo = (props: ComponentProps<typeof Sketchy>) => <Sketchy {...props}>{props.children ?? "Sketchy"}</Sketchy>;

export default SketchyBtnDemo;

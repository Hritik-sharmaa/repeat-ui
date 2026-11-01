"use client";

import type { ComponentProps } from "react";
import Bubble from "./preview";

// Any prop passes straight through to the button.
const BubbleBtnDemo = (props: ComponentProps<typeof Bubble>) => <Bubble {...props}>{props.children ?? "Hover me!"}</Bubble>;

export default BubbleBtnDemo;

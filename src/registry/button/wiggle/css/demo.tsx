"use client";

import type { ComponentProps } from "react";
import Wiggle from "./preview";

// Any prop passes straight through to the button.
const WiggleBtnDemo = (props: ComponentProps<typeof Wiggle>) => <Wiggle {...props}>{props.children ?? "Wiggle me!"}</Wiggle>;

export default WiggleBtnDemo;

"use client";

import type { ComponentProps } from "react";
import Stamp from "./preview";

// Any prop passes straight through to the button.
const StampDemo = (props: ComponentProps<typeof Stamp>) => <Stamp {...props}>{props.children ?? "Approve"}</Stamp>;

export default StampDemo;

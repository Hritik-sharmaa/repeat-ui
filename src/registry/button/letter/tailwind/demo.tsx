"use client";

import type { ComponentProps } from "react";
import Letter from "./preview";

// Any prop passes straight through to the button.
const LetterBtnDemo = (props: ComponentProps<typeof Letter>) => <Letter {...props}>{props.children ?? "Hover me!"}</Letter>;

export default LetterBtnDemo;

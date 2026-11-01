"use client";

import type { ComponentProps } from "react";
import Layers from "./preview";

// Any prop passes straight through to the button.
const LayersBtnDemo = (props: ComponentProps<typeof Layers>) => <Layers {...props}>{props.children ?? "Hover me!"}</Layers>;

export default LayersBtnDemo;

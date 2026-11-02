"use client";

import type { ComponentProps } from "react";
import Matchlight from "./preview";

// Drag the match head quickly across the top of the box to strike it, then carry the flame over the words.
const MatchlightDemo = (props: ComponentProps<typeof Matchlight>) => <Matchlight {...props} />;

export default MatchlightDemo;

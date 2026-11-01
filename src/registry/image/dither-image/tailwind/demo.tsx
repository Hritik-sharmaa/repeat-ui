"use client";

import type { ComponentProps } from "react";
import DitherImage from "./preview";

// Hover the image to look through the lens at the original photo.
const DitherImageDemo = (props: ComponentProps<typeof DitherImage>) => (
  <DitherImage src="/image.webp" alt="A torn-paper portrait" {...props} />
);

export default DitherImageDemo;

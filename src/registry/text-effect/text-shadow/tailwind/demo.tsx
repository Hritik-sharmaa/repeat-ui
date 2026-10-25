import React from "react";
import TextShadow from "./preview";

const propData = [
  {
    name: "text",
    type: "string",
    default: "''",
    description:
      "The text content that will be typed out with animation effects",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes to apply to the component container",
  },
];

const TextShadowDemo = () => {
  return <TextShadow text="Hover Me!!!" />;
};

export { propData };
export default TextShadowDemo;

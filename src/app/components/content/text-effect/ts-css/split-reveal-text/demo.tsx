import React from "react";
import SplitRevealText from "./preview";

const propData = [
  {
    name: "outerText",
    type: "string",
    default: "undefined",
    description:
      "The main text that will be displayed and split into top and bottom halves on hover",
  },
  {
    name: "innerText",
    type: "string",
    default: "undefined",
    description:
      "The text that appears in the center when hovering over the outer text",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes to apply to the component container",
  },
];

const SplitRevealTextDemo = () => {
  return <SplitRevealText outerText="Hello" innerText="This is Text." />;
};

export { propData };
export default SplitRevealTextDemo;

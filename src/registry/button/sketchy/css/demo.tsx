import React from "react";
import Sketchy from "./preview";

const propData = [
  {
    name: "label",
    type: "string",
    default: "-",
    description: "The button text.",
  },
  {
    name: "onClick",
    type: "function",
    default: "-",
    description: "Click event handler.",
  },
  {
    name: "size",
    type: "string",
    default: "md",
    description: "Button size variant.",
    options: ["sm", "md", "lg"],
  },
];

const SketchyBtnDemo = () => {
  return <Sketchy>Sketchy</Sketchy>;
};

export { propData };
export default SketchyBtnDemo;

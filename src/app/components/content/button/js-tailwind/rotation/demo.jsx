
import React from "react";
import Rotation from "./preview";

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

const RotationBtnDemo = () => {
  return <Rotation>Rotate</Rotation>;
};

export { propData };
export default RotationBtnDemo;

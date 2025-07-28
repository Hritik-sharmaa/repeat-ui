"use client"
import React from "react";
import Bubble from "./preview";

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

const BubbleBtnDemo = () => {
  return <Bubble>Hover me!</Bubble>;
};

export { propData };
export default BubbleBtnDemo;

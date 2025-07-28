"use client"
import React from "react";
import Pulse from "./preview";

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

const PulseBtnDemo = () => {
  return <Pulse>Pulse</Pulse>;
};

export { propData };
export default PulseBtnDemo;

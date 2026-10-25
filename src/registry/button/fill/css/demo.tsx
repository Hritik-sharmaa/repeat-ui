import React from "react";
import Fill from "./preview";
import "./style.css";

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

const FillBtnDemo = () => {
  return <Fill className="fill-button">Fill</Fill>;
};

export { propData };
export default FillBtnDemo;

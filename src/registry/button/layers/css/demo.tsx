import React from "react";
import Layers from "./preview";
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

const LayersBtnDemo = () => {
  return <Layers className="layers-button">Hover me!</Layers>;
};

export { propData };
export default LayersBtnDemo;

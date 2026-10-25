import React from "react";
import Creep from "./preview";
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

const CreepBtnDemo = () => {
  return <Creep className="creepy-button">Hover me!!</Creep>;
};

export { propData };
export default CreepBtnDemo;

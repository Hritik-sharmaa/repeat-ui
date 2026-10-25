import React from "react";
import PopText from "./preview";

const propData = [
  {
    name: "maintext",
    type: "string",
    default: "undefined",
    description:
      "The main text content to be displayed with pop animation effect",
  },
  {
    name: "subText",
    type: "string",
    default: "undefined",
    description:
      "The secondary text content displayed below the main text with yellow styling",
  },
  {
    name: "className",
    type: "string",
    default: "''",
    description: "Additional CSS classes to apply to the component container",
  },
];

const PopTextDemo = () => {
  return <PopText maintext="Jon Snow" subText="King in the North" />;
};

export { propData };
export default PopTextDemo;

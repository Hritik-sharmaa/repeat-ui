import React from "react";
import FlowText from "./preview";

const propData = [
  {
    name: "text",
    type: "string",
    default: '""',
    description: "The text content to be displayed and animated"
  },
  {
    name: "speed",
    type: "number", 
    default: "2",
    description: "Animation speed in pixels per frame"
  },
  {
    name: "direction",
    type: '"left" | "right"',
    default: '"left"',
    description: "Direction of text animation flow"
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS classes to apply to the container"
  },
  {
    name: "interactive",
    type: "boolean",
    default: "true", 
    description: "Enable/disable drag interaction to control animation"
  },
  {
    name: "separator",
    type: "string",
    default: '" • "',
    description: "Text separator between repeated instances"
  }
];

const FlowTextDemo = () => {
  return (
    <div className="flex items-center flex-col gap-8 py-8">
      <FlowText
        text="Welcome to our amazing platform! Experience the future of web development."
        className="bg-blue-400 p-3 transform rotate-12"
        speed={10}
        separator="✨"
      />
      <FlowText
        text="Welcome to our amazing platform! Experience the future of web development."
        className="bg-pink-400 p-3 transform -rotate-12"
      />
    </div>
  );
};

export { propData };
export default FlowTextDemo;

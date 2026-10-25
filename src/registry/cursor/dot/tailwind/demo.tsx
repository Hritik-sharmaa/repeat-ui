import React from "react";
import Cursor from "./preview";

const propData = [
  {
    name: "size",
    type: "number",
    default: "10",
    description: "Size of the cursor dot in pixels.",
  },
  {
    name: "smoothness",
    type: "number",
    default: "0.15",
    description:
      "Smoothness factor for cursor movement (0-1, where higher values are smoother).",
  },
];

const DotCursorDemo = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-zinc-700">Move the cursor</h1>
      <Cursor size={30}/>
    </div>
  );
};

export { propData };
export default DotCursorDemo;

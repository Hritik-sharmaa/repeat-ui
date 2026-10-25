import React from "react";
import CustomCursor from "./preview";

const propData = [
  {
    name: "trailLength",
    type: "number",
    default: "10",
    description: "Number of trail points to display.",
  },
  {
    name: "trailColor",
    type: "string",
    default: "blue-500",
    description: "Color of the trail effect.",
  },
];

const TrailCursorDemo = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-zinc-700">Move the cursor</h1>
      <CustomCursor trailLength={40} trailColor="#9dff00" />
    </div>
  );
};

export { propData };
export default TrailCursorDemo;

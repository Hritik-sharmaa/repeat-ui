import React from "react";
import CustomCursor from "./preview";

const TrailCursorDemo = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-zinc-700">Move the cursor</h1>
      <CustomCursor trailLength={40} trailColor="#9dff00" />
    </div>
  );
};

export default TrailCursorDemo;

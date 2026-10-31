import React from "react";
import Cursor from "./preview";

const DotCursorDemo = () => {
  return (
    <div>
      <h1 className="text-6xl font-bold text-zinc-700">Move the cursor</h1>
      <Cursor size={30}/>
    </div>
  );
};

export default DotCursorDemo;

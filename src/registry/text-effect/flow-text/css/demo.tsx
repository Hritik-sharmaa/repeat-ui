import React from "react";
import FlowText from "./preview";

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

export default FlowTextDemo;

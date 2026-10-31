import React from "react";
import TypingText from "./preview";

const TypingTextDemo = () => {
  return (
    <div className="flex flex-col gap-8 items-center py-8">
      <TypingText
        text="Best component library for Next.Js."
        speed={80}
        showLetterAnimation={true}
        character="_"
      />
    </div>
  );
};

export default TypingTextDemo;

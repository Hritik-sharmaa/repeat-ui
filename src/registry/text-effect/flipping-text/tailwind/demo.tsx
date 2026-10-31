import React from "react";
import FlippingText from "./preview";

const FlippingTextDemo = () => {
  return (
    <div className="flex flex-col gap-8 items-center py-8">
      <FlippingText
        text="LinkedIn"
        layout="text-left"
        socialPlatforms={["linkedin"]}
      />

      <FlippingText
        text="Instagram"
        layout="text-right"
        socialPlatforms={["instagram"]}
      />

      <FlippingText
        text="Facebook"
        layout="text-left"
        socialPlatforms={["facebook"]}
      />
    </div>
  );
};

export default FlippingTextDemo;

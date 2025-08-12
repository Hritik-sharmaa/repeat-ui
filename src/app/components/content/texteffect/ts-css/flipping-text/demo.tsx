import React from "react";
import FlippingText from "./preview";

const propData = [
  {
    name: "text",
    type: "string",
    default: "HELLO WORLD",
    description:
      "The text content that will have the rolling/flipping animation on hover",
  },
  {
    name: "socialPlatforms",
    type: "SocialPlatform[]",
    default: '["linkedin", "instagram", "facebook"]',
    description:
      "Array of social platforms to display. Options: 'linkedin', 'instagram', 'facebook'",
  },
  {
    name: "layout",
    type: '"text-left" | "text-right"',
    default: '"text-left"',
    description:
      "Layout direction - text-left places text on left and icons on right, text-right does the opposite",
  },
];

const FlippingTextDemo = () => {
  return (
    <div className="flex flex-col gap-2 items-center py-6">
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

export { propData };
export default FlippingTextDemo;

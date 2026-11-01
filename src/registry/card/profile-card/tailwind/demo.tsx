"use client";

import type { ComponentProps } from "react";
import ProfileCard from "./preview";

const ProfileCardDemo = (props: Partial<ComponentProps<typeof ProfileCard>>) => (
  <ProfileCard
    name="Maya Chen"
    verified
    bio="Product designer. Collects fonts and houseplants."
    followers={2230}
    image="/image.webp"
    {...props}
  />
);

export default ProfileCardDemo;

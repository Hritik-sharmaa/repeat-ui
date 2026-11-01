"use client";

import type { ComponentProps } from "react";
import Card3D from "./preview";

const Card3DDemo = (props: ComponentProps<typeof Card3D>) => (
  <Card3D
    companyName="Repeat UI"
    logo="/logo-tile.svg"
    avatar="/snow.png"
    userName="Jon Snow"
    userRole="He knows nothing"
    {...props}
  />
);

export default Card3DDemo;

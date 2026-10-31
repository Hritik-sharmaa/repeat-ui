import React from "react";
import Card3D from "./preview";

const Card3DDemo = () => {
  return (
    <Card3D
      companyName="Repeat UI"
      logo="/logo-tile.svg"
      avatar="/snow.png"
      userName="Jon Snow"
      userRole="He knows NOTHING!"
    />
  );
};

export default Card3DDemo;

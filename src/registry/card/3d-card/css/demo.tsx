import React from "react";
import Card3D from "./preview";
import "./style.css";

const Card3DDemo = () => {
  return (
    <Card3D
      companyName="Repeat UI"
      logo="/Logo.png"
      avatar="/snow.png"
      userName="Jon Snow"
      userRole="He knows NOTHING!"
    />
  );
};

export default Card3DDemo;

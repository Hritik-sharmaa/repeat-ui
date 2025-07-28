import React from "react";
import Card3D from "./preview";
import "./style.css";

const propData = [
  {
    name: "companyName",
    type: "string",
    default: "-",
    description: "The name of the company",
  },
  {
    name: "logo",
    type: "string",
    default: "-",
    description: "The logo of company",
  },
  {
    name: "userName",
    type: "string",
    default: "-",
    description: "Name of the user",
  },
  {
    name: "userRole",
    type: "string",
    default: "-",
    description: "The role user do",
  },
  {
    name: "avatar",
    type: "string",
    default: "-",
    description: "The avatar icon for the user",
  },
];


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

export { propData };
export default Card3DDemo;

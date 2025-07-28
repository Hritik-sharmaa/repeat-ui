import React from "react";
import ProfileCard from "./preview";
import "./style.css";

const propData = [
  {
    name: "image",
    type: "string",
    default: "-",
    description: "Image path",
  },
  {
    name: "name",
    type: "string",
    default: "-",
    description: "Name of the user",
  },
  {
    name: "verified",
    type: "boolean",
    default: "-",
    description: "Verified badge",
  },
  {
    name: "bio",
    type: "string",
    default: "-",
    description: "Small description about the user",
  },
  {
    name: "followers",
    type: "number | string",
    default: "-",
    description: "Number of followers does user have",
  },
  {
    name: "onFollow",
    type: "function",
    default: "-",
    description: "Follow button when it gets click",
  },
];

const ProfileCardDemo = () => {
  return (
    <ProfileCard
      className="profile-card"
      name="Jon snow"
      verified="true"
      bio="hello, this is jon "
      followers={223}
      image="/image.webp"></ProfileCard>
  );
};

export { propData };
export default ProfileCardDemo;

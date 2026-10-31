import React from "react";
import ProfileCard from "./preview";

const ProfileCardDemo = () => {
  return (
    <ProfileCard
      name="Jon snow"
      verified={true}
      bio="hello, this is jon "
      followers={223}
      image="/image.webp"></ProfileCard>
  );
};

export default ProfileCardDemo;

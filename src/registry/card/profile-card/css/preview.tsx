"use client";

import { useState } from "react";
import "./style.css";
import type { CSSProperties } from "react";

export interface ProfileCardProps {
  image: string;
  name: string;
  verified?: boolean;
  bio: string;
  followers: number;
  accentColor?: string;
  verifiedColor?: string;
  radius?: number;
  onFollow?: (following: boolean) => void;
  className?: string;
}

// A photo-led profile with a follow button that toggles and counts.
const ProfileCard = ({
  image,
  name,
  verified = false,
  bio,
  followers,
  accentColor = "#111827",
  verifiedColor = "#22c55e",
  radius = 36,
  onFollow,
  className = "",
}: ProfileCardProps) => {
  const [following, setFollowing] = useState(false);
  const toggle = () => {
    setFollowing(!following);
    onFollow?.(!following);
  };

  return (
    <div
      className={`rui-profile ${className}`}
      style={{ "--rui-accent": accentColor, "--rui-radius": `${radius}px` } as CSSProperties}>
      <img src={image} alt={name} className="rui-profile-photo" />
      <div className="rui-profile-body">
        <p className="rui-profile-name">
          {name}
          {verified && (
            <svg viewBox="0 0 24 24" fill={verifiedColor} aria-label="Verified">
              <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z" />
            </svg>
          )}
        </p>
        <p className="rui-profile-bio">{bio}</p>
        <div className="rui-profile-row">
          <span className="rui-profile-followers">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
            </svg>
            {(followers + (following ? 1 : 0)).toLocaleString()}
          </span>
          <button type="button" onClick={toggle} className={`rui-profile-follow ${following ? "rui-profile-following" : ""}`}>
            {following ? "Following" : "Follow"}
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

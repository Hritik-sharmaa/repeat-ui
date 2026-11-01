"use client";

import { useState } from "react";

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
      className={`w-[300px] overflow-hidden bg-white p-2.5 text-slate-900 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
      style={{ borderRadius: radius }}>
      <img src={image} alt={name} className="h-[300px] w-full object-cover" style={{ borderRadius: Math.max(radius - 10, 0) }} />
      <div className="p-2.5">
        <p className="flex items-center gap-1 text-lg font-semibold">
          {name}
          {verified && (
            <svg viewBox="0 0 24 24" className="size-5" fill={verifiedColor} aria-label="Verified">
              <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z" />
            </svg>
          )}
        </p>
        <p className="mt-1 text-sm text-slate-500">{bio}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm tabular-nums text-slate-600">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z" />
            </svg>
            {(followers + (following ? 1 : 0)).toLocaleString()}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full border-2 px-5 text-sm font-semibold transition active:scale-95"
            style={
              following
                ? { borderColor: accentColor, color: accentColor, background: "transparent" }
                : { borderColor: accentColor, color: "#ffffff", background: accentColor }
            }>
            {following ? "Following" : "Follow"}
            <span className={`text-base leading-none transition-transform duration-300 ${following ? "rotate-45" : ""}`}>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

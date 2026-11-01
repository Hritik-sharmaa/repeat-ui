"use client";

import { useState, type PointerEvent } from "react";
import "./style.css";

export interface Card3DProps {
  companyName?: string;
  logo?: string;
  userName?: string;
  userRole?: string;
  avatar?: string;
  maxTilt?: number;
  colorFrom?: string;
  colorTo?: string;
  textColor?: string;
  shiftHue?: boolean;
  glare?: boolean;
  className?: string;
}

// A badge that tilts towards the pointer, with its layers floating at different depths.
const Card3D = ({
  companyName = "Repeat UI",
  logo,
  userName = "Your name",
  userRole = "Your role",
  avatar,
  maxTilt = 15,
  colorFrom = "#ff6ec7",
  colorTo = "#4facfe",
  textColor = "#111827",
  shiftHue = true,
  glare = true,
  className = "",
}: Card3DProps) => {
  // Where the pointer is over the card, from 0 to 1 on each axis; null when it is elsewhere.
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const rotateX = pointer ? (0.5 - pointer.y) * 2 * maxTilt : 0;
  const rotateY = pointer ? (pointer.x - 0.5) * 2 * maxTilt : 0;
  const background =
    pointer && shiftHue
      ? `linear-gradient(135deg, hsl(${pointer.x * 360} 80% 72%), hsl(${240 + pointer.y * 120} 80% 64%))`
      : `linear-gradient(135deg, ${colorFrom}, ${colorTo})`;

  return (
    <div className={`rui-card3d ${className}`}>
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={() => setPointer(null)}
        className="rui-card3d-face"
        style={{
          color: textColor,
          background,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: pointer ? "transform 0.1s ease-out, background 0.2s" : "transform 0.6s ease, background 0.6s",
        }}>
        <div className="rui-card3d-brand">
          {logo && <img src={logo} alt="" />}
          <span>{companyName}</span>
        </div>
        <div className="rui-card3d-avatar">
          {avatar ? <img src={avatar} alt={userName} /> : <span>{userName.charAt(0)}</span>}
        </div>
        <div className="rui-card3d-person">
          <h3>{userName}</h3>
          <p>{userRole}</p>
        </div>
        {glare && pointer && (
          <div
            aria-hidden
            className="rui-card3d-glare"
            style={{
              background: `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(255,255,255,0.4), transparent 55%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card3D;

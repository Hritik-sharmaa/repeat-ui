"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./style.css";

interface Card3DProps {
  companyName: string;
  logo: string;
  userName: string;
  userRole: string;
  avatar: string;
}

const Card3D: React.FC<Card3DProps> = ({
  companyName,
  logo,
  userName,
  userRole,
  avatar,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * -30;

      gsap.to(card, {
        rotationY: x,
        rotationX: y,
        duration: 0.4,
        ease: "power3.out",
      });

      const percentX = (e.clientX / window.innerWidth) * 100;
      const percentY = (e.clientY / window.innerHeight) * 100;
      card.style.background = `linear-gradient(135deg,
        hsl(${percentX}, 80%, 70%),
        hsl(${percentY}, 80%, 60%))`;
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      card.style.background = `linear-gradient(135deg, #ff6ec7, #4facfe)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="card-wrapper">
      <div className="card" ref={cardRef}>
        <div className="card-header">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <h2 className="company-name">{companyName}</h2>
        </div>
        <div className="avatar-placeholder">
          <div className="avatar-icon">
            <img src={avatar} alt="User Avatar" />
          </div>
        </div>
        <h3 className="user-name">{userName}</h3>
        <p className="user-role">{userRole}</p>
      </div>
    </div>
  );
};

export default Card3D;

"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";
import Image from "next/image";

interface Card3DProps {
  companyName?: string;
  logo?: string;
  userName?: string;
  userRole?: string;
  avatar?: string;
}


const Card3D: React.FC<Card3DProps> = ({
  companyName,
  logo = "www.repeatui.com",
  userName,
  userRole,
  avatar = "https://i.pravatar.cc/150?img=3",
}) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [background, setBackground] = useState(
    "linear-gradient(135deg, #ff6ec7, #4facfe)"
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * -30;

      setTransform({ rotateX: y, rotateY: x });

      const percentX = (e.clientX / window.innerWidth) * 360;
      const percentY = (e.clientY / window.innerHeight) * 120 + 240;
      setBackground(`linear-gradient(135deg,
        hsl(${percentX}, 80%, 70%),
        hsl(${percentY}, 80%, 60%))`);
    };

    const onMouseLeave = () => {
      setTransform({ rotateX: 0, rotateY: 0 });
      setBackground("linear-gradient(135deg, #ff6ec7, #4facfe)");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="card-wrapper">
        <div
          ref={cardRef}
          className="card-inner"
          style={{
            transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            background: background,
          }}>
          <div className="company-header">
            <Image
              src={logo}
              alt="Company Logo"
              className="company-logo"
              width={10}
              height={10}
            />
            <h2 className="company-name">{companyName}</h2>
          </div>
          <div className="avatar-section">
            <Image src={avatar} alt="User Avatar" width={150} height={150} />
          </div>

          <div className="user-info">
            <h3 className="user-name">{userName}</h3>
            <p className="user-role">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3D;

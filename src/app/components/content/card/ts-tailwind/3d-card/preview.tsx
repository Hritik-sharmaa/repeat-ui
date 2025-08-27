"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const cardRef = useRef<HTMLDivElement | null>(null);
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
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-[290px] h-[380px] rounded-3xl p-5 text-center text-white"
        style={{
          perspective: "1000px",
        }}>
        <div
          ref={cardRef}
          className="w-full h-full rounded-3xl p-5 text-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            background: background,
            transition: "transform 0.1s ease-out, background 0.2s ease-out",
          }}>
          <div className="flex items-center justify-center gap-2">
            <Image
              src={logo}
              alt="Company Logo"
              className="w-10 h-10 object-contain rounded"
              width={10}
              height={10}
            />
            <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
          </div>
          <div className="my-5 flex items-center justify-center">
            <Image src={avatar} alt="User Avatar" width={150} height={150} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-black drop-shadow-lg">
              {userName}
            </h3>
            <p className="text-black text-sm font-medium">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3D;

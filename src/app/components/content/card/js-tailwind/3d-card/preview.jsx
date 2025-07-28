"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Card3D = ({ companyName, logo, userName, userRole, avatar }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * -30;

      gsap.to(card, {
        rotationY: x,
        rotationX: y,
        duration: 0.1,
        ease: "power1.out",
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
        duration: 0.1,
        ease: "power1.out",
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
    <div
      className="flex flex-col items-center justify-center"
      style={{ perspective: "1000px" }}>
      <div
        className="w-[260px] h-[360px] rounded-3xl bg-gradient-to-br from-pink-400 to-blue-400 shadow-2xl p-5 text-center -mt-2.5 text-white transition-all duration-300 ease-in-out"
        style={{ transformStyle: "preserve-3d" }}
        ref={cardRef}>
        <div className="flex items-center justify-center gap-2">
          <img
            src={logo}
            alt="Company Logo"
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800">{companyName}</h2>
        </div>

        <div className="my-5">
          <div className="flex items-center justify-center">
            <img src={avatar} alt="User Avatar" className="w-[150px]" />
          </div>
        </div>

        <h3 className="text-4xl font-bold text-gray-900">{userName}</h3>
        <p className="text-sm text-gray-600">{userRole}</p>
      </div>
    </div>
  );
};

export default Card3D;

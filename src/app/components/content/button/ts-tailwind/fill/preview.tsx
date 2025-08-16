"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Fill({
  children,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <>
      <style jsx>{`
        .fill-button::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: #ff7675;
          transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: -1;
          border-radius: inherit;
        }

        .fill-button:hover::before {
          top: 0;
        }
      `}</style>

      <button className="relative bg-transparent border-2 border-[#ff7675] text-[#ff7675] px-9 py-3 text-base font-semibold rounded-full cursor-pointer overflow-hidden transition-all duration-300 ease-in-out uppercase tracking-wider fill-button hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,118,117,0.3)]">
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}

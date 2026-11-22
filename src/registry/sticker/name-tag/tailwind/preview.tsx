"use client";

import { useState } from "react";

// Every class name in one place; the CSS version of this file swaps this map for its own classes.
const C = {
  root: "group relative inline-block select-none align-middle animate-[rui-nametag-slap_520ms_cubic-bezier(.34,1.56,.64,1)_both]",
  lift: "relative transition-[transform,filter] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.14))_drop-shadow(0_8px_10px_rgba(0,0,0,0.18))] group-hover:-translate-y-1 group-hover:[filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.12))_drop-shadow(0_16px_16px_rgba(0,0,0,0.22))]",
  tag: "overflow-hidden rounded-[14px] bg-white transition-[clip-path] duration-300 ease-out [clip-path:polygon(0_0,100%_0,100%_100%,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)]",
  band: "flex flex-col items-center px-4 pt-3 pb-2.5 text-white",
  greeting:
    "font-sans text-[2.1em] font-black uppercase leading-none tracking-[0.04em]",
  subtext:
    "mt-1 font-sans text-[0.8em] font-semibold lowercase tracking-[0.06em] opacity-95",
  field: "flex items-center justify-center bg-white px-4",
  input:
    "w-full bg-transparent text-center text-[2.4em] leading-tight outline-none placeholder:text-zinc-300 [font-family:'Marker_Felt','Bradley_Hand','Segoe_Print','Comic_Sans_MS',cursive]",
  foot: "h-[0.6em]",
  // The underside of the corner, folded back over the tag.
  curl: "pointer-events-none absolute right-0 bottom-0 size-0 rounded-tl-[8px] bg-[linear-gradient(315deg,transparent_50%,#d4d4d8_50%,#f4f4f5_80%,#e4e4e7)] transition-[width,height] duration-300 ease-out group-hover:size-[24px]",
};

export interface NameTagProps {
  name?: string;
  greeting?: string;
  subtext?: string;
  color?: string;
  inkColor?: string;
  width?: number;
  rotate?: number;
  editable?: boolean;
  placeholder?: string;
  onNameChange?: (name: string) => void;
  className?: string;
}

// The "HELLO my name is" sticker from every meetup. It slaps on when it appears, the name is
// written in marker and can be typed over, and the corner curls up when you hover, ready to peel.
const NameTag = ({
  name = "Alex",
  greeting = "Hello",
  subtext = "my name is",
  color = "#e11d48",
  inkColor = "#18181b",
  width = 280,
  rotate = -3,
  editable = true,
  placeholder = "Your name",
  onNameChange,
  className = "",
}: NameTagProps) => {
  const [value, setValue] = useState(name);
  const [prevName, setPrevName] = useState(name);
  // Follow the prop when the parent changes it.
  if (name !== prevName) {
    setPrevName(name);
    setValue(name);
  }

  return (
    <div
      className={`${C.root} ${className}`}
      style={{ width, fontSize: width / 18, rotate: `${rotate}deg` }}
    >
      <div className={C.lift}>
        <div className={C.tag}>
          <div className={C.band} style={{ background: color }}>
            <span className={C.greeting}>{greeting}</span>
            <span className={C.subtext}>{subtext}</span>
          </div>
          <div className={C.field} style={{ height: width * 0.36 }}>
            <input
              className={C.input}
              style={{ color: inkColor }}
              value={value}
              placeholder={placeholder}
              readOnly={!editable}
              tabIndex={editable ? 0 : -1}
              spellCheck={false}
              maxLength={24}
              aria-label={`${greeting} ${subtext}`}
              onChange={(e) => {
                setValue(e.target.value);
                onNameChange?.(e.target.value);
              }}
            />
          </div>
          <div className={C.foot} style={{ background: color }} />
        </div>
        <span className={C.curl} />
      </div>
      <style>{`
        @keyframes rui-nametag-slap {
          0% { opacity: 0; transform: translateY(-14px) scale(1.25) rotate(4deg); }
          55% { opacity: 1; transform: scale(0.96, 0.92) rotate(0deg); }
          80% { transform: scale(1.02); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default NameTag;

"use client";

import { useState } from "react";
import "./style.css";

// Every class name in one place; the styles live in style.css.
const C = {
  root: "rui-nametag",
  lift: "rui-nametag-lift",
  tag: "rui-nametag-tag",
  band: "rui-nametag-band",
  greeting: "rui-nametag-greeting",
  subtext: "rui-nametag-subtext",
  field: "rui-nametag-field",
  input: "rui-nametag-input",
  foot: "rui-nametag-foot",
  // The underside of the corner, folded back over the tag.
  curl: "rui-nametag-curl",
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
    </div>
  );
};

export default NameTag;

"use client";

import { useState, type ComponentProps } from "react";
import RotaryDial from "./preview";

// Hook a number and drag it round to the silver stop, or just tap it. Typing and pasting work too.
const RotaryDialDemo = (props: Partial<ComponentProps<typeof RotaryDial>>) => {
  const [code, setCode] = useState("");
  const done = code.length === (props.length ?? 6);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: "12px 0",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ margin: 0, fontSize: 14, color: "#a3a3a3" }}>
        {done ? "Code entered" : "Drag a number to the stop, or tap it"}
      </p>
      <RotaryDial {...props} value={code} onChange={setCode} />
    </div>
  );
};

export default RotaryDialDemo;

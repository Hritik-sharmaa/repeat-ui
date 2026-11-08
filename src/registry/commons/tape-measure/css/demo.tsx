"use client";

import { useState, type ComponentProps } from "react";
import TapeMeasure from "./preview";

// Drag the brass hook to measure. Flick the lock on top off and the tape whips back into the case.
const TapeMeasureDemo = (
  props: Partial<ComponentProps<typeof TapeMeasure>>,
) => {
  const [value, setValue] = useState(props.defaultValue ?? 30);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        padding: "40px 0",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ margin: 0, fontSize: 15, color: "#a3a3a3" }}>
        Shelf width:{" "}
        <strong style={{ color: "#fafafa" }}>
          {value} {props.unit ?? "cm"}
        </strong>
      </p>
      <TapeMeasure {...props} value={value} onChange={setValue} />
      <p style={{ margin: 0, fontSize: 13, color: "#737373" }}>
        Drag the brass hook. Flick the lock off to let it whip back.
      </p>
    </div>
  );
};

export default TapeMeasureDemo;

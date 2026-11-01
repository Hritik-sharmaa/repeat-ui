"use client";

import { useEffect, useState, type ComponentProps } from "react";
import TallyCounter from "./preview";

type Props = ComponentProps<typeof TallyCounter>;

// Counts up on its own, so the tiles keep flipping. Starts again from the Customize panel's value.
const Ticking = ({ value = 2048, ...props }: Props) => {
  const [count, setCount] = useState(value);
  useEffect(() => {
    const timer = setInterval(() => setCount((n) => n + 1 + Math.floor(Math.random() * 37)), 2200);
    return () => clearInterval(timer);
  }, []);
  return <TallyCounter {...props} value={count} />;
};

const TallyCounterDemo = (props: Props) => <Ticking key={props.value} {...props} />;

export default TallyCounterDemo;

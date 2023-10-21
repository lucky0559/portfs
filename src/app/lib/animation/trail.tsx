"use client";

import { useTrail, a } from "@react-spring/web";
import { Children, ReactElement } from "react";

type ITrail = {
  open: boolean;
  children: ReactElement;
  height: number;
};

const Trail = ({ open, children, height }: ITrail) => {
  const items = Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 1000 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? height : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div className="pr-0.5 overflow-hidden" style={{ height }}>
            {items[index]}
          </a.div>
        </a.div>
      ))}
    </div>
  );
};

export default Trail;

import React, { useEffect, useState } from "react";
import "./Circle.css";

export type CircleProps = {
  x: number;
  y: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
};

function Circle({ x, y, radius, xVelocity, yVelocity }: CircleProps) {
  const [currentX, setCurrentX] = useState<number>(x);
  const [currentY, setCurrentY] = useState<number>(y);
  // Animate the circle moving with the given velocities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentX((prev) => prev + xVelocity * 0.1);
      setCurrentY((prev) => prev + yVelocity * 0.1);
    }, 10);
    return () => clearInterval(interval);
  }, [currentX, currentY, radius, x, xVelocity, y, yVelocity]);

  return (
    <div
      className="Circle"
      style={{
        position: "absolute",
        left: currentX - radius,
        top: currentY - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        backgroundColor: "red",
      }}
    ></div>
  );
}

export default Circle;

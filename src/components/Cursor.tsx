import React, { useEffect, useState } from "react";
import "./Cursor.css";

function Cursor({ radius }: { radius: number }) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  const logMousePosition = (e: MouseEvent) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  useEffect(() => {
    return () => {
      document.addEventListener("mousemove", logMousePosition);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: y - radius,
        left: x - radius,
        zIndex: 9999,
        pointerEvents: "none",
        backgroundColor: "red",
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
      }}
    ></div>
  );
}

export default Cursor;

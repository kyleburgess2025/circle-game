import React, { useEffect, useState } from "react";
import "./Cursor.css";

function cursorInformation({ radius }: { radius: number }) {
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

  function draw(context: CanvasRenderingContext2D, frameCount: number) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  }

  return draw;
}

export default cursorInformation;

import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import {
  getWindowDimensions,
  getXYVelocityRadiusForCircle,
} from "./helpers/mainAppHelpers";
import { CircleType } from "./helpers/mainAppHelpers";

const SPEED = 0.001;

function App() {
  const [gameState, setGameState] = useState("start");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [radius, setRadius] = useState<number>(10);
  const [cursorX, setX] = useState<number>(0);
  const [cursorY, setY] = useState<number>(0);
  const [circles, setCircles] = useState<CircleType[]>([]);

  const drawFn = useCallback(
    (context: CanvasRenderingContext2D, frameCount: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "#000000";
      context.beginPath();
      context.arc(cursorX, cursorY, radius, 0, 2 * Math.PI);
      context.fill();
      const newCircles: CircleType[] = [];
      circles.forEach((circle) => {
        const newCircle = {
          ...circle,
          x: circle.x + circle.xVelocity * SPEED,
          y: circle.y + circle.yVelocity * SPEED,
        };
        context.beginPath();
        context.arc(
          newCircle.x,
          newCircle.y,
          newCircle.radius,
          0,
          2 * Math.PI,
          false
        );
        context.fillStyle = newCircle.color;
        context.fill();
        if (
          Math.sqrt(
            Math.pow(newCircle.x - cursorX, 2) +
              Math.pow(newCircle.y - cursorY, 2)
          ) <
          newCircle.radius + radius
        ) {
          if (newCircle.radius > radius) {
            setGameState("end");
          } else {
            setRadius((prev) => prev + 2);
            return;
          }
        }
        if (
          !(
            newCircle.x + newCircle.radius < 0 ||
            newCircle.x - newCircle.radius > windowDimensions.width ||
            newCircle.y + newCircle.radius < 0 ||
            newCircle.y - newCircle.radius > windowDimensions.height
          )
        ) {
          newCircles.push(newCircle);
        }
      });
      setCircles(newCircles);
    },
    [
      circles,
      cursorX,
      cursorY,
      radius,
      windowDimensions.height,
      windowDimensions.width,
    ]
  );

  const logMousePosition = (e: MouseEvent) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  useEffect(() => {
    return () => {
      document.addEventListener("mousemove", logMousePosition);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      const newCircle = getXYVelocityRadiusForCircle(
        windowDimensions.width,
        windowDimensions.height,
        radius
      );
      setCircles((prev) => [...prev, newCircle]);
    }, Math.sqrt(radius) / (SPEED * 100));
    return () => clearInterval(interval);
  }, [gameState, radius, windowDimensions.height, windowDimensions.width]);

  return (
    <div className="App">
      {gameState === "start" && (
        <>
          <button onClick={() => setGameState("playing")}>Start Game</button>
        </>
      )}
      {gameState === "playing" && (
        <>
          <Canvas
            draw={drawFn}
            height={windowDimensions.height}
            width={windowDimensions.width}
          />
        </>
      )}
      {gameState === "end" && (
        <>
          <h1>Game Over</h1>
          <h2>Score: {radius}</h2>
          <button
            onClick={() => {
              setRadius(10);
              setGameState("playing");
              setCircles([]);
            }}
          >
            Restart Game
          </button>
        </>
      )}
    </div>
  );
}

export default App;

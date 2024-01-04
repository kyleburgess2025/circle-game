import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cursor from "./components/Cursor";
import Circle, { CircleProps } from "./components/Circle";
import {
  getWindowDimensions,
  getXYVelocityRadiusForCircle,
} from "./helpers/mainAppHelpers";

function App() {
  const [gameState, setGameState] = useState("start");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [radius, setRadius] = useState<number>(10);
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameState === "playing") {
      interval = setInterval(() => {
        setCircles((prev) => {
          const newCircles = [...prev];
          const currentInformation = getXYVelocityRadiusForCircle(
            windowDimensions.width,
            windowDimensions.height,
            radius
          );
          newCircles.push(currentInformation);
          return newCircles;
        });
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState, radius, windowDimensions.height, windowDimensions.width]);

  // useEffect(() => {
  //   const newCircles = [];
  //   for (const circle of circles) {
  //     if (
  //       !(
  //         circle.x + circle.radius > windowDimensions.width ||
  //         circle.x - circle.radius < 0 ||
  //         circle.y + circle.radius > windowDimensions.height ||
  //         circle.y - circle.radius < 0
  //       )
  //     ) {
  //       newCircles.push(circle);
  //     }
  //   }
  //   setCircles(newCircles);
  // }, [circles, windowDimensions.height, windowDimensions.width]);

  return (
    <div className="App">
      {gameState === "start" && (
        <>
          <button onClick={() => setGameState("playing")}>Start Game</button>
        </>
      )}
      {gameState === "playing" && (
        <>
          <h1>Game is playing</h1>
          <Cursor radius={radius} />
          <button onClick={() => setGameState("end")}>End Game</button>
          {circles.map((circle, index) => (
            <Circle
              key={index}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              xVelocity={circle.xVelocity}
              yVelocity={circle.yVelocity}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;

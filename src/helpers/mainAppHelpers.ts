import { CircleProps } from "../components/Circle";

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
}

export function getXYVelocityRadiusForCircle(windowX: number, windowY: number, currentRadius: number): CircleProps {
  const radius = Math.random() * currentRadius * 6;
  const random = Math.round(Math.random() * 4);
  switch (random) {
    case 0:
      return {
        radius,
        x: -radius,
        y: Math.random() * 10,
        xVelocity: Math.random() * 10,
        yVelocity: Math.random() * 20 - 10,
      }
    case 1:
      return {
        radius,
        x: Math.random() * 10,
        y: -radius,
        xVelocity: Math.random() * 20 - 10,
        yVelocity: Math.random() * 10,
      }
    case 2:
      return {
        radius,
        x: windowX + radius,
        y: Math.random() * 10,
        xVelocity: Math.random() * -10,
        yVelocity: Math.random() * 20 - 10,
      }
    case 3:
      return {
        radius,
        x: Math.random() * 10,
        y: windowY + radius,
        xVelocity: Math.random() * 20 - 10,
        yVelocity: Math.random() * -10,
      }
    default:
      return {
        radius,
        x: -radius,
        y: Math.random() * 10,
        xVelocity: Math.random() * 10,
        yVelocity: Math.random() * 20 - 10,
      }
  }
}
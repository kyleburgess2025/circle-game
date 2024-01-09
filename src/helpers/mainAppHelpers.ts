export type CircleType = {
  x: number;
  y: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
  color: string;
};

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
}

const COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#ff8000",
  "#8000ff",
  "#00ff80",
  "#ff0080",
  "#80ff00",
  "#0080ff",
  "#ff80ff",
  "#80ffff",
  "#ffff80",
]

export function getXYVelocityRadiusForCircle(windowX: number, windowY: number, currentRadius: number): CircleType {
  const radius = Math.random() * 3 * 6 * Math.sqrt(currentRadius);
  const random = Math.round(Math.random() * 4);
  switch (random) {
    case 0:
      return {
        color: COLORS[Math.round(Math.random() * COLORS.length)],
        radius,
        x: -radius,
        y: Math.random() * windowY,
        xVelocity: Math.random() * 10,
        yVelocity: Math.random() * 20 - 10,
      }
    case 1:
      return {
        color: COLORS[Math.round(Math.random() * COLORS.length)],
        radius,
        x: Math.random() * windowX,
        y: -radius,
        xVelocity: Math.random() * 20 - 10,
        yVelocity: Math.random() * 10,
      }
    case 2:
      return {
        color: COLORS[Math.round(Math.random() * COLORS.length)],
        radius,
        x: windowX + radius,
        y: Math.random() * windowY,
        xVelocity: Math.random() * -10,
        yVelocity: Math.random() * 20 - 10,
      }
    case 3:
      return {
        color: COLORS[Math.round(Math.random() * COLORS.length)],
        radius,
        x: Math.random() * windowX,
        y: windowY + radius,
        xVelocity: Math.random() * 20 - 10,
        yVelocity: Math.random() * -10,
      }
    default:
      return {
        color: COLORS[Math.round(Math.random() * COLORS.length)],
        radius,
        x: -radius,
        y: Math.random() * 10,
        xVelocity: Math.random() * 10,
        yVelocity: Math.random() * 20 - 10,
      }
  }
}
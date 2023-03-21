export type WindDirections =
  | "north"
  | "south"
  | "east"
  | "west"
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west";

function windDirectionsToAzimuth(windDirection: WindDirections): number {
  switch (windDirection) {
    case "north":
      return 0;
    case "south":
      return 180;
    case "east":
      return 90;
    case "west":
      return 270;
    case "north-east":
      return 45;
    case "north-west":
      return 315;
    case "south-east":
      return 135;
    case "south-west":
      return 225;
    default:
      console.log(windDirection);
      throw new Error("Invalid wind direction");
  }
}

function azimuthToWindDirection(azimuth: number): WindDirections {
  switch (azimuth) {
    case 0:
      return "north" as const;
    case 180:
      return "south" as const;
    case 90:
      return "east" as const;
    case 270:
      return "west" as const;
    case 45:
      return "north-east" as const;
    case 315:
      return "north-west" as const;
    case 135:
      return "south-east" as const;
    case 225:
      return "south-west" as const;
    default:
      throw new Error("Invalid azimuth");
  }
}

export function getMaxAzimuth(windDirections: WindDirections[]) {
  const azimuths = windDirections.map(windDirectionsToAzimuth);
  return Math.max(...azimuths);
}

export function getMinAzimuth(windDirections: WindDirections[]) {
  const azimuths = windDirections.map(windDirectionsToAzimuth);
  return Math.min(...azimuths);
}

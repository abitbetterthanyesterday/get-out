import { WindDirections, getMaxAzimuth, getMinAzimuth } from "./wind";
describe("utils/wind", () => {
  it("gets the right max azimuth", () => {
    const windDirections: WindDirections[] = [
      "north",
      "south",
      "east",
      "north-east",
      "south-west",
    ];
    expect(getMaxAzimuth(windDirections)).toBe(225);
  });

  it("gets the right min azimuth", () => {
    const windDirections: WindDirections[] = [
      "north",
      "south",
      "east",
      "north-east",
      "south-west",
    ];
    expect(getMinAzimuth(windDirections)).toBe(0);
  });
});

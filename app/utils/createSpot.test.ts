import type { CreateSpotFormData, Spot } from "./createSpot";
import { createSpot } from "./createSpot";

describe("createSpot", () => {
  // Helper function
  const createFormData = (fields: CreateSpotFormData): FormData => {
    const formData = new FormData();
    for (const [field, value] of Object.entries(fields)) {
      formData.append(field, value);
    }
    return formData;
  };

  describe("name", () => {
    it("should return an error if the name is missing", () => {
      const form = createFormData({ name: "" });
      const [errors, result] = createSpot(form);
      expect(errors?.name).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return not return an an error if the name is present", () => {
      const form = createFormData({ name: "my-name" });
      const [errors, _] = createSpot(form);
      expect(errors?.name).toBeUndefined();
    });
  });

  describe("latitude", () => {
    it("should return an error if the latitude is missing", () => {
      const form = createFormData({ latitude: "" });
      const [errors, result] = createSpot(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the latitude is of the wrong form", () => {
      const form = createFormData({ latitude: "hello" });
      const [errors, result] = createSpot(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the latitude is out of the boundaries", () => {
      const form = createFormData({ latitude: "91" });
      const [errors, result] = createSpot(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if the latitude is within -90 and 90", () => {
      const form = createFormData({ latitude: "90" });
      const [errors, _] = createSpot(form);
      expect(errors?.latitude).toBeUndefined();
    });
  });

  describe("longitude", () => {
    it("should return an error if the longitude is missing", () => {
      const form = createFormData({ longitude: "" });
      const [errors, result] = createSpot(form);
      expect(errors?.longitude).not.toBeNull();
      expect(result).toBeNull();
    });
    it("should return an error if the longitude is of the wrong form", () => {
      const form = createFormData({ longitude: "hello" });
      const [errors, result] = createSpot(form);
      expect(errors?.longitude).not.toBeNull();
      expect(result).toBeNull();
    });
    it("should return an error if the longitude is out of the boundaries", () => {
      const form = createFormData({ longitude: "181" });
      const [errors, result] = createSpot(form);
      expect(errors?.longitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if the longitude is within -90 and 90", () => {
      const form = createFormData({ longitude: "90" });
      const [errors, _] = createSpot(form);
      expect(errors?.longitude).toBeUndefined();
    });
  });

  describe("wind range", () => {
    it("should return an error if the wind min is below 0", () => {
      const form = createFormData({ minWind: "-1" });
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the wind min is NaN", () => {
      const form = createFormData({ minWind: "hello" });
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the wind max is NaN", () => {
      const form = createFormData({ maxWind: "hello" });
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the min wind is missing", () => {
      const form = createFormData({});
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the max wind is missing", () => {
      const form = createFormData({ minWind: "1" });
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the min wind is above the max wind", () => {
      const form = createFormData({ minWind: "2", maxWind: "1" });
      const [errors, result] = createSpot(form);
      expect(errors?.windRange).not.toBeUndefined();
      expect(result).toBeNull();
    });
  });

  describe("wind directions", () => {
    it("should have at least one wind direction", () => {
      const form = createFormData({});
      const [errors, result] = createSpot(form);
      expect(errors?.windDirections).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if there is at least one wind direction provided", () => {
      const form = createFormData({ south: "true" });
      const [errors, result] = createSpot(form);
      expect(errors?.windDirections).toBeUndefined();
      expect(result).toBeNull();
    });
  });

  describe("valid form submission", () => {
    it("should return no error and the spot if the form is valid", () => {
      const mySpot = {
        name: "my-spot",
        description: "the best spot around town",
        latitude: "80.123",
        longitude: "-123.123",
        south: "south",
        southEast: "southEast",
        minWind: "1",
        maxWind: "2",
      };
      const expectedResult: Spot = {
        name: mySpot.name,
        description: mySpot.description,
        latitude: Number(mySpot.latitude),
        longitude: Number(mySpot.longitude),
        windDirections: ["southEast", "south"],
        windRange: [1, 2],
      };

      const form = createFormData(mySpot);
      const [errors, result] = createSpot(form);
      expect(errors).toBeNull();
      expect(result).toStrictEqual(expectedResult);
    });
  });
});

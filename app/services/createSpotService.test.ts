import type { FormFields } from "~/components/AddSpotForm";
import { Prisma } from "@prisma/client";
import { createSpotService } from "./createSpotService";

describe("createSpot", () => {
  // Helper function
  const createFormData = (
    fields: Partial<Record<`${FormFields}`, string | string[]>>
  ): FormData => {
    const formData = new FormData();
    for (const [field, value] of Object.entries(fields)) {
      formData.append(field, value.toString());
    }
    return formData;
  };

  describe("name", () => {
    it("should return an error if the name is missing", async () => {
      const form = createFormData({ name: "" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.name).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return not return an an error if the name is present", async () => {
      const form = createFormData({ name: "my-name" });
      const [errors, _] = await createSpotService(form);
      expect(errors?.name).toBeUndefined();
    });
  });

  describe("latitude", () => {
    it("should return an error if the latitude is missing", async () => {
      const form = createFormData({ latitude: "" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the latitude is of the wrong form", async () => {
      const form = createFormData({ latitude: "hello" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the latitude is out of the boundaries", async () => {
      const form = createFormData({ latitude: "91" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.latitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if the latitude is within -90 and 90", async () => {
      const form = createFormData({ latitude: "90" });
      const [errors, _] = await createSpotService(form);
      expect(errors?.latitude).toBeUndefined();
    });
  });

  describe("longitude", () => {
    it("should return an error if the longitude is missing", async () => {
      const form = createFormData({ longitude: "" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.longitude).not.toBeNull();
      expect(result).toBeNull();
    });
    it("should return an error if the longitude is of the wrong form", async () => {
      const form = createFormData({ longitude: "hello" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.longitude).not.toBeNull();
      expect(result).toBeNull();
    });
    it("should return an error if the longitude is out of the boundaries", async () => {
      const form = createFormData({ longitude: "181" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.longitude).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if the longitude is within -90 and 90", async () => {
      const form = createFormData({ longitude: "90" });
      const [errors, _] = await createSpotService(form);
      expect(errors?.longitude).toBeUndefined();
    });
  });

  describe("wind range", () => {
    it("should return an error if the wind min is below 0", async () => {
      const form = createFormData({ minWind: "-1" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrengthMin).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the wind min is NaN", async () => {
      const form = createFormData({ minWind: "hello" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrengthMin).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the wind max is NaN", async () => {
      const form = createFormData({ maxWind: "hello" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrenghtMax).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the min wind is missing", async () => {
      const form = createFormData({});
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrengthMin).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the max wind is missing", async () => {
      const form = createFormData({ minWind: "1" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrenghtMax).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should return an error if the min wind is above the max wind", async () => {
      const form = createFormData({ minWind: "2", maxWind: "1" });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windStrengthMin).not.toBeUndefined();
      expect(result).toBeNull();
    });
  });

  describe("wind directions", () => {
    it("should have at least one wind direction", async () => {
      const form = createFormData({});
      const [errors, result] = await createSpotService(form);
      expect(errors?.windDirections).not.toBeUndefined();
      expect(result).toBeNull();
    });
    it("should not return an error if there is at least one wind direction provided", async () => {
      const form = createFormData({ windDirections: ["true"] });
      const [errors, result] = await createSpotService(form);
      expect(errors?.windDirections).toBeUndefined();
      expect(result).toBeNull();
    });
  });

  describe("valid form submission", () => {
    it("should return no error and the spot if the form is valid", async () => {
      const mySpot = {
        name: "my-spot",
        description: "the best spot around town",
        latitude: "80.123",
        longitude: "-123.123",
        windDirections: ["south-east", "south"],
        minWind: "1",
        maxWind: "2",
      };
      const expectedResult = {
        name: mySpot.name,
        description: mySpot.description,
        latitude: Number(mySpot.latitude),
        longitude: Number(mySpot.longitude),
        windDirections: ["south-east", "south"],
        windStrenghtMax: 2,
        windStrengthMin: 1,
      };

      const form = createFormData(mySpot);
      const [errors, result] = await createSpotService(form);
      expect(errors).toBeNull();
      expect(result).toEqual(expect.objectContaining(expectedResult));
    });
  });
});

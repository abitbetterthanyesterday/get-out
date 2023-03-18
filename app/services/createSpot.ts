import { FormFields } from "~/components/AddSpotForm";
import type { Spot } from "~/models/spot";
import type { SpotRepository } from "~/repositories/interfaces";

const REQUIRED_MINIMUM_WIND_DIRECTIONS = 1;

export type ErrorCreateSpotForm = Partial<Record<keyof Spot, string>>;

/**
 * Create a spot
 * Validate a form an create a spot if the form is valid.
 *
 * @parVam The form to fill. Must be compliant with the FormFields interface
 * @returns [error, values] array containing the errors if any as the the first item of the array, the values passed as the second items
 */
export const createSpotService = (
  form: FormData,
  repository: SpotRepository
) => {
  let errors: ErrorCreateSpotForm = {};

  // Name validation
  const name = form.get(FormFields.Name) as string | undefined;
  if (!name) {
    errors.name = "A name is required.";
  }

  // Description validation
  const description = form.get(FormFields.Description) as string | undefined;

  // Latitude validation
  const latitude = form.get(FormFields.Latitude) as string | undefined;
  if (!latitude) {
    errors.latitude = "Latitude is required.";
  } else if (isNaN(Number(latitude))) {
    errors.latitude =
      "Wrong latitude format. Latitude is a number between -90 and 90 inclusive.";
  } else if (Number(latitude) < -90 || Number(latitude) > 90) {
    errors.latitude =
      "Latitude out of range. Latitude should be comprised between -90 and 90 inclusive.";
  }

  // Longitude validation
  const longitude = form.get(FormFields.Longitude) as string;
  if (!longitude) {
    errors.longitude = "Longitude is required.";
  } else if (isNaN(Number(longitude))) {
    errors.longitude =
      "Wrong longitude format. longitude is a number between -180 and 180 inclusive.";
  } else if (Number(longitude) < -180 || Number(longitude) > 180) {
    errors.longitude =
      "longitude out of range. longitude should be comprised between -180 and 180 inclusive.";
  }

  //Wind range
  const minWind = form.get(FormFields.MinWind) as string;
  const maxWind = form.get(FormFields.MaxWind) as string;
  if (!minWind) {
    errors.windRange = "Minimum wind is required";
  } else if (!maxWind) {
    errors.windRange = "Minimum wind is required";
  } else if (isNaN(Number(minWind)) || isNaN(Number(maxWind))) {
    errors.windRange = "Minimum wind and maximum wind must be numbers.";
  } else if (Number(minWind) < 0) {
    errors.windRange = "Minimum wind must be a number above 0.";
  } else if (Number(minWind) > Number(maxWind)) {
    errors.windRange = "Minimum wind can't be higher than minimum wind";
  }

  // Wind direction validation
  const windDirections: Spot["windDirections"] =
    (form.getAll(FormFields.WindDirections) as Spot["windDirections"]) ?? [];

  if (windDirections.length < REQUIRED_MINIMUM_WIND_DIRECTIONS) {
    errors.windDirections = "At least one wind direction required";
  }

  // Result
  if (Object.values(errors).length > 0) {
    // Invalid form
    return [errors as ErrorCreateSpotForm, null] as const;
  } else {
    // Valid form
    const spot: Omit<Spot, "id"> = {
      name: name as string,
      description,
      latitude: Number(latitude),
      longitude: Number(longitude),
      windRange: [Number(minWind), Number(maxWind)],
      windDirections,
    };
    return [null, spot] as const;
  }
};

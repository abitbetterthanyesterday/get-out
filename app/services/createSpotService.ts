import type { Prisma, WindDirections } from "@prisma/client";

import { FormFields } from "~/components/AddSpotForm";
import { spotModel } from "~/models/spot.server";

const REQUIRED_MINIMUM_WIND_DIRECTIONS = 1;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
export type ErrorCreateSpotForm = Partial<Record<keyof CreateSpot, string>>;
export type CreateSpot = UnwrapPromise<ReturnType<typeof spotModel.create>>;

/**
 * Create a spot
 * Validate a form an create a spot if the form is valid.
 *
 * @parVam The form to fill. Must be compliant with the FormFields interface
 * @returns [error, values] array containing the errors if any as the the first item of the array, the values passed as the second items
 */
export const createSpotService = async (form: FormData) => {
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

  if (Number(minWind) > Number(maxWind)) {
    errors.windStrengthMin = "Minimum wind can't be higher than maximum wind";
  }

  if (!minWind) {
    errors.windStrengthMin = "Minimum wind is required";
  } else if (isNaN(Number(minWind))) {
    errors.windStrengthMin = "Minimum wind and maximum wind must be numbers.";
  } else if (Number(minWind) < 0) {
    errors.windStrengthMin = "Minimum wind must be a number above 0.";
  }

  if (!maxWind) {
    errors.windStrenghtMax = "Maximum wind is required";
  } else if (isNaN(Number(maxWind))) {
    errors.windStrenghtMax = "Minimum wind and maximum wind must be numbers.";
  }

  // Wind direction validation
  const windDirections: WindDirections[] =
    (form
      .getAll(FormFields.WindDirections)
      .map((i) => i.toString().split(","))
      .flat() as WindDirections[]) ?? [];

  if (windDirections.length < REQUIRED_MINIMUM_WIND_DIRECTIONS) {
    errors.windDirections = "At least one wind direction required";
  }

  // Result
  if (Object.values(errors).length > 0) {
    // Invalid form
    return [errors as ErrorCreateSpotForm, null] as const;
  } else {
    // Valid form
    const values: Prisma.SpotCreateInput = {
      name: name as string,
      description: description ?? "",
      latitude: Number(latitude),
      longitude: Number(longitude),
      windStrenghtMax: Number(maxWind),
      windStrengthMin: Number(minWind),
      windStrengthUnit: "knots",
      windDirections,
    };
    try {
      await spotModel.create(values);
      return [null, values] as const;
    } catch (e) {
      // TODO general issue here to handle
      return [errors, values] as const;
    }
  }
};

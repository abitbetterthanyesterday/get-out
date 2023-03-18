const REQUIRED_MINIMUM_WIND_DIRECTIONS = 1;

export interface Spot {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  windRange: [number, number];
  windDirections: string[];
}

enum FormFields {
  Name = "name",
  Description = "description",
  Latitude = "latitude",
  Longitude = "longitude",
  MinWind = "minWind",
  MaxWind = "maxWind",
  WindDirections = "windDirections",
}

export type ErrorCreateSpotForm = Partial<Record<keyof Spot, string>>;

export const createSpot = (form: FormData) => {
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
  const windDirections = form.getAll(FormFields.WindDirections) ?? [];

  if (windDirections.length < REQUIRED_MINIMUM_WIND_DIRECTIONS) {
    errors.windDirections = "At least one wind direction required";
  }

  // Result
  if (Object.values(errors).length > 0) {
    return [errors as ErrorCreateSpotForm, null] as const;
  } else {
    const spot = {
      name,
      description,
      latitude: Number(latitude),
      longitude: Number(longitude),
      windRange: [Number(minWind), Number(maxWind)],
      windDirections,
    } as Spot;
    return [null, spot] as const;
  }
};

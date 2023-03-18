import type { Spot } from "~/models/spot";
import type { ErrorCreateSpotForm } from "../services/createSpot";
export interface Props {
  errors?: ErrorCreateSpotForm | null;
  values?: Partial<Spot>;
}

export enum FormFields {
  Name = "name",
  Description = "description",
  Latitude = "latitude",
  Longitude = "longitude",
  MinWind = "minWind",
  MaxWind = "maxWind",
  WindDirections = "windDirections",
}
const windDirections = [
  "north",
  "south",
  "east",
  "west",
  "north-east",
  "north-west",
  "south-east",
  "south-west",
];

export function AddSpotForm({ errors, values }: Props) {
  return (
    <div>
      <h1 className="heading">Add a spot</h1>
      <div className="w-full form-control">
        <div>
          <label className="label" htmlFor="name">
            <span className="label-text">name</span>
          </label>
          <input
            name={FormFields.Name}
            id={FormFields.Name}
            type="text"
            defaultValue={values?.name}
            className="w-full max-w-xs input input-bordered"
          />
          {errors?.name && <p className={"text-error"}>{errors.name}</p>}
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">description</span>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="w-full max-w-xs input input-bordered"
            defaultValue={values?.description}
          />
          {errors?.description && (
            <p className={"text-error"}>{errors.description}</p>
          )}
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label" htmlFor="latitude">
            <span className="label-text">Latitude</span>
          </label>
          <input
            name="latitude"
            id="latitude"
            className="w-full max-w-xs input input-bordered"
            defaultValue={values?.latitude}
          />
          {errors?.latitude && (
            <p className={"text-error"}>{errors.latitude}</p>
          )}
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label" htmlFor="longitude">
            <span className="label-text">Longitude</span>
          </label>
          <input
            name="longitude"
            id="longitude"
            className="w-full max-w-xs input input-bordered"
            defaultValue={values?.longitude}
          />
          {errors?.longitude && (
            <p className={"text-error"}>{errors.longitude}</p>
          )}
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label" htmlFor="wind-min">
            <span className="label-text">Min wind</span>
          </label>
          <input
            name="minWind"
            aria-label="minWind"
            id="minWind"
            type="number"
            defaultValue={values?.windRange?.at(0)}
            className="w-full max-w-xs input input-bordered"
          />
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label" htmlFor="wind-max">
            <span className="label-text">Max wind</span>
          </label>
          <input
            name="maxWind"
            id="maxWind"
            aria-label="maxWind"
            type="number"
            defaultValue={values?.windRange?.at(-1)}
            className="w-full max-w-xs input input-bordered"
          />
          {errors?.windRange && (
            <p className={"text-error"}>{errors.windRange}</p>
          )}
        </div>
        <div className="flex flex-wrap">
          {windDirections.map((direction) => (
            <div className="w-full max-w-xs form-control" key={direction}>
              <label className="label" htmlFor={`windDirections-${direction}`}>
                <span className="label-text">{direction}</span>
              </label>
              <input
                name="windDirections"
                aria-label={`windDirections-${direction}`}
                id={`windDirections-${direction}`}
                value={direction}
                defaultChecked={values?.windDirections?.includes(direction)}
                type="checkbox"
                className="w-full max-w-xs input input-bordered"
              />
            </div>
          ))}
          {errors?.windDirections && (
            <p className={"text-error"}>{errors.windDirections}</p>
          )}
        </div>
      </div>
      <button type="submit" className="btn">
        Add
      </button>
    </div>
  );
}

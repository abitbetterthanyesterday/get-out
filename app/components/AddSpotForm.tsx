import type { ErrorCreateSpotForm } from "~/services/createSpotService";
import { Link } from "@remix-run/react";
import type { Prisma } from "@prisma/client";
import { WindDirections } from "@prisma/client";

export interface Props {
  errors?: ErrorCreateSpotForm | null;
  values?: Partial<Prisma.SpotCreateInput>;
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

export function AddSpotForm({ errors, values }: Props) {
  return (
    <div className="flex flex-col p-24 bg-base-100 rounded-md">
      <div className="flex-grow-1">
        <h1 className="heading mb-0 text-neutral-focus">
          Add a New Kiting Spot
        </h1>
        <h2 className="heading mb-0 text-neutral">1. General</h2>
        <div className="w-full form-control">
          <div>
            <label className="label" htmlFor="name">
              <span className="label-text font-bold">Name</span>
            </label>
            <div className="relative">
              <input
                name={FormFields.Name}
                id={FormFields.Name}
                type="text"
                defaultValue={values?.name}
                className={`w-full input input-bordered ${
                  errors?.name && "input-error"
                }`}
              />
              {errors?.name && (
                <i className="text-error absolute right-2 h-full flex items-center top-0">
                  x
                </i>
              )}
            </div>
            {errors?.name && (
              <span className={"text-error"}>{errors.name}</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="w-full input input-bordered"
              defaultValue={values?.description ?? ""}
            />
            {errors?.description && (
              <p className={"text-error"}>{errors.description}</p>
            )}
          </div>

          <h2 className="heading mb-0">2. Location</h2>
          <div className="w-full form-control">
            <label className="label" htmlFor="latitude">
              <span className="label-text">Latitude</span>
            </label>
            <input
              name="latitude"
              id="latitude"
              className="w-full input input-bordered"
              defaultValue={values?.latitude}
            />
            {errors?.latitude && (
              <p className={"text-error"}>{errors.latitude}</p>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label" htmlFor="longitude">
              <span className="label-text">Longitude</span>
            </label>
            <input
              name="longitude"
              id="longitude"
              className="w-full input input-bordered"
              defaultValue={values?.longitude}
            />
            {errors?.longitude && (
              <p className={"text-error"}>{errors.longitude}</p>
            )}
          </div>
          <h2 className="heading">3. Weather</h2>
          <h3 className="heading mb-0">Wind Strength</h3>
          <div className="w-full form-control">
            <label className="label" htmlFor="wind-min">
              <span className="label-text">Min wind</span>
            </label>
            <input
              name="minWind"
              aria-label="minWind"
              id="minWind"
              type="number"
              defaultValue={values?.windStrengthMin}
              className="w-full input input-bordered"
            />
          </div>
          <div className="w-full form-control">
            <label className="label" htmlFor="wind-max">
              <span className="label-text">Max wind</span>
            </label>
            <input
              name="maxWind"
              id="maxWind"
              aria-label="maxWind"
              type="number"
              defaultValue={values?.windStrenghtMax}
              className="w-full input input-bordered"
            />
            {(errors?.windStrenghtMax || errors?.windStrengthMin) && (
              <>
                <p className={"text-error"}>{errors.windStrengthMin}</p>
                <p className={"text-error"}>{errors.windStrenghtMax}</p>
              </>
            )}
          </div>
          <h3 className="heading">Wind Directions</h3>
          <div className="grid grid-cols-3">
            {Object.values(WindDirections).map((direction, index) => (
              <div key={direction}>
                {index === 4 && <div></div>}
                <div className="items-center form-control">
                  <label
                    className="cursor-pointer label"
                    htmlFor={`windDirections-${direction}`}
                  >
                    <span className="capitalize label-text">{direction}</span>
                  </label>
                  <input
                    name="windDirections"
                    aria-label={`windDirections-${direction}`}
                    id={`windDirections-${direction}`}
                    value={direction}
                    defaultChecked={(
                      values?.windDirections as
                        | Prisma.Enumerable<WindDirections>
                        | undefined
                    )?.includes(direction)}
                    type="checkbox"
                    className="self-center cursor-pointer checkbox checkbox-primary"
                  />
                </div>
              </div>
            ))}
            {errors?.windDirections && (
              <p className={"text-error"}>{errors.windDirections}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-24 gap-y-4 gap-12">
        <Link
          role="button"
          type="submit"
          className="btn btn-outline btn-secondary flex-grow"
          to="/"
        >
          cancel
        </Link>
        <button type="submit" className="btn btn-primary flex-grow">
          Add
        </button>
      </div>
    </div>
  );
}

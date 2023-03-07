import type { ErrorCreateSpotForm } from "../utils/createSpot";
export interface Props {
  errors?: ErrorCreateSpotForm | null;
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

export function AddSpotForm({ errors }: Props) {
  return (
    <>
      <h1 className="heading">Add a spot</h1>
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full max-w-xs input input-bordered"
        />
        {errors?.name && <p className={"text-error"}>{errors.name}</p>}
      </div>
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="description">
          <span className="label-text">description</span>
        </label>
        <input
          id="description"
          type="text"
          className="w-full max-w-xs input input-bordered"
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
          id="latitude"
          type="number"
          className="w-full max-w-xs input input-bordered"
        />
        {errors?.latitude && <p className={"text-error"}>{errors.latitude}</p>}
      </div>
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="longitude">
          <span className="label-text">Longitude</span>
        </label>
        <input
          id="longitude"
          type="number"
          className="w-full max-w-xs input input-bordered"
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
          id="wind-min"
          type="number"
          className="w-full max-w-xs input input-bordered"
        />
      </div>
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="wind-max">
          <span className="label-text">Max wind</span>
        </label>
        <input
          id="wind-max"
          type="number"
          className="w-full max-w-xs input input-bordered"
        />
        {errors?.windRange && (
          <p className={"text-error"}>{errors.windRange}</p>
        )}
      </div>
      <div className="flex flex-wrap">
        {windDirections.map((direction) => (
          <div className="w-full max-w-xs form-control" key={direction}>
            <label className="label" htmlFor={`wind-direction-${direction}`}>
              <span className="label-text">{direction}</span>
            </label>
            <input
              id={`wind-direction-${direction}`}
              type="checkbox"
              className="w-full max-w-xs input input-bordered"
            />
          </div>
        ))}
        {errors?.windDirections && (
          <p className={"text-error"}>{errors.windDirections}</p>
        )}
      </div>
      <button type="submit" className="btn">
        Add
      </button>
    </>
  );
}

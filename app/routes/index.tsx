import { Link, useLoaderData } from "@remix-run/react";

import { DIContainer } from "~/db.server";
import type { Spot } from "~/models/spot.server";

export async function loader() {
  const spots = DIContainer.getInstance().spotRepository.findAll();
  return spots;
}
export default function Index() {
  const spots = useLoaderData<typeof loader>() as Spot[];
  return (
    <main className="flex flex-col justify-center h-screen max-w-md gap-12 mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-9xl">
          Get out
        </h1>
        <h2 className="text-2xl text-slate-400">
          What are you waiting for? Get out and get some fresh air!
        </h2>
      </div>
      <>
        {spots.map((spot) => (
          <p key={spot.id}>{spot.name}</p>
        ))}
      </>

      <Link to="/add" className="btn">
        Add a spot
      </Link>
    </main>
  );
}

import { Link } from "@remix-run/react";

export default function Index() {
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

      <Link to="/add" className="btn">
        Add a spot
      </Link>
    </main>
  );
}

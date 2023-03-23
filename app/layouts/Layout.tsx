import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <main className="flex-grow flex items-center relative w-screen">
        {children}
      </main>
      {/* <nav className="bg-primary py-12">Navbar</nav> */}
    </div>
  );
}

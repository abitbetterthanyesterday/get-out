import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col from-base-200 to-base-300 text-base-content bg-gradient-to-br max-w-screen p-2 overflow-hidden box-border">
      <main className="flex-grow flex items-center relative">{children}</main>
      {/* <nav className="bg-primary py-12">Navbar</nav> */}
    </div>
  );
}

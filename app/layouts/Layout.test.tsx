import { render, screen } from "@testing-library/react";

import { Layout } from "./Layout";

describe("Layout", () => {
  it("renders the children and the navbar", () => {
    const Child = () => <h1>Hello world</h1>;
    render(
      <Layout>
        <Child />
      </Layout>
    );

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});

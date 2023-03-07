import { render, screen } from "@testing-library/react";
import type { ErrorCreateSpotForm, Spot } from "../utils/createSpot";
import type { Props } from "./AddSpotForm";
import { AddSpotForm } from "./AddSpotForm";

describe("Add", () => {
  const defaultProps: Props = {
    errors: {},
  };
  const inputs = [
    {
      type: "textbox",
      name: "name",
    },
    {
      type: "textbox",
      name: "description",
    },
    {
      type: "spinbutton",
      name: "latitude",
    },
    {
      type: "spinbutton",
      name: "longitude",
    },
    {
      type: "checkbox",
      name: "north",
    },
    {
      type: "checkbox",
      name: "south",
    },
    {
      type: "checkbox",
      name: "east",
    },
    {
      type: "checkbox",
      name: "west",
    },
    {
      type: "checkbox",
      name: "north-east",
    },
    {
      type: "checkbox",
      name: "north-west",
    },
    {
      type: "checkbox",
      name: "south-east",
    },
    {
      type: "checkbox",
      name: "south-west",
    },
  ];

  it("should render", () => {
    expect(() => render(<AddSpotForm {...defaultProps} />)).not.toThrow();
  });
  it("should have the form and the right inputs", () => {
    // Arrange
    render(<AddSpotForm {...defaultProps} />);

    // Assert
    for (const { type, name } of inputs) {
      const regexp = new RegExp(`^${name}$`, "i");
      expect(screen.getByRole(type, { name: regexp })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should show a validation errors", async () => {
    // Arrange
    let errors = {} as ErrorCreateSpotForm;
    let inputs: (keyof Spot)[] = [
      "name",
      "description",
      "latitude",
      "longitude",
      "windRange",
      "windDirections",
    ];
    inputs.forEach((input) => (errors[input] = `${input} error`));

    render(<AddSpotForm errors={errors} />);
    const submitButton = screen.getByRole("button", { name: /add/i });

    // Act
    submitButton.click();

    // Assert
    for (const errorMessage of Object.values(errors)) {
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    }
  });
});

export {};

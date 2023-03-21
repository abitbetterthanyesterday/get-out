import type {
  CreateSpot,
  ErrorCreateSpotForm,
} from "../services/createSpotService";
import { render, screen } from "@testing-library/react";

import { AddSpotForm } from "./AddSpotForm";
import type { Props } from "./AddSpotForm";
import { Spot } from "@prisma/client";

describe("Add", () => {
  const defaultProps: Props = {
    errors: {},
    values: {},
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
      type: "textbox",
      name: "latitude",
    },
    {
      type: "textbox",
      name: "longitude",
    },
    {
      type: "checkbox",
      name: "windDirections-north",
    },
    {
      type: "checkbox",
      name: "windDirections-south",
    },
    {
      type: "checkbox",
      name: "windDirections-east",
    },
    {
      type: "checkbox",
      name: "windDirections-west",
    },
    {
      type: "checkbox",
      name: "windDirections-north-east",
    },
    {
      type: "checkbox",
      name: "windDirections-north-west",
    },
    {
      type: "checkbox",
      name: "windDirections-south-east",
    },
    {
      type: "checkbox",
      name: "windDirections-south-west",
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
      const regexp = RegExp(`^${name}$`, "i");
      expect(screen.getByRole(type, { name: regexp })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should render with the default values", () => {
    const values: Partial<CreateSpot> = {
      name: "my great spot",
      description: "awesome local spot",
      longitude: 123,
      latitude: 80,
      windStrengthMin: 2,
      windStrenghtMax: 4,
      windDirections: [
        "north",
        "northEast",
        "east",
        "southEast",
        "south",
        "southWest",
        "west",
        "northWest",
      ],
    };
    render(<AddSpotForm {...{ ...defaultProps, values }} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(
      values.name
    );
    expect(screen.getByRole("textbox", { name: /description/i })).toHaveValue(
      values.description
    );
    expect(screen.getByRole("textbox", { name: /latitude/i })).toHaveValue(
      values.latitude?.toString()
    );
    expect(screen.getByRole("textbox", { name: /longitude/i })).toHaveValue(
      values.longitude?.toString()
    );
    expect(screen.getByRole("spinbutton", { name: /min.*wind/i })).toHaveValue(
      Number(values.windStrengthMin?.toString())
    );
    expect(screen.getByRole("spinbutton", { name: /max.*wind/i })).toHaveValue(
      Number(values.windStrenghtMax?.toString())
    );
  });
  it("should show a validation errors", async () => {
    // Arrange
    let errors = {} as ErrorCreateSpotForm;
    let inputs: (keyof Spot)[] = [
      "name",
      "description",
      "latitude",
      "longitude",
      "windStrengthMin",
      "windStrenghtMax",
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

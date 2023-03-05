describe("template spec", () => {
  it("passes", () => {
    cy.visit("/health-check");
    cy.findByText("Hello world").should("exist");
  });
});

export {};

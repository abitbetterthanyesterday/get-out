describe("add spot", () => {
  it("passes", () => {
    cy.visit("/add");

    // Fill the form
    cy.findByRole("form").should("exist");
    // Name
    cy.findByRole("textbox", { name: /name/i }).type("Sandgate");
    cy.findByRole("textbox", { name: /description/i }).type("Sandgate");
    // Position
    cy.findByRole("textbox", { name: /latitude/i }).type("-27.323");
    cy.findByRole("textbox", { name: /longitude/i }).type("153.071");
    // Wind strength
    cy.findByRole("spinbutton", { name: /max.*wind/i }).type("20");
    cy.findByRole("spinbutton", { name: /min.*wind/i }).type("10");
    // Wind direction
    cy.findByRole("checkbox", { name: /windDirections-south$/i }).check();
    cy.findByRole("checkbox", { name: /windDirections-east$/i }).check();
    cy.findByRole("checkbox", { name: /windDirections-north$/i }).check();
    cy.findByRole("checkbox", { name: /windDirections-north-east$/i }).check();
    cy.findByRole("checkbox", { name: /windDirections-south-east$/i }).check();
    // Submit
    cy.findByRole("button", { name: /add/i }).click();

    // Redirection
    cy.url().should("include", "/");
    cy.findByText(/sandgate/i).should("exist");
  });
});

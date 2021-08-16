describe("Add transaction", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("Add transaction", () => {
    cy.contains("add", { matchCase: false }).click();
    cy.get("input[name=name]").type("Some company");
    cy.get("input[name=amount]").type("12.32");
    cy.get("button[type=submit]").contains("add", { matchCase: false }).click();
    cy.contains("Some company");
  });

  it("incorrect fields", () => {
    cy.contains("add", { matchCase: false }).click();
    cy.get("input[name=amount]").type("f12.invalid-amount32a");
    cy.get("button[type=submit]").contains("add", { matchCase: false }).click();
    cy.contains("Incorrect name", { matchCase: false });
    cy.contains("Incorrect amount", { matchCase: false });
  });

  it("add with currency change", () => {
    cy.contains("add", { matchCase: false }).click();
    cy.get("input[name=name]").type("Some company");
    cy.get("input[name=amount]").type("12.32");
    cy.get("form").contains("EUR", { matchCase: false }).click();
    cy.get("[data-testid=options]").contains("PLN").click();
    cy.get("button[type=submit]").contains("add", { matchCase: false }).click();
    cy.contains("Some company");
  });
});

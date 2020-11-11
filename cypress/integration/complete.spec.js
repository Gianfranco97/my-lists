describe("End to End Testing", () => {
  before(() => {
    sessionStorage.clear();
  });

  it("Forgot password message", () => {
    cy.visit("http://localhost:3000");
    cy.get("#form-forgot").click();
    cy.get("#email").type("myEmail@email.com");
    cy.get(".ant-btn").click();

    cy.wait(1100);

    cy.get("p").should(
      "contain",
      "This message is a lie, for the moment this is just a test. Maybe in the future if I am hired I will make this feature ^_^"
    );
  });

  it("Login user", () => {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("MyUser");
    cy.get("#password").type("123456");
    cy.get(".ant-btn").click();
  });

  it("Logout", () => {
    cy.get(".ant-menu > :nth-child(2)").click();
    cy.get(".ant-btn-dangerous").click();
    cy.get(".auth-form").should("exist");
  });
});

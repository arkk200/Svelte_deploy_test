const baseUrl = "http://localhost:8080/";

function login() {
  cy.visit(baseUrl);
  cy.contains("Username").children("input").type("asdf");
  cy.contains("Password").children("input").type("asdf");

  cy.get("button").contains("Login").click();
}

function addCategories() {
  login();

  cy.get('[data-testid="category-name-input"]').as("nameInput").type("Clothes");
  cy.get("button").contains("Add Category").click();

  cy.get("@nameInput").type("Toiletries{enter}");
}

function addItems() {
  addCategories();

  cy.get("[data-testid=item-input]").first().as("item-input-1").type("socks");
  cy.get("button").contains("Add Item").first().click();
  cy.get("@item-input-1").type("shoes{enter}");
  verifyStatus("Clothes", "2 of 2 remaining");

  cy.get("[data-testid=item-input]").last().type("razor{enter}");
  verifyStatus("Toiletries", "1 of 1 remaining");
}

function deleteCategory(categoryName) {
  cy.contains(new RegExp(`^${categoryName}$`))
    .siblings("button")
    .click();
}

function deleteItem(itemNa) {
  cy.contains(new RegExp(`^${itemNa}$`))
    .siblings("button")
    .click();
}

function togglePacked(itemName) {
  cy.contains(new RegExp(`^${itemName}$`))
    .siblings('input[type="checkbox"]')
    .click();
}

function verifyStatus(categoryName, expectedStatus) {
  cy.contains(new RegExp(`^${categoryName}$`))
    .siblings("span")
    .contains(expectedStatus);
}

describe("Travel Packing app", () => {
  it("should login", login);

  it("should add categories", addCategories);

  it("should add items", addItems);

  it("should toggle packed", () => {
    addItems();
    verifyStatus("Clothes", "2 of 2 remaining");

    togglePacked("shoes");
    verifyStatus("Clothes", "1 of 2 remaining");

    togglePacked("shoes");
    verifyStatus("Clothes", "2 of 2 remaining");
  });

  it("should delete item", () => {
    addItems();
    verifyStatus("Clothes", "2 of 2 remaining");

    deleteItem("shoes");
    verifyStatus("Clothes", "1 of 1 remaining");
  });

  it("should delete category", () => {
    addItems();
    verifyStatus("Toiletries", "1 of 1 remaining");

    deleteItem("razor");
    verifyStatus("Toiletries", "0 of 0 remaining");

    const categoryName = "Toiletries";

    cy.get(".categories h3 > .category-name").contains(categoryName);
    deleteCategory(categoryName);

    cy.get(".categories h3 > .category-name")
      .contains(categoryName)
      .should("not.exist");
  });

  it("should logout", () => {
    login();
    cy.get("button").contains("Log Out").click();
    cy.contains("Login");
  });
});

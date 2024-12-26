describe("CRUD Operations on JSON Data", () => {
  const baseUrl = "http://localhost:3000/data";

  it("should return the correct status code", () => {
    cy.request("http://localhost:3000").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message");
    });
  });

  it("should create new data", () => {
    cy.request("POST", baseUrl, {
      name: "Test Item",
      description: "A test item",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("name", "Test Item");
    });
  });

  it("should read all data", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should read one item by ID", () => {
    cy.request("POST", baseUrl, {
      name: "Another Item",
      description: "Another test item",
    }).then((createResponse) => {
      const itemId = createResponse.body.id;
      cy.request("GET", `${baseUrl}/${itemId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", "Another Item");
      });
    });
  });

  it("should update an item by ID", () => {
    cy.request("POST", baseUrl, {
      name: "Update Item",
      description: "To be updated",
    }).then((createResponse) => {
      const itemId = createResponse.body.id;
      cy.request("PUT", `${baseUrl}/${itemId}`, {
        name: "Updated Item",
        description: "Updated description",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", "Updated Item");
      });
    });
  });

  it("should delete an item by ID", () => {
    cy.request("POST", baseUrl, {
      name: "Delete Item",
      description: "Item to delete",
    }).then((createResponse) => {
      const itemId = createResponse.body.id;
      cy.request("DELETE", `${baseUrl}/${itemId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("message", "Item deleted");
      });
    });
  });
});

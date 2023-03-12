/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = "4px solid rgb(0, 50, 255)";
const borderChanging = "4px solid rgb(210, 82, 225)";
const borderModified = "4px solid rgb(127, 224, 81)";

describe("Queue page test", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  it("empty input", function () {
    cy.get("[class^='input_input']").clear();
    cy.get("#addToHead").should("be.disabled");
    cy.get("#addToTail").should("be.disabled");
    cy.get("#addByIndex").should("be.disabled");
    cy.get("#deleteByIndex").should("be.disabled");
  });

  it("add to head", function () {
    cy.get('input[name="value"]').type("abc");
    cy.get("[class*=circle_content]").as("circle");
    cy.get("#addToHead").as("buttonAddtoHead");
    cy.get("@buttonAddtoHead").click();
    cy.get("@circle")
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.not.contain("head");
          expect(el).to.contain("abc");
        }
      })

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5).each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("head");
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderModified);
        }
      })
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      });

  });

  it("add to tail", function () {
    cy.get('input[name="value"]').type("abc");
    cy.get("[class*=circle_content]").as("circle");
    cy.get("#addToTail").as("buttonAddToTail");
    cy.get("@buttonAddToTail").click();
    cy.get("@circle")
      .each((el, i) => {
        if (i === 4) {
          expect(el).to.not.contain("tail");
          expect(el).to.contain("abc");
        }
      })

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5).each((el, i) => {
        if (i === 4) {
          expect(el).to.contain("tail");
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderModified);
        }
      })
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      });

  })

  it("add by index", function () {
    cy.get('input[name="value"]').type("abc");
    cy.get('input[name="index"]').type("2");
    cy.get("#addByIndex").as("buttonAddByIndex");
    cy.get("@buttonAddByIndex").click();
    cy.get("[class*=circle_content]").as("circle");

    cy.get("@circle")
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.not.contain("head");
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });
    cy.wait(1000);
    cy.get("@circle")
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("head");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 1) {
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });
    cy.wait(1000);
    cy.get("@circle")
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("head");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 1) {
          expect(el).to.not.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 2) {
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("head");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 1) {
          expect(el).to.not.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 2) {
          expect(el).to.contain("abc");
          expect(el.children()[1]).to.have.css("border", borderModified);
        }
      });

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 5)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      });


  })

  it("add by index", function () {
    cy.get('input[name="index"]').type("2");
    cy.get("#deleteByIndex").as("buttonDeleteByIndex");
    cy.get("@buttonDeleteByIndex").click();
    cy.get("[class*=circle_content]").as("circle");
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 4).each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("head");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      })
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 4).each((el, i) => {
        if (i === 0 || i === 1) {
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      })
    cy.wait(1000);
    cy.get("@circle").each((el, i) => {
      if (i === 0 || i === 1 || i === 2) {
        expect(el.children()[1]).to.have.css("border", borderChanging);
      }
    })
    cy.get("@circle")
      .should("have.length", 3).each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      })

  })

})
/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = "4px solid rgb(0, 50, 255)";
const borderChanging = "4px solid rgb(210, 82, 225)";
const borderModified = "4px solid rgb(127, 224, 81)";

describe("Queue page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("empty input", function () {
    cy.get("[class^='input_input']").clear();
    cy.get("#add").should("be.disabled");
  });

  it("add elements", function () {
    cy.get("[class^='input_input']").type("abc");
    cy.get("#add").as("buttonAdd");
    cy.get("[class*=circle_content]").as("circle");
    cy.get("@buttonAdd").click();

    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.not.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      });

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("abc");
          expect(el).to.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });

    cy.get("[class^='input_input']").type("123");
    cy.get("@buttonAdd").click();

    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("abc");
          expect(el).to.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 1) {
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      });

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("abc");
          expect(el).to.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 1) {
          expect(el).to.contain("123");
          expect(el).to.not.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      });

    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      });

    cy.get("[class^='input_input']").type("qwe");
    cy.get("@buttonAdd").click();
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("abc");
          expect(el).to.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 1) {
          expect(el).to.contain("123");
          expect(el).to.not.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 2) {
          expect(el).to.not.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      });
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("abc");
          expect(el).to.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 1) {
          expect(el).to.contain("123");
          expect(el).to.not.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 2) {
          expect(el).to.contain("qwe");
          expect(el).to.not.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
      });
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el) => {
        expect(el.children()[1]).to.have.css("border", borderDefault);
      });
  });

  it("detele elements", function () {
    cy.get("#delete").as("buttonDelete");
    cy.get("#add").as("buttonAdd");
    cy.get("[class^='input_input']").type("1");
    cy.get("@buttonAdd").click();
    cy.get("[class^='input_input']").type("2");
    cy.get("@buttonAdd").click();
    cy.get("[class^='input_input']").type("3");
    cy.get("@buttonAdd").click();
    cy.get("[class*=circle_content]").as("circle");
    cy.get("@buttonDelete").click();
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("1");
          expect(el).to.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderChanging);
        }
        if (i === 1) {
          expect(el).to.contain("2");
          expect(el).to.not.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 2) {
          expect(el).to.contain("3");
          expect(el).to.not.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });
    cy.wait(1000);
    cy.get("@circle")
      .should("have.length", 7)
      .each((el, i) => {
        if (i === 0) {
          expect(el).to.contain("");
          expect(el).to.not.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 1) {
          expect(el).to.contain("2");
          expect(el).to.contain("head");
          expect(el).to.not.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
        if (i === 2) {
          expect(el).to.contain("3");
          expect(el).to.not.contain("head");
          expect(el).to.contain("tail");
          expect(el.children()[1]).to.have.css("border", borderDefault);
        }
      });
  })

  it('clear queue', function () {
    cy.get("[class^='input_input']").type('a')
    cy.get('#add').as('buttonAdd')
    cy.get('@buttonAdd').click()
    cy.get("[class^='input_input']").type('b')
    cy.get('@buttonAdd').click()
    cy.get("[class^='input_input']").type('c')
    cy.get('@buttonAdd').click()
    cy.get('#clear').as('buttonClear')
    cy.get('[class*=circle_content]').as('circle')
    cy.get('@buttonClear').click()
    cy.get('@circle').should('have.length', 7).each((el) => {
      expect(el).to.contain("");
      expect(el.children()[1]).to.have.css("border", borderDefault);
    })

  })

});

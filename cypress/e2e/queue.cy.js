/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = "4px solid rgb(0, 50, 255)";
const borderChanging = "4px solid rgb(210, 82, 225)";

describe("Queue page test", () => {
  beforeEach(() => {
    cy.visit("queue");
    cy.get(Cypress.env("input")).as('input');
    cy.get(Cypress.env("circle")).as('circle');
    cy.get("#add").as('buttonAdd');
  });

  it("empty input", function () {
    cy.get('@input').clear();
    cy.get('@buttonAdd').should("be.disabled");
  });

  it("add elements", function () {
    cy.get('@input').type("abc");
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

    cy.get('@input').type("123");
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

    cy.get('@input').type("qwe");
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
    cy.get('@input').type("1");
    cy.get("@buttonAdd").click();
    cy.get('@input').type("2");
    cy.get("@buttonAdd").click();
    cy.get('@input').type("3");
    cy.get("@buttonAdd").click();
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
    cy.get('@input').type('a')
    cy.get('@buttonAdd').click()
    cy.get('@input').type('b')
    cy.get('@buttonAdd').click()
    cy.get('@input').type('c')
    cy.get('@buttonAdd').click()
    cy.get('#clear').as('buttonClear')
    cy.get('@buttonClear').click()
    cy.get('@circle').should('have.length', 7).each((el) => {
      expect(el).to.contain("");
      expect(el.children()[1]).to.have.css("border", borderDefault);
    })

  })

});

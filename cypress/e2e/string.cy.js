/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = '4px solid rgb(0, 50, 255)';
const borderChanging = '4px solid rgb(210, 82, 225)';
const borderModified = '4px solid rgb(127, 224, 81)';

describe('String page test', () => {
  beforeEach(() => {
    cy.visit('recursion');
    cy.get(Cypress.env("input")).as('input');
    cy.get('#reverse').as('button');
  })

  it('empty input', function () {
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  })

  it('check reverse string one letter', function () {
    cy.get('@input').type('a');
    cy.get('@button').click();
    cy.get(Cypress.env("circle")).as('circle')
    cy.get('@circle').should('have.length', 1).each((el) => {
      expect(el.children()[1]).to.have.css('border', borderDefault)
      expect(el).to.contain('a')
    });

    cy.wait(500);

    cy.get('@circle').each((el) => {
      expect(el.children()[1]).to.have.css('border', borderChanging)
    });

    cy.wait(500);

    cy.get('@circle').each((el) => {
      expect(el.children()[1]).to.have.css('border', borderModified)
    });
  })

  it('check reverse string uneven letters number', function () {
    cy.get('@input').type('abc');
    cy.get('@button').click();
    cy.get(Cypress.env("circle")).as('circle');
    cy.get('@circle').should('have.length', 3).each((el, i) => {
      expect(el.children()[1]).to.have.css('border', borderDefault)
      if (i === 0) expect(el).to.contain('a')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('c')
    });

    cy.wait(500);

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      if (i === 0) expect(el).to.contain('a') && expect(el.children()[1]).to.have.css('border', borderChanging)
      if (i === 1) expect(el).to.contain('b') && expect(el.children()[1]).to.have.css('border', borderDefault)
      if (i === 2) expect(el).to.contain('c') && expect(el.children()[1]).to.have.css('border', borderChanging)
    });

    cy.wait(500);

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      if (i === 0) expect(el).to.contain('c') && expect(el.children()[1]).to.have.css('border', borderModified)
      if (i === 1) expect(el).to.contain('b') && expect(el.children()[1]).to.have.css('border', borderChanging)
      if (i === 2) expect(el).to.contain('a') && expect(el.children()[1]).to.have.css('border', borderModified)
    })

    cy.wait(500);

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      expect(el.children()[1]).to.have.css('border', borderModified)
      if (i === 0) expect(el).to.contain('c')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('a')
    })
  });

  it('check reverse string even letters number', function () {
    cy.get('@input').type('abcd');
    cy.get('@button').click();
    cy.get(Cypress.env("circle")).as('circle');

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      expect(el.children()[1]).to.have.css('border', borderDefault)
      if (i === 0) expect(el).to.contain('a')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('c')
      if (i === 3) expect(el).to.contain('d')
    });

    cy.wait(500);

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).to.contain('a') && expect(el.children()[1]).to.have.css('border', borderChanging)
      if (i === 1) expect(el).to.contain('b') && expect(el.children()[1]).to.have.css('border', borderDefault)
      if (i === 2) expect(el).to.contain('c') && expect(el.children()[1]).to.have.css('border', borderDefault)
      if (i === 3) expect(el).to.contain('d') && expect(el.children()[1]).to.have.css('border', borderChanging)
    });

    cy.wait(500);

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).to.contain('d') && expect(el.children()[1]).to.have.css('border', borderModified)
      if (i === 1) expect(el).to.contain('b') && expect(el.children()[1]).to.have.css('border', borderChanging)
      if (i === 2) expect(el).to.contain('c') && expect(el.children()[1]).to.have.css('border', borderChanging)
      if (i === 3) expect(el).to.contain('a') && expect(el.children()[1]).to.have.css('border', borderModified)
    });

    cy.wait(500);

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      expect(el.children()[1]).to.have.css('border', borderModified)
      if (i === 0) expect(el).to.contain('d')
      if (i === 1) expect(el).to.contain('c')
      if (i === 2) expect(el).to.contain('b')
      if (i === 3) expect(el).to.contain('a')
    });

  })

})
/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = '4px solid rgb(0, 50, 255)';
const borderChanging = '4px solid rgb(210, 82, 225)';
const borderModified = '4px solid rgb(127, 224, 81)';

describe('String page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('empty input', function () {
    cy.get("[class^='input_input']").clear()
    cy.get('#reverse').should('be.disabled')
  })

  it('check reverse string one letter', function () {
    cy.get("[class^='input_input']").type('a')
    cy.get('#reverse').as('button')
    cy.get('@button').click()
    cy.get('[class*=circle_circle]').as('circle')
    cy.get('@circle').should('have.length', 1).each((el) => {
      expect(el).to.have.css('border', borderDefault)
      expect(el).to.contain('a')
    })
    cy.wait(500)
    cy.get('@circle').should('have.css', 'border', borderChanging)
    cy.wait(500)
    cy.get('@circle').should('have.css', 'border', borderModified)
  })

  it('check reverse string uneven letters number', function () {
    cy.get("[class^='input_input']").type('abc')
    cy.get('#reverse').as('button')
    cy.get('@button').click()
    cy.get('[class*=circle_circle]').as('circle')
    cy.get('@circle').should('have.length', 3).each((el, i) => {
      expect(el).to.have.css('border', borderDefault)
      if (i === 0) expect(el).to.contain('a')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('c')
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      if (i === 0) expect(el).to.contain('a') && expect(el).to.have.css('border', borderChanging)
      if (i === 1) expect(el).to.contain('b') && expect(el).to.have.css('border', borderDefault)
      if (i === 2) expect(el).to.contain('c') && expect(el).to.have.css('border', borderChanging)
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      if (i === 0) expect(el).to.contain('c') && expect(el).to.have.css('border', borderModified)
      if (i === 1) expect(el).to.contain('b') && expect(el).to.have.css('border', borderChanging)
      if (i === 2) expect(el).to.contain('a') && expect(el).to.have.css('border', borderModified)
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 3).each((el, i) => {
      expect(el).to.have.css('border', borderModified)
      if (i === 0) expect(el).to.contain('c')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('a')
    })
  })

  it('check reverse string even letters number', function () {
    cy.get("[class^='input_input']").type('abcd')
    cy.get('#reverse').as('button')
    cy.get('@button').click()
    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      expect(el).to.have.css('border', borderDefault)
      if (i === 0) expect(el).to.contain('a')
      if (i === 1) expect(el).to.contain('b')
      if (i === 2) expect(el).to.contain('c')
      if (i === 3) expect(el).to.contain('d')
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).to.contain('a') && expect(el).to.have.css('border', borderChanging)
      if (i === 1) expect(el).to.contain('b') && expect(el).to.have.css('border', borderDefault)
      if (i === 2) expect(el).to.contain('c') && expect(el).to.have.css('border', borderDefault)
      if (i === 3) expect(el).to.contain('d') && expect(el).to.have.css('border', borderChanging)
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).to.contain('d') && expect(el).to.have.css('border', borderModified)
      if (i === 1) expect(el).to.contain('b') && expect(el).to.have.css('border', borderChanging)
      if (i === 2) expect(el).to.contain('c') && expect(el).to.have.css('border', borderChanging)
      if (i === 3) expect(el).to.contain('a') && expect(el).to.have.css('border', borderModified)
    })

    cy.wait(500)

    cy.get('@circle').should('have.length', 4).each((el, i) => {
      expect(el).to.have.css('border', borderModified)
      if (i === 0) expect(el).to.contain('d')
      if (i === 1) expect(el).to.contain('c')
      if (i === 2) expect(el).to.contain('b')
      if (i === 3) expect(el).to.contain('a')
    })

  })

})
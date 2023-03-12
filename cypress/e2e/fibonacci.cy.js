/* eslint-disable cypress/no-unnecessary-waiting */
describe('Fibonacci page test', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
  })

  it('empty input', function () {
    cy.get("[class^='input_input']").clear()
    cy.get('#calculate').should('be.disabled')
  })

  it('check fibonacci sequence', function () {

    cy.get("[class^='input_input']").type(5)
    cy.get('#calculate').as('button')
    cy.get('@button').click()
    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 1).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
    })
    cy.wait(500)
    cy.get('@circle').should('have.length', 2).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
      if (i === 1) expect(el).to.contain('1')
    })
    cy.wait(500)
    cy.get('@circle').should('have.length', 3).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
      if (i === 1) expect(el).to.contain('1')
      if (i === 2) expect(el).to.contain('2')
    })
    cy.wait(500)
    cy.get('@circle').should('have.length', 4).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
      if (i === 1) expect(el).to.contain('1')
      if (i === 2) expect(el).to.contain('2')
      if (i === 3) expect(el).to.contain('3')
    })
    cy.wait(500)
    cy.get('@circle').should('have.length', 5).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
      if (i === 1) expect(el).to.contain('1')
      if (i === 2) expect(el).to.contain('2')
      if (i === 3) expect(el).to.contain('3')
      if (i === 4) expect(el).to.contain('5')
    })
    cy.get('@circle').should('have.length', 6).each((el, i) => {
      if (i === 0) expect(el).to.contain('1')
      if (i === 1) expect(el).to.contain('1')
      if (i === 2) expect(el).to.contain('2')
      if (i === 3) expect(el).to.contain('3')
      if (i === 4) expect(el).to.contain('5')
      if (i === 5) expect(el).to.contain('8')
    })

  })

})
/* eslint-disable cypress/no-unnecessary-waiting */
const borderDefault = '4px solid rgb(0, 50, 255)';
const borderChanging = '4px solid rgb(210, 82, 225)';


describe('Stack page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack')
  })

  it('empty input', function () {
    cy.get("[class^='input_input']").clear()
    cy.get('#add').should('be.disabled')
  })

  it('add elements', function () {
    cy.get("[class^='input_input']").type('abc')
    cy.get('#add').as('buttonAdd')
    cy.get('@buttonAdd').click()
    cy.get('[class*=circle_content]').as('circle')
    cy.get('@circle').should('have.length', 1).each(el => {
      expect(el).to.contain('abc')
      expect(el).to.contain('top')
      expect(el.children()[1]).to.have.css('border', borderChanging)
    })

    cy.wait(500)
    cy.get('@circle').should('have.length', 1).each(el => {
      expect(el.children()[1]).to.have.css('border', borderDefault)
    })

    cy.get("[class^='input_input']").type('123')
    cy.get('@buttonAdd').click()

    cy.get('@circle').should('have.length', 2).each((el, i) => {
      if (i === 0) expect(el).to.contain('abc') && expect(el.children()[1]).to.have.css('border', borderDefault)
        && expect(el).to.not.contain('top')
        && expect(el).to.not.contain('top')
      if (i === 1) {
        expect(el).to.contain('123') && expect(el.children()[1]).to.have.css('border', borderChanging)
          && expect(el).to.contain('top')
      }
    })

    cy.wait(500)
    cy.get('@circle').should('have.length', 2).each((el, i) => {
      if (i === 0) expect(el).to.contain('abc') && expect(el.children()[1]).to.have.css('border', borderDefault)
        && expect(el).to.not.contain('top')
      if (i === 1) {
        expect(el).to.contain('123') && expect(el.children()[1]).to.have.css('border', borderDefault)
          && expect(el).to.contain('top')
      }
    })

  })

  it('delete elements', function () {
    cy.get("[class^='input_input']").type('abc')
    cy.get('#add').as('buttonAdd')
    cy.get('@buttonAdd').click()
    cy.get("[class^='input_input']").type('123')
    cy.get('@buttonAdd').click()
    cy.get('#delete').as('buttonDelete')
    cy.get('[class*=circle_content]').as('circle')

    cy.get('@buttonDelete').click()
    cy.get('@circle').should('have.length', 2).each((el, i) => {
      if (i === 0) expect(el).to.contain('abc') && expect(el.children()[1]).to.have.css('border', borderDefault)
        && expect(el).to.not.contain('top')
      if (i === 1) {
        expect(el).to.contain('123') && expect(el.children()[1]).to.have.css('border', borderChanging)
          && expect(el).to.contain('top')
      }
    })

    cy.wait(500)
    cy.get('@circle').should('have.length', 1).each((el, i) => {
      if (i === 0) expect(el).to.contain('abc') && expect(el.children()[1]).to.have.css('border', borderDefault)
        && expect(el).to.contain('top')
    })

  })

  it('clear stack', function() {
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
    cy.get('@circle').should('have.length', 0)

  })


})
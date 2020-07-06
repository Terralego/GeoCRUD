describe('Detail ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Redirects to detail', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'locales/fr/translation.json'
    }).as('translation')
    cy.visit('CRUD/map/cities')
    cy.wait('@translation').its('status').should('eq', 200)
    cy.wait(3000)
    cy.get('.CRUD-map')
      .click(110, 10)
    //cy.get('a.table-header__create').click()
    cy.get('h2.details__title').should('contain', 'Toulouse')
  })
})

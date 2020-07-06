describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Redirects to other list.', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.get('a.CRUD-nav__link').contains("Treks").click()
    cy.url().should('include', '/CRUD/map/treks')
    cy.get('.bp3-table-truncated-text').should('contain', 'Via Tolosa')
  })
  it('Redirects to add. Left pannel', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.get('a[href="/CRUD/map/cities/create"][tabindex="0"]').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Add cities')
  })
  it('Redirects to add. Bottom pannel', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('a.table-header__create').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Add cities')
  })
})
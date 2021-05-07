describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Redirects to other list.', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('CRUD/map/cities')
    cy.wait('@tiles.all')
    cy.get('a.CRUD-nav__link').contains("Treks").click()
    cy.url().should('include', '/CRUD/map/treks')
    cy.get('.bp3-table-truncated-text', {timeout:8000}).should('contain', 'Via Tolosa')
  })
  it('Redirects to add. Left pannel', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('CRUD/map/cities')
    cy.wait('@tiles')
    cy.get('a[href="/CRUD/map/cities/create"][tabindex="0"]').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('h2.details__title', {timeout:8000}).should('contain', 'Add city')
  })
  it('Redirects to add. Bottom pannel', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('CRUD/map/cities')
    cy.wait('@tiles')
    cy.get('a.table-header__create').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('h2.details__title', {timeout:8000}).should('contain', 'Add city')
  })
})
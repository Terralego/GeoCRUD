describe('Show/Unshow List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Show Unclassified', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')
    cy.visit('CRUD/map/cities')
    cy.wait('@tiles.all')
    cy.get('div.bp3-collapse').should('not.contain', 'Points')
    cy.get('.bp3-button-text').next('.bp3-icon-chevron-down').click()
    cy.get('div.bp3-collapse').should('contain', 'Points')
    cy.get('.bp3-button-text').contains('Unclassified').next('.bp3-icon-chevron-up').click()
    cy.get('div.bp3-collapse').should('not.contain', 'Points')
  })
//
//  it('Unshow list', () => {
//    cy.server()
//    cy.route({
//      method: 'GET',      // Route all GET requests
//      url: 'api/crud/layers/3/tilejson/**'
//    }).as('tiles')
//    cy.visit('CRUD/map/cities')
//    cy.wait('@tiles.all')
//    cy.get('button.bp3-intent-primary').get('[icon="arrows-vertical"]').click()
//    cy.get('.bp3-button-text').contains("Toulouse").should('be.visible')
//    cy.get('.CRUD-map').should('be.visible')
//    cy.get('[icon="minus"]').click()
//    cy.get('.bp3-button-text').contains("Toulouse").should('not.be.visible')
//    cy.get('.CRUD-map').should('be.visible')
//  })
//  it('Enlarge/Unlarge list', () => {
//    cy.server()
//    cy.route({
//      method: 'GET',      // Route all GET requests
//      url: 'api/crud/layers/3/tilejson/**'
//    }).as('tiles')
//    cy.visit('CRUD/map/cities')
//    cy.wait('@tiles.all')
//    cy.get('button.bp3-intent-primary').get('[icon="arrows-vertical"]').click()
//    cy.get('.bp3-button-text').contains("Toulouse").should('be.visible')
//    cy.get('.CRUD-map').should('be.visible')
//    cy.get('.bp3-icon-maximize').click()
//    cy.get('.bp3-button-text').contains("Toulouse").should('be.visible')
//    cy.get('.CRUD-map').should('not.be.visible')
//    cy.get('button.bp3-intent-primary').get('[icon="arrows-vertical"]').click()
//    cy.get('span.bp3-icon-minimize').click()
//    cy.get('.CRUD-map').should('be.visible')
//    cy.get('.bp3-button-text').contains("Toulouse").should('be.visible')
//  })
})
describe('Other List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Picture', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('button.mapboxgl-ctrl-icon[aria-label="Capture"]').click()
  })
  it('Close/Open menu',() => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('CRUD/map/cities')
    cy.wait('@tiles')
    cy.get('.CRUD-nav__list').should('contain', 'Cities')
    cy.get('[icon="menu-closed"]').click()
    cy.get('.CRUD-nav__list').should('not.contain', 'Cities')
    cy.get('[icon="menu-open"]').click()
    cy.get('.CRUD-nav__list').should('contain', 'Cities')
  })
  // Should be visible mapbox /Open Street map
  //it('Change layers mapbox/open street map show name under map',() => {
  //  cy.server()
  //  cy.route({
  //    method: 'GET',      // Route all GET requests
  //    url: 'api/crud/layers/3/tilejson/**'
  //  }).as('tiles')

  //  cy.visit('CRUD/map/cities')
  //  cy.wait('@tiles')
  //  cy.get('button.mapboxgl-ctrl-icon').as('icons')
  //  cy.get('@icons').children('[icon="layers"].bp3-icon.bp3-icon-layers').click()
  //  cy.get('.bp3-popover-content').should('contain', 'OSM')
  //  cy.get('.mapboxgl-ctrl-attrib-inner').should('be.visible', 'OpenStreetMap')
  //  cy.get('input[value="/api/mapbox-baselayer/mapbox-baselayers/3/tilejson/"]').click({force: true})
  //  cy.get('.mapboxgl-ctrl-attrib-inner').should('not.be.visible', 'OpenStreetMap')
  //})
})

describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Api crud settings different menu', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.fixture('crud_settings_only_unclassified.json').as('apiCrudSettings')
    cy.route('GET', 'api/crud/settings', '@apiCrudSettings')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('.CRUD-nav__group').should('not.contain', 'Administration')
    cy.get('.CRUD-nav__group').should('contain', 'Unclassified')
  })
//  it('Api crud settings show different layers', () => {
//    cy.server()
//    cy.route('**/osm-intl/*/*/*.png').as('tilejson')
//    cy.fixture('crud_settings_only_unclassified.json').as('apiCrudSettings')
//    cy.fixture('tilejson.json').as('tilejsonSettings')
//    cy.route('GET', 'api/crud/settings', '@apiCrudSettings')
//    cy.route('GET', 'api/mapbox-baselayer/mapbox-baselayers/*/tilejson/', '@tilejsonSettings')
//    cy.visit('CRUD/map/cities')
//    cy.wait('@tilejson.all')
//    cy.wait(100)
//    cy.get('button.mapboxgl-ctrl-icon').as('icons')
//    cy.get('@icons').children('[icon="layers"].bp3-icon.bp3-icon-layers').click()
//    cy.get('.bp3-popover-content').should('contain', 'Foo')
//    cy.get('.mapboxgl-ctrl-attrib-inner').should('be.visible', 'OpenStreetMap')
//  })
})
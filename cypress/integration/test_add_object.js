/*describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Add city', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')
    cy.visit('map/cities/create')
    cy.wait('@tiles')
    cy.get('button.mapbox-gl-draw_polygon').click()
    cy.get('.tf-map')
      .click(100, 100)
      .click(100, 120)
      .click(120, 120)
      .click(120, 100)
      .click(100, 100);
    cy.get('button.CRUD-edit__submit').click()
    cy.get('.details__list-edit-button').first().click({ force: true })
    cy.get('input[label="Name"]').type('CityTest')
    cy.get('button').contains("Save").click()
    cy.get('h2.details__title').should('contain', 'CityTest')
  })
  it('Add same geometry city', () => {
    cy.server()*/
    //cy.route('**/hot/*/*/*.png').as('tilejson')
/*    cy.visit('map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('button.mapbox-gl-draw_polygon').click()
    cy.get('.mapboxgl-canvas')
      .click(100, 100)
      .click(100, 120)
      .click(120, 120)
      .click(120, 100)
      .click(100, 100);
    cy.get('button.CRUD-edit__submit').click()
    cy.get('.details__list-edit-button').first().click({ force: true })
    cy.get('input[label="Name"]').type('CitySamePlaceTest')
    cy.get('button').contains("Sauvegarder").click()
    cy.get('h2.details__title').should('contain', 'CitySamePlaceTest')

  })
})*/
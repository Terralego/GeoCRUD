
describe('Filter ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Filter city', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('input[type="search"][title="Search in table"]').type('other')
    cy.get('div.bp3-table-quadrant-scroll-container').should('not.contain', 'CityTest')
    cy.get('input[type="search"][title="Search in table"]').clear()
    cy.get('input[type="search"][title="Search in table"]').type('CityTest')
    cy.get('div.bp3-table-quadrant-scroll-container').should('contain', 'CityTest')
  })
  it('Check properties filter', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('button.bp3-intent-primary').contains("properties").click({force: true})
    cy.get('input[type="checkbox"][value="name"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="population"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="population_date"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="zip_codes"]').should(($ch) => {
        expect($ch).to.be.checked
    })
  })
  it('Remove properties filter', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('button.bp3-intent-primary').contains("properties").click({force: true})
    cy.get('input[type="checkbox"]').first().click({force: true})
    cy.get('input[type="checkbox"][value="name"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="population"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="population_date"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="zip_codes"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"]').first().click({force: true})
        cy.get('input[type="checkbox"][value="name"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="population"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="population_date"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="zip_codes"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
  })
  it('Default properties filter', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.fixture('crud_settings.json').as('apiCrudSettings')
    cy.route('GET', 'api/crud/settings', '@apiCrudSettings')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.wait(100)
    cy.get('button.bp3-intent-primary').contains("properties").click({force: true})
    cy.get('input[type="checkbox"][value="name"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="population"]').should(($ch) => {
        expect($ch).not.to.be.checked
    })
    cy.get('input[type="checkbox"][value="population_date"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="zip_codes"]').should(($ch) => {
        expect($ch).to.be.checked
    })
    cy.get('input[type="checkbox"][value="description"]').should(($ch) => {
        expect($ch).to.be.checked
    })
  })
})
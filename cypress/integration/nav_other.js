describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Redirects to other list.', () => {
    cy.visit('CRUD/map/cities')
    cy.get('a.CRUD-nav__link').contains("Treks").click()
    cy.url().should('include', '/CRUD/map/treks')
    cy.get('.bp3-table-truncated-text').should('contain', 'Via Tolosa')
  })
  it('Redirects to add. Left pannel', () => {
    cy.visit('CRUD/map/cities')
    cy.get('a[href="/CRUD/map/cities/create"][tabindex="0"]').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Ajouter cities')
  })
  it('Redirects to add. Bottom pannel', () => {
    cy.visit('CRUD/map/cities')
    cy.get('a.table-header__create').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Ajouter cities')
  })
  it('Add city', () => {
    cy.visit('CRUD/map/cities/create')
    cy.wait(3000)
    cy.get('button.mapbox-gl-draw_polygon').click()
    cy.get('.mapboxgl-canvas')
      .click(100, 100)
      .click(100, 120)
      .click(120, 120)
      .click(120, 100)
      .click(100, 100);
    cy.get('button.CRUD-edit__submit').click()
    cy.get('.details__list-edit-button').first().click({ force: true })
    cy.get('input[label="Name"]').type('CityTest')
    cy.get('button').contains("Sauvegarder").click()
    cy.get('h2.details__title').should('contain', 'CityTest')
  })
  it('Filter city', () => {
    cy.visit('CRUD/map/cities')
    cy.get('input[type="search"][title="Rechercher dans la table"]').type('other')
    cy.get('div.bp3-table-quadrant-scroll-container').should('not.contain', 'CityTest')
    cy.wait(1000)
    cy.get('input[type="search"][title="Rechercher dans la table"]').clear()
    cy.get('input[type="search"][title="Rechercher dans la table"]').type('CityTest')
    cy.get('div.bp3-table-quadrant-scroll-container').should('contain', 'CityTest')
  })
  it('Check properties filter', () => {
    cy.visit('CRUD/map/cities')
    cy.wait(3000)
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
    cy.visit('CRUD/map/cities')
    cy.wait(3000)
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
})

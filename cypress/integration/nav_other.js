describe('List ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Redirects to other list.', () => {
    cy.visit('http://127.0.0.1:3000/CRUD/map/cities')
    cy.get('a.CRUD-nav__link').contains("Treks").click()
    cy.url().should('include', '/CRUD/map/treks')
    cy.get('.bp3-table-truncated-text').should('contain', 'Via Tolosa')
  })
  it('Redirects to add. Left pannel', () => {
    cy.visit('http://127.0.0.1:3000/CRUD/map/cities')
    cy.get('a[href="/CRUD/map/cities/create"][tabindex="0"]').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Ajouter cities')
  })
  it('Redirects to add. Bottom pannel', () => {
    cy.visit('http://127.0.0.1:3000/CRUD/map/cities')
    cy.get('a.table-header__create').click()
    cy.url().should('include', '/CRUD/map/cities/create')
    cy.get('span.bp3-button-text').should('contain', 'Ajouter cities')
  })
  it('Add city', () => {
    cy.visit('http://127.0.0.1:3000/CRUD/map/cities/create')
    cy.wait(3000)
    cy.get('button.mapbox-gl-draw_polygon').click()
    cy.get('.mapboxgl-canvas')
      .click(100, 100)
      .click(100, 120)
      .click(120, 120)
      .click(120, 100)
      .click(100, 100);
    cy.get('button.CRUD-edit__submit').click()
  })

})
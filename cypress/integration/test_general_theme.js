describe('Test theme ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Different logo and name',() => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.fixture('settings_1.json').as('apiSettings')
    cy.route('GET', 'api/settings', '@apiSettings')
    cy.visit('map/cities')
    cy.wait('@tilejson.all')
    cy.fixture('accessibility-troller.png').then((logo) => {
        cy.get('.main-header__logo').should('have.attr', 'src').should('include', logo)
    })
    cy.get('.main').should('contain', 'Test')
    cy.get('.bp3-button-text').contains('Modules').click()
    cy.get('.bp3-menu-item').should('contain', 'Users')
    cy.get('.bp3-menu-item').should('contain', 'Geographic editor')
  })
  it('Landing module CRUD',() => {
    cy.visit('')
    cy.url().should('include', 'CRUD')
  })

  //it('Landing module User',() => {
  //  cy.server()
  //  cy.fixture('settings_2.json').as('apiSettings')
  //  cy.route('GET', 'api/settings', '@apiSettings')
  //  cy.visit('')
  //  cy.url().should('not.include', 'CRUD')
  //  cy.url().should('include', 'user')
  //  cy.get('.bp3-button-text').contains('Modules').click()
  //  cy.get('.bp3-menu-item').should('contain', 'Users')
  //  cy.get('.bp3-menu-item').should('contain', 'Geographic editor')
  //})
  //TODO : TEST terra account !! it('Without CRUD',() => {
  //  cy.server()
  //  cy.fixture('settings_3.json').as('apiSettings')
  //  cy.route('GET', 'api/settings', '@apiSettings')
  //  cy.visit('')
  //  cy.url().should('not.include', 'CRUD')
  //  cy.get('.bp3-button-text').contains('Modules').click()
  //  cy.get('.bp3-menu-item').should('contain', 'Users')
  //  cy.get('.bp3-menu-item').should('not.contain', 'Geographic editor')
  // })
  it('Other title',() => {
    cy.server()
    cy.fixture('settings_1.json').as('apiSettings')
    cy.route('GET', 'api/settings', '@apiSettings')
    cy.visit('')
    cy.get('title').should('contain', 'I am a title')
  })
  it('Other title',() => {
    cy.server()
    cy.fixture('settings_1.json').as('apiSettings')
    cy.route('GET', 'api/settings', '@apiSettings')
    cy.visit('')
    cy.get('title').should('contain', 'I am a title')
  })
})
describe('Tests top menu ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Change menu',() => {
    cy.visit('CRUD/map/cities')
    cy.wait(3000)
    cy.get('.bp3-button-text').contains('Modules').click()
    cy.get('.bp3-menu-item').contains('Users').click()
    cy.get('a[href="/user"]').click({force: true})
    cy.url().should('include', 'user')
  })
})
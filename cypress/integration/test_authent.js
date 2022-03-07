describe('Login from home page', () => {
  it('Redirects to login page.', () => {
    cy.visit('')
    cy.get('form')
    cy.contains("Email")
    cy.get('input[type="email"]')
    cy.get('input[type="password"]')
    })

  it('Fail to login', () => {
    cy.visit('')
    cy.get('input[type="email"]')
      .type('fake@fake.fake')
      .should('have.value', 'fake@fake.fake')
    cy.get('input[type="password"]')
      .type('password')
      .should('have.value', 'password')
    cy.get("button[type='submit']").click()
    cy.get('[icon="error"]')
  })

  it('Login', () => {
    cy.visit('')
    cy.get('[type="email"]')
      .type('admin@admin.admin')
      .should('have.value', 'admin@admin.admin')
    cy.get('[type="password"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get("button[type='submit']").click()
    cy.url().should('include', '/map/cities')
    cy.get("span.bp3-button-text").contains("admin@admin.admin")
    localStorage.getItem('tf:auth:token')
  })
})

describe('Logout', () => {
    beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Logout', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('map/cities')
    cy.wait('@tiles')
    cy.get("span.bp3-button-text").contains("admin@admin.admin").click()
    cy.get("a.bp3-popover-dismiss").contains("Log out").click()
    cy.wait(3000)
    cy.contains("Email")
  })
})

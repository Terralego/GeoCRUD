describe('Logout', () => {
    beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Logout', () => {
    cy.visit('http://127.0.0.1:3000/CRUD/map/cities')
    cy.get("span.bp3-button-text").contains("admin@admin.admin").click()
    cy.get("a.bp3-popover-dismiss").contains("Se déconnecter").click()
    cy.contains("Email")
  })
})

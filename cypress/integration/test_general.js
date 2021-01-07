describe('No settings', () => {
  it('Settings 500', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'api/settings',
      status: 500,
      response: {}
    })
    cy.visit('')
    cy.get('p').should("contain", "Unable to load settings. Please contact your administrator.")
  })
})

describe('No settings', () => {
  it('Settings 500', () => {
    cy.server()
    cy.fixture('settings_en.json').as('apiSettings')
    cy.route('GET', 'api/settings', '@apiSettings')
    cy.route({
      method: 'GET',
      url: 'api/settings',
      status: 500,
      response: {}
    })
    cy.visit('')
    cy.get('p').should("contain", "Impossible de charger la configuration. Veuillez contacter un administrateur.")
  })
})

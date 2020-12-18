describe('Detail ', () => {
  before(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })


  it('Redirects to detail', () => {
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: 'api/crud/layers/3/tilejson/**'
    }).as('tiles')

    cy.visit('CRUD/map/cities')
    cy.wait('@tiles')
    cy.get('.tf-map')
      .then(elements => Promise.resolve(elements[0].mapboxInstance))
      .as('map');
    cy.get('@map', {timeout: 20000}).should(map => expect(map.areTilesLoaded()).to.be.true)
    .then((map) => {
        map.jumpTo({
            center: [1.3887, 43.5601],
            zoom: 12
          })
        map.fire('click', { latLng: {lng: 1.3887, lat: 43.5601}, point: map.project({lng: 1.3887, lat: 43.5601}), originalEvent: {} })
    })
    cy.get('h2.details__title', {timeout:10000}).should('contain', 'Toulouse')
  })
})

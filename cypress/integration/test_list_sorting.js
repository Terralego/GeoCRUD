describe('Sorting ', () => {
  beforeEach(() => {
      const email = 'admin@admin.admin'
      const password = 'admin'
      cy.login(email, password)
  })
  it('Sort Name', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.get('.bp3-table-column-name[title="Name"]').contains('Name').rightclick({force: true})
    cy.get('[icon="sort-alphabetical"]').click()
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('CityTest')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('NaN')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('')
    })
    cy.get('.bp3-table-column-name[title="Name"]').contains('Name').rightclick({force: true})
    cy.get('[icon="sort-alphabetical-desc"]').click()
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('Toulouse')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('453000')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('31000,31100,31200,31300,31300,31500')
    })
  })
  it('Sort Population', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.get('.bp3-table-column-name[title="Population"]').contains('Population').rightclick({force: true})
    cy.get('[icon="sort-alphabetical"]').click()

    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('Toulouse')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('453000')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('31000,31100,31200,31300,31300,31500')
    })
    cy.get('.bp3-table-column-name[title="Population"]').contains('Population').rightclick({force: true})
    cy.get('[icon="sort-alphabetical-desc"]').click()
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('CityTest')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('NaN')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('')
    })
  })
  it('Sort Zip', () => {
    cy.server()
    cy.route('**/hot/*/*/*.png').as('tilejson')
    cy.visit('CRUD/map/cities')
    cy.wait('@tilejson.all')
    cy.get('.bp3-table-column-name[title="ZIP codes"]').contains('ZIP codes').rightclick({force: true})
    cy.get('[icon="sort-alphabetical"]').click()

    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('Toulouse')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('453000')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('31000,31100,31200,31300,31300,31500')
    })
    cy.get('.bp3-table-column-name[title="ZIP codes"]').contains('ZIP codes').rightclick({force: true})
    cy.get('[icon="sort-alphabetical-desc"]').click()
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-0').should(($p) => {
        expect($p).to.have.length(3)
        expect($p.first()).to.contain('CityTest')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-1').should(($p) => {
        expect($p.first()).to.contain('NaN')
    })
    cy.get('.bp3-table-quadrant-body-container').get('.bp3-table-cell.bp3-table-cell-col-2').should(($p) => {
        expect($p.first()).to.contain('')
    })
  })
})
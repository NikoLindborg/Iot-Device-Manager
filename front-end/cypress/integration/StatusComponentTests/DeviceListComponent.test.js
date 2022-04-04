describe('DeviceListComponent ', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.get('.device-list-container')
    cy.get('.device-list-left')
    cy.get('.device-list-textcontainer').get('h2').contains('Raspberry Pi')
  })
})

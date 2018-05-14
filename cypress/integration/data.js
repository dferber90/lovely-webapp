describe('data', () => {
  it('should show data', () => {
    cy.visit('/data');
    cy.contains('Personal website');
  });
});

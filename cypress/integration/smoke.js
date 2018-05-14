describe('server-side renering', () => {
  it('can load the main page', () => {
    cy.visit('/');
    cy.title().should('eq', 'Lovely Webapp');
  });
  it('can load the tour page', () => {
    cy.visit('/tour');
    cy.title().should('eq', 'Tour of Lovely Webapp');
  });
  it('can load the comparison page', () => {
    cy.visit('/comparison');
    cy.title().should('eq', 'Comparison of Lovely Webapp');
  });
});

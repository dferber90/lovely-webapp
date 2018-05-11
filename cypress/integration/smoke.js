describe('server-side renering', () => {
  it('can load the main page', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('eq', 'Lovely Webapp');
  });
  it('can load the tour page', () => {
    cy.visit('http://localhost:3000/tour');
    cy.title().should('eq', 'Tour of Lovely Webapp');
  });
  it('can load the comparison page', () => {
    cy.visit('http://localhost:3000/comparison');
    cy.title().should('eq', 'Comparison of Lovely Webapp');
  });
});

describe('client-side rendering', () => {
  it('can load the main page', () => {
    cy.visit('http://localhost:8080');
    cy.title().should('eq', 'Lovely Webapp');
  });
  it('can load the tour page', () => {
    cy.visit('http://localhost:8080/tour');
    cy.title().should('eq', 'Tour of Lovely Webapp');
  });
  it('can load the comparison page', () => {
    cy.visit('http://localhost:8080/comparison');
    cy.title().should('eq', 'Comparison of Lovely Webapp');
  });
});

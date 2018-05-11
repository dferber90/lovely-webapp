describe('data', () => {
  it('should show data', () => {
    cy.visitStubbedGraphQl('http://localhost:8080/data', {
      feedQuery: {
        data: {
          feed: [
            {
              id: 'cjf04bt345cy00925746p0jbf',
              description: 'Personal website',
              __typename: 'Link',
            },
          ],
        },
      },
    });
    cy.contains('Personal website');
  });
});

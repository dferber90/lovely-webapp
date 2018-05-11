describe('client-side rendering', () => {
  describe('with invalid email', () => {
    describe('when submitting by clicking button', () => {
      it('should fail signup with invalid email address', () => {
        cy.visit('http://localhost:8080/tour');
        cy
          .get('input[name=subscribeEmail]')
          .type('Hello, World')
          .should('have.value', 'Hello, World');
        cy.get('button[data-cypress-id="newsletter-subscribe-btn"]').click();
        cy.contains('Invalid email address');
      });
    });
    describe('when submitting by pressing enter', () => {
      it('should fail signup with invalid email address', () => {
        cy.visit('http://localhost:8080/tour');
        cy
          .get('input[name=subscribeEmail]')
          .type('Hello, World{enter}')
          .should('have.value', 'Hello, World');
        cy.contains('Invalid email address');
      });
    });
  });
  describe('with valid email', () => {
    describe('when submitting by pressing enter', () => {
      it('should register', () => {
        cy.visitStubbedGraphQl('http://localhost:8080/tour', {
          SubscribeMutation: (query, variables) => ({
            data: {
              subscribe: {
                email: variables.email,
                __typename: 'NewsletterSubscriber',
              },
            },
          }),
        });
        const email = `foo@hello.com`;
        cy
          .get('input[name=subscribeEmail]')
          .type(`${email}`)
          .should('have.value', email);
        cy.get('input[name=subscribeEmail]').type('{enter}');
        cy.contains("You've been subscribed");
      });
    });
  });
});

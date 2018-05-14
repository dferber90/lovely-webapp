describe('client-side rendering', () => {
  describe('with invalid email', () => {
    describe('when submitting by clicking button', () => {
      it('should fail signup with invalid email address', () => {
        cy.visit('/tour');
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
        cy.visit('/tour');
        cy
          .get('input[name=subscribeEmail]')
          .type('Hello, World{enter}')
          .should('have.value', 'Hello, World');
        cy.contains('Invalid email address');
      });
    });
  });
  describe('with valid email and stubbed response', () => {
    describe('when submitting by pressing enter', () => {
      it('should register', () => {
        cy.visitStubbedGraphQl('/tour', {
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
  describe('with valid email as full E2E test', () => {
    describe('when submitting by pressing enter', () => {
      it('should register', () => {
        cy.visit('/tour', {
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

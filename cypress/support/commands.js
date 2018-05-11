// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/*
 * Create a command named `visitStubbedGraphQl` that wraps the normal `cy.visit`. It
 * takes the url as the first parameter and * an object with your graphql
 * request stubs. Each key of the object must match the `operationName` of the
 * graphql request to be stubbed and each value is an object containing the
 * stubbed graphql response.
 *
 * Inspired by https://github.com/cypress-io/cypress-documentation/issues/122
 *
 * Ex.
 * ```
 * cy.visitStubbedGraphQl('/home', {
 *   fetchWidgets: {
 *     data: {
 *       widgets: [{
 *         id: 1,
 *         name: 'Cool Widget',
 *         __typename: 'Widget',
 *         //...
 *       }]
 *    }
 *  }
 * })
 * ```
 */

const responseStub = result => ({
  // json() {
  //   return Promise.resolve(result);
  // },
  text() {
    return Promise.resolve(JSON.stringify(result));
  },
  ok: true,
});

Cypress.Commands.add('visitStubbedGraphQl', (url, operations = {}) => {
  cy.visit(url, {
    onBeforeLoad: win => {
      const originalFetch = win.fetch;
      // eslint-disable-next-line no-param-reassign
      win.fetch = (localUrl, req, ...args) => {
        if (localUrl !== 'http://localhost:4000')
          return originalFetch(localUrl, req, ...args);

        // parse the request
        const { operationName, query, variables } = JSON.parse(req.body);

        // return the stub if it was provided
        const resultStub = operations[operationName];
        if (resultStub) {
          // stubs can either be static (plain data) or dynamic (function returning data)
          const result =
            typeof resultStub === 'function'
              ? resultStub(query, variables)
              : resultStub;
          return Promise.resolve(responseStub(result));
        }

        // when there is no stub, we make the actual request instead
        return originalFetch(localUrl, req, ...args);
      };
    },
  });
});

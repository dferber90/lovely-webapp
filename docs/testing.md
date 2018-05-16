# Testing

## E2E Tests

The E2E tests always run against the production build. The tests can be changed and the changes will be visible immediately. It gets cumbersome when the app itself needs to be changed while working on the E2E tests. For this, the app needs to be rebuilt which isn't ideal so far. There is room for improvement here though.

Most of the time, only the tests should need changing and already works well. So hopefully the rebuild-step isn't as much of a burden.

### During development

The E2E tests use a Prisma cluster locally. It needs to be started with `docker-compose up -d` from `database/e2e`.

The application must be running in production mode and the database needs to be reset and seeded. You could do these steps manually, but it's easier to automate them.

Simply run `yarn e2e:dev`.

Manually, you'd need to build the app first with `yarn build`. Then you'd need to run it in e2e mode with `yarn start:build:e2e`. Finally, you could start cypress with `yarn cypress open`.

### Test run

The CI will execute `yarn e2e` which will take the production build, copy it to `dist-e2e`, start the database docker cluster locally, start the frontend and api servers, and then run the cypress tests against them.

# TODO

## Features

* auth
* mail
* file uploads
* checker for new release (check git version of server every x secs)

## Site

* add Google Analytics
* add ScrollToTop component

## React

* Preload data before navigation with Suspense
* Redbox

## Developer Experience

* lint staged files

## Webpack

* long-term caching
* optimize images
* fix sourcemaps
* figure out how to configure babel-preset-env, so that we can remove babel-polyfill from entry ponit for servers, while still keeping async/await working (e.g. render a component on server which has async-await syntax)

## Apollo

* add error handling to GraphQL Apollo Links
* LATER: use persisted queries (https://github.com/apollographql/apollo-link-persisted-queries) (not yet supported by GraphCool)

## Server-Side Rendering

* enable turning SSR on/off based on load
* serialize-javascript package?

## GraphCool

* add permissions / restricted views
* add subscriptions (https://www.howtographql.com/graphql-js/6-subscriptions/)

## CI / CD

* setup CircleCI
* add E2E

## Debt

* In order to not bundle all `node_modules` into the server we had to list them as externals. And we had to emit a `package.json` file from the build process into `dist-production` so that whoever uses the output can install the dependencies.
  * We copy the yarn file as well so that the dependency versions are locked
  * All packages need to have `dependencies` of the same versions. We ensure this through the script generating the `package.json` file.
  * Once `now` supports workspaces we can copy the workspaces declaration from the main `package.json` file and copy each workspace-package's `package.json` file. We can then remove the workaround we have for now.
* Use `yarn workspaces run` command instead of concurrently to run tests

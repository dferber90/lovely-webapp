# TODO

## Features

## Webpack

* long-term caching
* add gzip and serve with koa

## Apollo

* add error handling to GraphQL Apollo Links
* LATER: use persisted queries (https://github.com/apollographql/apollo-link-persisted-queries) (not yet supported by GraphCool)

## Server-Side Rendering

* enable turning SSR on/off based on load
* add images support
* turn off 404 fallbak for static assets (either by putting public assets in a separate folder for which we disable SSR or by checking extension on URL)

## GraphCool

* add permissions / restricted views

## Dev Exp

* add Jest
* add Enzyme

## CI / CD

* setup CircleCI
* add E2E

## Debt

* make bundles small enough so that source-maps don't exceed 1MB
  * remove source-map deletion from deploy-script
* In order to not bundle all `node_modules` into the server we had to list them as externals. And we had to create emit a `package.json` file from the build process into `dist-production` so that whoever uses the output can install the dependencies.
  * We copy the yarn file as well so that the dependency versions are locked
  * All packages need to have `dependencies` of the same versions. We ensure this through the script generating the `package.json` file.
  * Once `now` supports workspaces we can copy the workspaces declaration from the main `package.json` file and copy each workspace-package's `package.json` file. We can then remove the workaround we have for now.

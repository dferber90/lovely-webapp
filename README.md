# lovely-webapp

Playground to experiment with new web technologies.

See it live at: https://wa.now.sh/

## Setup on development machine

> These setup instructions are pretty rough at the moment. Please let me know how I can improve them (and what is missing) by opening an issue.
>
> I strive to make it as easy as possible to get started!

You can clone this project to try it out for yourself. The following sections will walk you through the setup of the project.

### Install dependencies

> This project uses `yarn` instead of `npm`'s CLI. Make sure you have `yarn` available. You can install it following [this guide](https://yarnpkg.com/en/docs/install).

Install the dependencies of this project using `yarn`. Make sure your yarn version is at least 1.0 as this project uses yarn workspaces - a feature earlier versions did not support.

Install dependencies using

```
yarn install
```

### Create `.runtime.*.env` files

Create a file called `.runtime.dev.env` and `.runtime.e2e.env`. These file will contain the configuration specific to your instance of this project.

Create a `.runtime.dev.env` file in the root directory of this project with the following content:

`.runtime.dev.env`:

```
API_ENDPOINT=http://localhost:4000
API_TOKEN_SECRET=foo
PRISMA_ENDPOINT=https://eu1.prisma.sh/<workspace-slug>/<service-name>/<stage>
PRISMA_SECRET=baz
```

`.runtime.e2e.env`:

```
API_ENDPOINT=http://localhost:4000
API_TOKEN_SECRET=foo
PRISMA_ENDPOINT=http://localhost:4466/<service-name>/<stage>
PRISMA_SECRET=baz
```

Don't commit these files to Git, as they contain sensitive data.

The next sections will show what these values are used for and which values they should be filled with.

#### `API_ENDPOINT`

You don't need to change the value of this setting. The value points to the instance of the API server which will be started along with the frontend server when running `yarn start`, which you can do after following this setup. Nothing you need to change for now.

When running in production, this environment variable needs to point to another server which runs the `api` build.

#### `API_TOKEN_SECRET`

You can pick any value for `API_TOKEN_SECRET`. The `API_TOKEN_SECRET` is used to sign the JWT tokens produced by your API (`packages/api`). It should be a long secure string. It should never change, otherwise your users won't be able to log in again without resetting their passwords. It should never be shared. Pick any random string consisting of numbers and letters and assign it as the value in the `.runtime.*.env` files.

#### `PRISMA_SECRET`

Just like with `API_TOKEN_SECRET` you can pick any `PRISMA_SECRET` you desire. It will be used to ensure authentication between your Prisma database layer and your API server.

You'll also use this secret to create tokens which can be used to communicate with the Prisma instance.

This probably sounds very confusing, but it doesn't matter much at the moment.

Pick any random string consisting of numbers and letters and assign it as the value in the `.runtime.dev.env` file, just like before.

#### `PRISMA_ENDPOINT`

> Unfortunately I'm not too sure about this step since I can't simulate an unauthenticated account. You might need to change the configuration in `database/dev/prisma.yml`.
> The most important part is that you end up with an endpoint URL of Prisma. This needs to go into `database/dev/prisma.yml`. Further, it needs to be added to `.runtime.dev.env`.

Next, you'll need to sign up for the free [Prisma](https://www.prisma.io/) service which serves as a database layer. You can do so [here](https://app.prisma.io/dominik-ferber-4ba4fb/services/),

First you need to sign up for a new Prisma account at [https://app.prisma.sh/signup](https://app.prisma.sh/signup).

Next, install the `prisma-cli` with

```
npm install -g prisma
```

Then you should be able to log in to your account locally with

```
prisma login
```

Finally, you need to deploy the database to your Prisma workspace. This will set up a database for you.

Go to `database/dev` and run

```
PRISMA_SECRET=<your secret> prisma deploy
```

Replace `<your secret>` with the secret you stored as `PRISMA_SECRET` in `.runtime.dev.env`.

You should now be provided with a Prisma endpoint URL. Store that in the `.runtime.dev.env` file as the value of `PRISMA_ENDPOINT`.

Defines which stage to use. Those are separate instances of your database, each containing different data of the same schema. You can use one stage for development, one for production and one for End-to-End tests.

For now, the `prisma` commands should always be executed from `packages/api`, as it needs the `packages/api/.graphqlconfig.yml` file for configuration.

And that concludes the one-time setup! You are now ready to run the application locally.

Follow the next section for a detailed guide of how to develop locally.

Some extra setup is necessary to enable Continuous Delivery. It is already fully possible though. In fact, [wa.now.sh](https://wa.now.sh/) is deployed continuously using [TravisCI](http://travisci.org/). See the Continuous Delivery section of this README for more information.

### Start Development

This project uses three different parts:

* **frontend client**: the JavaScript bundle executed by the browser
* **frontend server**: A node server which supports server-side rendering
* **API server**: A node server which handles authentication and server-side logic. It connects to Prisma which serves as the database layer.

You can start all these simultaneously with

```
yarn start
```

You can also start the frontend and the backend individually.

#### Frontend Client

The frontend can be started with the following command:

```
yarn start:client
```

* runs on [localhost:8080](http://localhost:8080)
* does not use server-side rendering
* has hot-loading

#### Frontend Server

In production, the server does server-side rendering and serves the client bundle.
In development, the backend also does server-side rendering. However, it does not include the client-side bundle. That allows to experiment with the backend on its own. This is useful to see the result of server-side rendering without having the client overwrite stuff.

```
yarn start:server
```

* runs on [localhost:3000](http://localhost:3000)
* uses server-side rendering
* restarts automatically on file changes (page reload required)

#### API Server

The application does not use a local API. Instead, it relies on GraphQL to provide a data-backend. It uses GraphCool, but that can be switched to any service.

### Running production builds, locally

Sometimes it's useful to inspect a build locally, without deploying it. This is still possible with this stack. This shouldn't be necessary during feature development.

#### Outputs

This project produces two different bundles:

* **frontend**: This contains the frontend server and the frontend client. The frontend server is already set up to serve the client.
* **api**: This contains the API server.

#### Starting production builds locally

First, generate the frontend- & api-bundle with:

```
yarn build
```

Then run `yarn start:build:dev`. It will concurrently run `yarn start` in `dist-production/frontend` and `dist-production/api`.

You can start the servers manually as well. Make sure that all required environment variables are set. Then run:

```
cd dist-production/api
yarn start
```

In anther terminal

```
cd dist-production/frontend
yarn start
```

_Even though the output bundle has a `package.json` with dependencies, it's not necessary to install them when running locally, node can resolve the dependencies from the project folder (which is the parent-folder of `dist-production`) already._

## Deployment

This stack can be deployed in any way you like. After the build, you're presented with two folders: `frontend` and `api`. Each containing a build ready to served with any hosting solution.

Upload the folders, install the packages and serve the applications.

### `now.sh`

One way to deploy this application is using [now.sh](https://zeit.co/now).

First, install [now.sh](https://zeit.co/now) locally.

Then run `yarn build` to generate a build to `dist-production`.

Afterwards, go into each directory and run `now -E ../../.runtime.prod.env deploy --public`.

This requires that you set up a `.runtime.prod.env` in the root of this project which contains the environment variables meant to be used in production.

It should look something like this:

```
NODE_ENV=production
API_TOKEN_SECRET=rpeigdn3iagr84PadfDar
API_ENDPOINT=https://wa-api.now.sh
PRISMA_ENDPOINT=https://eu1.prisma.sh/dominik-ferber-4ba4fb/blogr/dev
PRISMA_SECRET=as1df5F1urhg5lsnfvD
```

### Continuous Delivery

Continuous Integration and Continuous Delivery is fully possible with this stack. You can see the `.travis.yml` file in this repository as a starting point.

This project is deployed continuously using `now.sh` and TravisCI. You need to set up TravsiCI with the same environment variables as in your `.runtime.*.env` files, but you likely need different values.

Additionally, you'll need a `NOW_TOKEN` environment variable set up in TravisCI.

This project uses Cypress for E2E tests. Your CI will need to have a `CYPRESS_RECORD_KEY` environment variable set. You can obtain a key by registering at Cypress. The cypress `projectId` needs to be stored in `cypress.json` at the root of this project.

## Technologies and Tools

### GraphQL

The app uses [Prisma](https://www.prismagraphql.com/docs/quickstart/) by [graph.cool](https://www.graph.cool/) as a database layer. Using GraphQL means that the application won't over-fetch data as with typical REST applications. And far less time will be spent on the backend, as it's very convenient to get the backend set up with Prisma.

> Prisma supports using different stages for development and production. This project doesn't yet make use of this feature. The development database is the same as the production database for now. This should be fairly easy to change though.

### Design System

The app uses a design-system. It lives in `packages/design-system` and is
based on [rebass](http://jxnblk.com/rebass/) which is in turn built with [styled-components](https://github.com/styled-components/styled-components), [styled-system](https://github.com/jxnblk/styled-system) and [grid-styled](https://github.com/jxnblk/grid-styled).

The Design System can be replaced for any other design system. This is merely meant as a starting point of how to split out UI-Components and how to use design-tokens to build the application.

## Environments

There is only one `.env` file for the whole project. It contains the environment variables for every target of the application. However, the specific pieces only access the following environment variables:

### API

* `process.env.API_TOKEN_SECRET`
* `process.env.PRISMA_SECRET`

### Frontend Client

* `process.env.API_ENDPOINT`

### Frontend Server

* `process.env.API_ENDPOINT`

Additional environment variables are provided to each target using its Webpack configuration. You have access to `SERVER` and `DEV` variables.

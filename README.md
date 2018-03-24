# webapp

Playground to experiment with new web technologies.

## Setup on development machine

### Enable yarn workspaces

```
$ yarn config set workspaces-experimental true
```

[Blog post](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

### Create environment file

Create a `.env` file to root directory of this project with the following content:

```
GRAPHQL_ENDPOINT=http://localhost:4000
APP_SECRET=foo
PRISMA_SECRET=bar
```

### Start Development

You can start the frontend and the backend simultaneously with

```
yarn start
```

You can also start the frontend and the backend individually.

#### Client

The frontend can be started with the following command:

```
yarn start:client
```

* runs on [localhost:8080](http://localhost:8080)
* does not use server-side rendering
* has hot-loading

#### Server

In production, the server does server-side rendering and serves the client bundle.
In development, the backend also does server-side rendering. However, it does not include the client-side bundle. That allows to experiment with the backend on its own.

```
yarn start:server
```

* runs on [localhost:3000](http://localhost:3000)
* uses server-side rendering
* restarts automatically on file changes (page reload required)

#### API

The application does not use a local API. Instead, it relies on GraphQL to provide a data-backend. It uses GraphCool, but that can be switched to any service.

### Running in production, locally

First, generate the client- & server-bundle

```
yarn build
```

Then, go to the `dist-production` folder and start the server.

```
cd dist-production
NODE_ENV=production node server.js
```

_Even though the output bundle has a `package.json` with dependencies, it's not necessary to install them when running locally, node can resolve the dependencies from the project folder (which is the parent-folder of `dist-production`) already._

## Deployment

Install [now.sh](https://zeit.co/now) locally.

Then run `yarn build` to generate a build to `dist-production`.
Afterwards, run `yarn deploy` to deploy to any server using `now.sh`.

## Technologies and Tools

### GraphQL

The app uses [graph.cool](https://www.graph.cool/) as a backend.

```
# one-time global installation of graphcool required
npm install -g graphcool

# then go to pacakges/api and open the playground
graphcool playground
```

https://console.graph.cool/wa/playground

### Design System

The app uses a design-system. It lives in `packages/design-system` and is
based on [rebass](http://jxnblk.com/rebass/) which is in turn built with [styled-components](https://github.com/styled-components/styled-components), [styled-system](https://github.com/jxnblk/styled-system) and [grid-styled](https://github.com/jxnblk/grid-styled).

## Environments

### API

* `process.env.APP_SECRET`
* `process.env.PRISMA_SECRET`

### Client

* `process.env.GRAPHQL_ENDPOINT`

### Server

* `process.env.GRAPHQL_ENDPOINT`

#!/bin/bash

# This script expects the Prisma Cluster to be running locally.
# It can be started with "docker-compose up -d" from packages/api/database/e2e

# This could be a .env file
export APP_SECRET=app-secret
export GRAPHQL_ENDPOINT=http://localhost:4000
export PRISMA_ENDPOINT=http://localhost:4466/blogr/e2e
export PRISMA_SECRET=e2e

# start graphql server
# echo "starting prisma server"
# pushd packages/api/database/e2e
# docker-compose up &
# PROCESS_PRISMA=$!
# popd

# reset database
pushd packages/api/database/e2e
yarn prisma deploy
yarn prisma seed -r
popd

# start api and frontend
echo "build"
yarn build

# copying files
echo "copying dist-production to dist-e2e"
rm -rf dist-e2e
cp -r dist-production dist-e2e

# start api
echo "starting api"
pushd dist-e2e/api
yarn start &
PROCESS_API=$!
popd

# start frontend
echo "starting frontend"
pushd dist-e2e/frontend
yarn start &
PROCESS_FRONTEND=$!
popd

yarn cypress:open
PROCESS_CYPRESS=$!

wait $PROCESS_PRISMA $PROCESS_API $PROCESS_FRONTEND $PROCESS_CYPRESS

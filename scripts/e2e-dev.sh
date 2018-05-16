#!/bin/bash

# This script expects the Prisma Cluster to be running locally.
# It can be started with "docker-compose up -d" from database/e2e

export $(cat .runtime.e2e.env | xargs)

# start graphql server
# echo "starting prisma server"
# pushd database/e2e
# docker-compose up &
# PROCESS_PRISMA=$!
# popd

# reset database
# These commands require the PRISMA_SECRET to be present in the env,
# which are provided by .runtime.e2e.env
pushd database/e2e
echo "deploying database"
yarn prisma deploy
echo "seeding and resetting database"
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

echo "opening cypress"
yarn cypress open
PROCESS_CYPRESS=$!

wait $PROCESS_PRISMA $PROCESS_API $PROCESS_FRONTEND $PROCESS_CYPRESS

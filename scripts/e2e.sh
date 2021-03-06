#!/bin/bash

# This script expects a CYPRESS_RECORD_KEY env variable to be present.
# It also expects dist-production to exist

# copy folder
echo "removing dist-e2e"
rm -rf dist-e2e
echo "copying dist-production to dist-e2e"
cp -r dist-production dist-e2e

# start graphql server
echo "starting prisma server"
pushd database/e2e
docker-compose up -d
sleep 20
echo "deploying prisma"
prisma deploy
prisma seed -r
popd

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

# Wait while processes start up
echo "Waiting 20 seconds"
sleep 20

# wait $PROCESS_API $PROCESS_FRONTEND $PROCESS_PRISMA

# Run e2e tests
echo "Running tests"
yarn cypress run --record --key $CYPRESS_RECORD_KEY
TEST_RESULT=$?

echo "Killing processes"
kill $PROCESS_API
kill $PROCESS_FRONTEND

echo "Stopping cluster"
docker-compose down

echo "Removing dist-e2e"
rm -rf dist-e2e

exit $TEST_RESULT

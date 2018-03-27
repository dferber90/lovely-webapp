#!/bin/bash

echo $(pwd)

pushd dist-production/api
yarn run deploy
yarn run alias
popd

pushd dist-production/frontend
yarn run deploy
yarn run alias
popd

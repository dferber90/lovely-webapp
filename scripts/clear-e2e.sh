#!/bin/bash

export $(cat .env | xargs)

pushd packages/api/database/e2e
prisma seed --reset
popd

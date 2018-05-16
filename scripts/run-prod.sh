#!/bin/bash

# check if provided file exists
if [ ! -f $1 ]; then
    echo "env file $1 not found!"
    exit 1
fi

export $(cat $1 | xargs)

yarn concurrently --names "api,frontend" --prefix-colors "cyan,magenta" "pushd dist-production/api; yarn start" "pushd dist-production/frontend; yarn start"

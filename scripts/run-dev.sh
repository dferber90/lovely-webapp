#!/bin/bash

# check if provided file exists
if [ ! -f $1 ]; then
    echo "env file $1 not found!"
    exit 1
fi

export $(cat $1 | xargs)

yarn concurrently --names "client,server,api" --prefix-colors "cyan,magenta,yellow" "yarn start:client" "yarn start:server" "yarn start:api"

#!/bin/bash

yarn concurrently --names "client,server,api" --prefix-colors "cyan,magenta,yellow" "yarn start:client" "yarn start:server" "yarn start:api"

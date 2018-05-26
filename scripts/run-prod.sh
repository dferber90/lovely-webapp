#!/bin/bash

yarn concurrently --names "api,frontend" --prefix-colors "cyan,magenta" "pushd dist-production/api; yarn start" "pushd dist-production/frontend; yarn start"

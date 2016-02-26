#!/bin/bash

set -e

ENV_NAME="bettermint"
if [[ -z $VIRTUAL_ENV ]]; then
    CURR_VIRTUAL_ENV=""
else
    CURR_VIRTUAL_ENV=$(basename $VIRTUAL_ENV)
fi

function isInCorrectEnv {
    if [[ $CURR_VIRTUAL_ENV != $ENV_NAME ]]; then
        echo "Not inside virtul env '$ENV_NAME'."
        exit 1
    fi
}

function InstallDependencies {
    echo "Installing dependencies..."
    isInCorrectEnv
    npm install
    pip install -r requirements.txt
}

function CreateDB {
    echo "Creating db..."
    isInCorrectEnv
    heroku local initdb
}

function CreatePrePushHooks {
    echo "Creating pre-push hooks..."
    isInCorrectEnv
    pre-commit install --hook-type pre-push
}

InstallDependencies
CreateDB
CreatePrePushHooks

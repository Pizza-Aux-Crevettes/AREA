#!/bin/bash

if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "    To lunch web docker use -w or --web
    To lunch app docker use -a or --app"
elif [[ "$1" == "-w" || "$1" == "--web" ]]; then
    docker-compose up backend frontend-web
elif [[ "$1" == "-a" || "$1" == "--app" ]]; then
    docker-compose up backend frontend-app
else
    echo "    To lunch web docker use -w or --web
    To lunch app docker use -a or --app"
fi

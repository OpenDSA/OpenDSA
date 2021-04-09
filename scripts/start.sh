#!/bin/bash

# Checks if the docker.pause file sent from OpenDSA-Devstack exists
if [ -e /opendsa/docker.pause ];
then
    echo "/opendsa/docker.pause file found... waiting until deletion..."
    while [ -e /opendsa/docker.pause ];
    do
        sleep 10
    done
fi

echo "-------------------------------------------------------"
echo "Starting Server"
make Webserver

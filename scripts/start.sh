#!/bin/bash

echo "-------------------------------------------------------"
echo "Updating OpenDSA"
make pull
echo "-------------------------------------------------------"
echo "Instantiating venv"
. /opendsa/.pyVenv/bin/activate
echo "-------------------------------------------------------"
echo "Making books"
make allbooks
echo "-------------------------------------------------------"
echo "Starting Server"
make Webserver

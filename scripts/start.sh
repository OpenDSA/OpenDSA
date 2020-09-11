#!/bin/bash

echo "-------------------------------------------------------"
echo "Updating OpenDSA"
make pull
echo "-------------------------------------------------------"
echo "Instantiating venv"
. /opendsa/.pyVenv/bin/activate
echo "cd /opendsa"
echo ". .pyVenv/bin/activate" >> /root/.bashrc
echo "-------------------------------------------------------"
echo "Making books"
make Test
echo "-------------------------------------------------------"
echo "Starting Server"
make Webserver

#!/bin/bash

echo "-------------------------------------------------------"
echo "Instantiating venv"
. /opendsa/.pyVenv/bin/activate
echo -e "cd /opendsa\n. .pyVenv/bin/activate" >> /root/.bashrc
echo "-------------------------------------------------------"
echo "Starting Server"
make Webserver

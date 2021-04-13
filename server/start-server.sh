#!/bin/bash

echo Migrating
python3 manage.py makemigrations
python3 manage.py migrate

echo Starting Gunicorn
exec gunicorn --config=gunicorn.py opendsa.wsgi:application

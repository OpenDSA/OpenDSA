FROM python:3.9

ENV PYTHONUNBUFFERED=1
WORKDIR /opendsa/server
COPY requirements-docker.txt /opendsa/server/
RUN pip3 install -r requirements-docker.txt

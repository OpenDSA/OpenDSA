FROM python:3.8

LABEL maintainer="awh4kc@vt.edu"

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update -qq \
    && apt-get install -y make vim lsof curl nodejs npm git-core \
    && apt-get upgrade -y \
    && npm install -g npm@latest csslint jsonlint eslint uglify-js clean-css-cli

RUN mkdir /opendsa
WORKDIR /opendsa

RUN mkdir lib
ADD Makefile /opendsa
ADD requirements.txt /opendsa
RUN git clone https://github.com/sublime09/hieroglyph.git /opendsa/lib/hieroglyph
RUN make venv
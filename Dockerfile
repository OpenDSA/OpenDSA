FROM python:3.8-slim

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update -qq \
    && apt-get install -y make nodejs npm git-core \
    && apt-get upgrade -y \
    && npm install -g csslint jsonlint eslint uglify-js clean-css-cli

RUN mkdir /opendsa
WORKDIR /opendsa

RUN mkdir lib
RUN git clone https://github.com/sublime09/hieroglyph.git /opendsa/lib/hieroglyph
ADD requirements.txt /opendsa
RUN pip install -r requirements.txt

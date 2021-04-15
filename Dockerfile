FROM python:3.9-alpine

ARG ODSA_ENV="DEV"
ENV ODSA_ENV=${ODSA_ENV}

ARG FLASK_ENV="development"
ENV FLASK_ENV=${FLASK_ENV}
ARG FLASK_APP='app.py'
ENV FLASK_APP=${FLASK_APP}

ENV PYTHONUNBUFFERED=1
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apk update
RUN apk add --no-cache bash git curl make nodejs npm
RUN npm install --global csslint jsonlint eslint uglify-js clean-css-cli

WORKDIR /opendsa

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

CMD ["make", "help", "webserver"]

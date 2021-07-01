FROM nikolaik/python-nodejs:python3.9-nodejs16

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

RUN pip3 install deepspeech

#add rest of the project
COPY ./src/ .

VOLUME ./assets/audio .

EXPOSE 4200
FROM node:16.3

WORKDIR /factor

COPY ./package*.json .

RUN npm install

RUN apt update && apt install -y python3-pip

RUN pip3 install deepspeech

#add rest of the project
COPY ./src/ .

#VOLUME ./assets /factor/assets

EXPOSE 4200
FROM node:16.3

WORKDIR /factor

COPY ./package*.json .

RUN npm install

RUN apt update && apt install -y python3-pip ffmpeg sox

RUN apt update && apt install -y netcat

RUN pip3 install deepspeech

#add rest of the project
COPY ./src/ .

COPY ./wait-for.sh /factor/wait-for.sh

#VOLUME ./assets /factor/assets

EXPOSE 5000
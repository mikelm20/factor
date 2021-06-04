FROM jrottenberg/ffmpeg:4.1-alpine AS ffmpeg

FROM node:12.10.0-alpine

COPY --from=ffmpeg / /

#send node to base route
WORKDIR /factor
ADD ./package* /factor/

#update config
RUN npm install

#add rest of the project
COPY ./src/ /factor/src
#COPY ./.env /factor

#outside port
EXPOSE 3000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# Stage 1

FROM node:16.3 as build-step

WORKDIR /factor

COPY ./package*.json .

RUN npm ci --silent

#add rest of the project
COPY ./src ./src
COPY ./public ./public

RUN npm run build

# Stage 2

FROM nginx:1.21.1

WORKDIR /usr/share/nginx/html

# Copy static assets from builder stage
COPY --from=build-step /factor/build .

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
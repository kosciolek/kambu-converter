# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as build-img

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn --immutable-cache --immutable

COPY . ./

RUN yarn build


FROM nginx:1.21.1
COPY --from=build-img /app/build/ /usr/share/nginx/html



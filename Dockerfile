FROM node:18.14-alpine

WORKDIR /usr/app

COPY package*.json .
RUN npm install && npm cache clean --force

COPY . .
EXPOSE 4000
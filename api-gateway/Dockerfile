FROM node:alpine
MAINTAINER Biniam Brhanemeskel
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
CMD [ "node", "/usr/src/app/hello-service" ]
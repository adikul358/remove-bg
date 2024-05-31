FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install
RUN mkdir -p uploads 

COPY . ./


CMD npm run prod
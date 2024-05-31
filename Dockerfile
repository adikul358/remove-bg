FROM node:22-alpine

WORKDIR /

COPY . .

RUN npm install

CMD node app.js
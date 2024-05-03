FROM node:20

ENV NODE_ENV=production

LABEL maintainer="danny brock kai stephen"

WORKDIR /

COPY package.json package-lock.json ./

RUN NODE_ENV=production npm ci

COPY ./dist ./dist
COPY . .

EXPOSE 8080

CMD [ "node", "back.js" ]
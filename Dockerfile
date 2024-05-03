FROM node:20

ENV NODE_ENV=production

LABEL maintainer="danny brock kai stephen"

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

COPY . .

EXPOSE 8080

CMD [ "node", "back.js" ]
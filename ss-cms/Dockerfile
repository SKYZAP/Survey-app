FROM node:17-alpine3.14

WORKDIR /startsomething/ss-cms

COPY . .

RUN npm -g install npm@7.24.2

RUN npm install

EXPOSE 8080

CMD ["npm","start"]

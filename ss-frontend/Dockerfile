FROM node:17-alpine3.14

WORKDIR /startsomething/ss-frontend

COPY . .

RUN npm -g install npm@7.24.2

RUN npm install && npm run build

EXPOSE 3010

CMD ["npm","start"]

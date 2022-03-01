FROM node:17-alpine3.14

WORKDIR /startsomething/ss-backend

COPY . .

RUN npm -g install npm@7.24.2

RUN npm install && npm run build

EXPOSE 3000

CMD ["npm","start"]

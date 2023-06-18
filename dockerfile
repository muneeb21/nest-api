FROM node:16.14.1

WORKDIR /nest-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]


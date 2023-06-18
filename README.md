

## Description

[Nest](https://github.com/nestjs/nest) api for contact webservice.
- Tech stack used: Postgresql, Nestjs, Nodejs and Typescript

## Software Requirements to run app

```bash
$ postgres
$ node
$ docker

```

## Running the app

```bash
# Using docker
 - setup your postgres credentials in .env file
 - Go to root directory of project and run
   $ docker build -t nest-api .
   $ docker run -p 3000:3000 nest-api

 # Alternate method to run api
 - install node version 16
 - run npm i in root directory
 - setup your postgres credentials in .env file
 -  npm run start:dev

$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api Details

```bash
# Url
$ localhost:3000/identify

```

```ruby
# curl

curl --location --request POST 'localhost:3000/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "mcfly@hillvalley.edu",
	"phoneNumber": "123456"
}'
```



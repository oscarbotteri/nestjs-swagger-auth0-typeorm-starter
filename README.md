# DEPT Central API

🛠️💡 This is the beating heart of Dept® Central: our backend powered by Node.js, with NestJS/Express woven into its core. Here, ideas become reality and data comes to life. Dive into the backend that powers the Dept® Central experience.

## Getting Started

This repo uses `node v20.11.0` and `npm v10.2.4`. These can be installed by using [NVM](https://github.com/nvm-sh/nvm), node version manager, to run the command:
```bash
$ nvm use
$ nvm install
```

Create a `.env` file from the local example (`.env.example`) and fill in the missing values by pinging another dev.
Once the file are defined you can start the app.

## Installation

Run the following commands to clone the repo and install dependencies:
```bash
$ git clone git@github.com:oscarbotteri/nestjs-swagger-auth0-typeorm-starter.git
¢ cd nestjs-swagger-auth0-typeorm-starter
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

To perform unit tests and e2e tests, we are using NestJS's testing utility library and `golevelup/ts-jest` to create mocks easily.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

To interact with TypeORM from the comand line, we create some npm scripts to run migrations, seeds, etc:

```bash
# create migration to create a new table
$ npm run db:migrate:create ./database/migrations/CreateUsersTable

# Run all migrations
$ npm run db:migrate:run

# Populate DB with mock data
$ npm run db:seed

# Rolllback all migrations
$ npm run db:reset
```
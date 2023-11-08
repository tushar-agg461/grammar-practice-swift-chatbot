<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

In this comprehensive guide, we introduce you to our Chatbot Starter Kit, a resource designed to empower developers in building robust chatbot applications. Whether you are just starting your journey in chatbot development or are an experienced developer seeking an efficient solution, this document is your go-to resource for mastering the use of our starter kit.


# Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js and npm installed
* Nest.js CLI installed (npm install -g @nestjs/cli)
* MySQL database accessible

## Getting Started
### Installation
* Fork the repository
Click the "Fork" button in the upper right corner of the repository page. This will create a copy of the repository under your GitHub account.


* Clone this repository:
```
https://github.com/madgicaltechdom/chatbot-nestjs-boilerplate.git
```
* Navigate to the Project Directory:
```
cd chatbot-nestjs-boilerplate
```
* Install Project Dependencies:
```bash
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

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Add the following environment variables:

```bash
API_URL = API_URL
BOT_ID = BOT_ID
API_KEY = API_KEY
DATA_BASE=DATA_BASE
DB_HOST=DB_HOST
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
```
# API Endpoints
```
POST api/message: Endpoint for handling user requests. 
Get/api/status: Endpoint for checking the status of  api
```
# folder structure

```bash
src/
├── app.controller.ts
├── app.module.ts
├── main.ts
├── chat/
│   ├── chat.service.ts
│   └── chatbot.model.ts
├── common/
│   ├── exceptions/
│   │   ├── custom.exception.ts
│   │   └── http-exception.filter.ts
│   ├── middleware/
│   │   ├── log.helper.ts
│   │   └── log.middleware.ts
│   └── utils/
│       └── date.service.ts
├── config/
│   └── database.config.ts
├── i18n/
│   ├── en/
│   │   └── localised-strings.ts
│   └── hi/
│       └── localised-strings.ts
├── localization/
│   ├── localization.service.ts
│   └── localization.module.ts
│
├── message/
│   ├── message.service.ts
│   └── message.service.ts
└── model/
│   ├── user.entity.ts
│   ├──user.module.ts
│   └──query.ts
└── swiftchat/
    ├── swiftchat.module.ts
    └── swiftchat.service.ts

```



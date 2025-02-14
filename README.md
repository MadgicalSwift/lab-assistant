# Project Title:
Lab Assistant Bot: A Virtual Science Lab for Kids

# Project Description:
The Lab Assistant Bot is an interactive learning tool designed to help students understand and explore science experiments. It provides step-by-step instructions for conducting experiments, educational videos, quizzes, and explanations to reinforce scientific concepts. This bot is ideal for kids below 6th to 12th, focusing on making science fun and easy to understand.

# Key Features:
1. Interactive Science Experiments:

2. Detailed steps for hands-on learning (e.g., "Balloon Rocket Test" to demonstrate Newton’s Third Law of Motion).
Simple materials listed to make experiments accessible.
Educational Video Links:

3. Demonstrations of each experiment through easy-to-understand videos.
Quiz Sets:

4. Engaging quiz questions to test and reinforce knowledge.
Immediate explanations for correct answers to improve comprehension.
Concept Reinforcement:

5. Concepts such as action-reaction forces, air pressure, and thrust are explained in simple terms.
Topic and Level Categorization:

6. Easy-level topics for young learners with gradual progression to more complex topics.


# Prerequisites
Before you begin, ensure you have met the following requirements:

* Node.js and npm installed
* Nest.js CLI installed (npm install -g @nestjs/cli)
* DynamoDb database accessible

## Getting Started
### Installation
* Fork the repository
Click the "Fork" button in the upper right corner of the repository page. This will create a copy of the repository under your GitHub account.


* Clone this repository:
```
https://github.com/MadgicalSwift/lab-assistant.git
```
* Navigate to the Project Directory:
```
cd lab-assistant
```
* Install Project Dependencies:
```bash
$ npm install or npm i
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
USERS_TABLE= testing-table-1
REGION= ap-south-1
ACCESS_KEY_ID= ACCESS_KEY_ID
SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
API_URL = API_URL
BOT_ID = BOT_ID
API_KEY = API_KEY
```

# API Endpoints
```
POST api/message: Endpoint for handling user requests. 
Get/api/status: Endpoint for checking the status of  api
```

# Make their local server to public server
```
Install and run ngrok using command "ngrok http 3000" Copy forwarding Url
insatall and run postman and past url in the body 
and send PUt request Url https://v1-api.swiftchat.ai/api/bots/Bot_Id/webhook-url
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

# Link
* [Documentation](https://app.clickup.com/43312857/v/dc/199tpt-7824/199tpt-19527)


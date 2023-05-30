# Mimoo Tools Project

Mimoo tools is an application for VUTTR (Very Useful Tools to Remember);

The application is a simple repository for managing tools with their respective names, links, descriptions and tags.

This project was built using the serverless framework which, through the serverless.yml file, was configured to direct routes to specific functions and already automatically provision a structure in AWS such as the AWS DynamoDB Database, AWS Lambda Functions, AWS API Gateway for managing routes and AWS Cognito for User Authentication.


## Technologies used

The application was built using the following stacks:
NodeJs, AWS Cognito, AWS Api Gateway, AWS Lambda, AWS DynamoDB, Swagger for documentation and Serverless Framework.

## Links 

[-> Backend Repository](https://github.com/smarticogit/mimoo)

[-> Front End Repository](https://github.com/smarticogit/mimoo-front)

[-> App Mimoo Desktop](https://smarticogit.github.io/mimoo-front/)

[-> Documentation](https://qfdzv16do0.execute-api.us-east-1.amazonaws.com/dev/swagger)

### Usage

Run the API Locally :

Inside the project folder:

```
npm install
```

```
npm run dev
```
After executing these commands in the terminal, it must return the url and the routes of the endpoints.
After running deploy, you should see output similar to:

```bash
Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * delete: mimoo-dev-delete
           * update: mimoo-dev-update
           * get: mimoo-dev-get
           * create: mimoo-dev-create
           * list: mimoo-dev-list
           * register: mimoo-dev-register
           * login: mimoo-dev-login
           * getTag: mimoo-dev-getTag

   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                                                                              │
   │   DELETE | http://localhost:3000/tools/{toolId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/delete/invocations     │
   │   PUT    | http://localhost:3000/tools/{toolId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/update/invocations     │
   │   GET    | http://localhost:3000/tools/{toolId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/get/invocations        │
   │   POST   | http://localhost:3000/tools                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/create/invocations     │
   │   GET    | http://localhost:3000/tools                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/list/invocations       │
   │   POST   | http://localhost:3000/register                                    │
   │   POST   | http://localhost:3000/2015-03-31/functions/register/invocations   │
   │   POST   | http://localhost:3000/login                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/login/invocations      │
   │   GET    | http://localhost:3000/getTag                                      │
   │   POST   | http://localhost:3000/2015-03-31/functions/getTag/invocations     │
   │                                                                              │
   └──────────────────────────────────────────────────────────────────────────────┘
```

Note: As the project is connected to aws, it may not be able to test all the resources as a security measure, as the access credentials are not included in these projects.

For a more complete test, use the Mimoo App link or the Documentation with Swagger;

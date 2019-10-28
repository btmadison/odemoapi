# ODemo Resources

### NOTE

For the Demo Application, everything must be run locally with the `sls offline` command.

## Overview

In a mono-repo all items are grouped under a single parent repository. But unlike a monolythic application, using this pattern still allows for microservices, with easier means to share code.

[Serverless Framework](https://serverless.com/framework/docs/getting-started/) is utilized to interact with AWS and greatly simplifies the management of cloudformation stacks and serverless microservice frameworks.

### Hybrid Mono Repo

In this mono-repo hybrid structure, there are 2 - 3 repos (3 if keeping the app in its own repo as is the case in this instance). The two main pieces are this one, the Resources repo - which is used to scaffold infrastructure as code that will not change between feature branches.

## Development Environment Setup

- [Node JS 10.X installation instructions](https://nodejs.org/en/download/package-manager/) for various environments
- [AWS CLI Installation Instructions](https://docs.amazonaws.cn/en_us/cli/latest/userguide/cli-chap-install.html) for various environments - after complet run `aws configure`
- [Serverless Framework Installation Instructions](https://serverless.com/framework/docs/getting-started/) for various environments and additonally [Set up your AWS Credentials for Serverless](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)

### Demo API Execution Note

aws cli configuration may be unnecessary for this demo as you should just run `sls offline'. The following documentation would remain, but for now you can following the folling bulleted items and stop at that point to get the local services running:

- npm install at / and again at /services/students-api
- make sure you have a .env file configured at /services/students-api/.env - the file should contain: `MOCK_STUDENT_DATA_FILE='./tmp/students.json'` (some code changes are need to use the tmp folder properly when running from lambda, this will run fine now for local windows cmd or bash dev)
- navigate to /services/students-api and run the command `sls offline` - the api should start with some logging output that it is running on http://localhost:3000/students - if it is different, update the address in the app project environment.ts file for ui local run.

### Environment Variables

A .env file can be added to each service to set the various required environment variables for local development, instead of manually entering them or adding them to your local profile. This file can contain sensative information and is in the .gitignore to avoid adding it to source control.

the [dotenv node package](https://github.com/motdotla/dotenv) is used for loading env variables, and the serverless-dotenv-plugin is used for reading specific values into the serverless functions or .yml file. command line params will take precedence over .env file params when running commands such as sls deploy.

## Resource Installation instructions:

Currently this demo does not rely on any resources scaffolded from the bmad-odemo-resources repo.

## Local Resource Plugin

To Ease development, the services in the svcs repo will have optional settings for running in serverless offline mode, through use the of serverless-offline plug-in. This will allow for easier development and not needed to scaffold these resources for now and having to worry about authentication from local host.

To run this demo API locally, the following steps will be needed:

- at the repo root, run `npm install`
- at the /services/students-api root, run `npm install`

Now, running `sls offline` from /services/students-api will launch local host versions of the routes for get and list students, emulating api gateway

## Offline Cloud Services

Various Cloud Services, such as DynamoDB can be emulated with a plugin to make offline testing with a dynamodb replica easier, but currently this demo does not utilize the external database.

## Deployment

From the /services/students-api root, run the command `sls deploy' - if you have properly configured your aws account and serverless framework account, the application will upload the functions. Utilise region and stage flags for different regions and stages, for example:`sls deploy -s dev -r us-east-1` will create the api gateway and necessary resources with a dev stage in the us-east-1 region. These settings are also the default settings currently.

## Testing

Unit Tests can be run from the root of the demo svc's repository with the command `npx jest`, unit tests live next to their counterpart ts files, named .test.ts.

Integration Tests will be under the specific services /integration folder

The text-mocks folder is used to create json payloads for testing locally against deployed services (after running sls deploy, instead of running sls offline, tests can be run from the command line with `serverless invoke local --function functionName --data ./test-mocks/some.json` command)

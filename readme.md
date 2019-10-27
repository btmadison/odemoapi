# ODemo Resources

### NOTE: For the Demo Application, everything can be run locally and none of this would be necessary - see notes in the svcs repo for - this is just for example purposes of scaffolding for various environmental resources and sharing of resource with the other repos services as needed.

## Overview

In a mono-repo all items are grouped under a single parent repository. But unlike a monolythic application, using this pattern still allows for microservices, with easier means to share code.

[Serverless Framework](https://serverless.com/framework/docs/getting-started/) is utilized to interact with AWS and greatly simplifies the management of cloudformation stacks and serverless microservice frameworks.

### Hybrid Mono Repo

In this mono-repo hybrid structure, there are 2 - 3 repos (3 if keeping the app in its own repo as is the case in this instance). The two main pieces are this one, the Resources repo - which is used to scaffold infrastructure as code that will not change between feature branches.

## Development Environment Setup

Minimally to operate with this you will need the following set up for your environment:

- [Node JS 10.X installation instructions](https://nodejs.org/en/download/package-manager/) for various environments
- [AWS CLI Installation Instructions](https://docs.amazonaws.cn/en_us/cli/latest/userguide/cli-chap-install.html) for various environments - after complet run `aws configure`
- [Serverless Framework Installation Instructions](https://serverless.com/framework/docs/getting-started/) for various environments and additonally [Set up your AWS Credentials for Serverless](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)

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

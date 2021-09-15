# Verizon - Blue Jeans

## Introduction
This project is built with `ReactJS` and we rely on [Chakra-ui](https://chakra-ui.com) as our component library.

## Prerequisites
The version of the tools we are using are the following:

- Node: `v14.17.3`
- Npm: `v6.14.13`
- Yarn: `v1.22.10`

However we should always stick to yarn.

## How to run

### Install the dependencies

  ```bash
  yarn install
  ```

### Run the project

  ```bash
  yarn start
  ```

The app should start on https://localhost:3000. _You may have to allow the browser to open the 'unsecure' site._

## Misc

### Visual Studio Code -  Recomended workspace settings
If you are working under visual studio code we suggest you to use the following `settings.json` under your `.vsocde` folder:
```json
{
  "files.exclude": {
    "amplify/.config": true,
    "amplify/**/*-parameters.json": true,
    "amplify/**/amplify.state": true,
    "amplify/**/transform.conf.json": true,
    "amplify/#current-cloud-backend": true,
    "amplify/backend/amplify-meta.json": true,
    "amplify/backend/awscloudformation": true
  },
  "eslint.packageManager": "yarn"
}
```

## Technologies
### Frontend
- [React](https://reactjs.org/) - Main UI Javascript framework 
- [Chakra-ui](https://chakra-ui.com/) - UI design and component library
### Backend
- [Amplify](https://aws.amazon.com/amplify/) - AWS framework & tools to set up and configure everything on AWS
- [AppSync](https://aws.amazon.com/appsync/) - AWS GraphQL service
- [Cognito](https://aws.amazon.com/cognito/) - AWS IAM authentication and authorization service
- [DynamoDB](https://aws.amazon.com/dynamodb/) - AWS nosql database
- [GraphQL](https://graphql.org/) to query and update the DB and to subscribe to real time updates.



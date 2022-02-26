This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Setup
  `npm install` // run after every pull
  `npm install -g @aws-amplify/cli` // install amplify CLI
  `amplify pull --appId d1rh5ydrl7drpe --envName dev` // choose all defaults to get backend stuff

- start dev server
  `npm start` // runs on https://localhost:3000

- create optimized build package for production in /build folder
  `npm run build`

- run production /build folder on localhost:5000
  `npm run start:prod`

## Deploy

# App info

- Uses [GraphQL](https://graphql.org/) to query and update the DB and to subscribe to real time updates for changes.
- [AppSync](https://aws.amazon.com/appsync/) = AWS GraphQl service
- [Cognito](https://aws.amazon.com/cognito/) = AWS IAM authentication and authorization service
- [DynamoDB](https://aws.amazon.com/dynamodb/) = AWS nosql database
- [Amplify](https://aws.amazon.com/amplify/) = AWS framework & tools to set up and configure everything on AWS

The DB schema, IAM and AppSync API are all configured using Amplify. To update the DB and API, edit schema.graphql and run `amplify push`.

Apparently, your aws account must have admin privs to run `amplify push`.

Amplify has a command-line tool to configure the entire app infrastructure, front and back ends, using all the services listed above. In the last step, you specify the data schema required for the app in the schema.graphql file [Here is ours](https://ctlabs.verizon.net/visp-stash/projects/RLP/repos/rla-feature/browse/amplify/backend/api/rlafeature/schema.graphql). It decribes the data requirements and their relationships. The DB and GraphQL API are all created/updated on the backend and code is generated for the front end.

You have to make sure your git branch and amplify environment are what you expect. Generally, each git branch is matched with a amplify environment.

## amplify commands

- amplify status -v // shows current state with details if the front and backend aren't in sync

### To create a new env:

- pull environment you want to copy
- amplify add env // carry over environment vars
- amplify push
- amplify pull

### to work in an env:

- amplify checkout env [name]
- amplify pull

### to deploy

- amplify publish // generates front end code, does optimized build from local source, pushes it to the server under the current environment

### update emails text

- we use Amazon SES (simple email service)
- see the /email folder
- upload email templates using emailTemplateUtil.js
  - node emailTemplateUtil.js <"create" or "update"> <template file path & name>
  - e.g. "node emailTemplateUtil.js update ./templates/inviteToRegisterTemplate.json"

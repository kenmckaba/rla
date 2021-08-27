This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Setup
  `npm install` // run after every pull
  `amplify init` // create aws-exports.js which is needed to run it

- start dev server
  `npm start`

- create optimized build package for production in /build folder
  `npm run build`

- run production /build folder on localhost:5000
  `npm run start:prod`

## Deploy & start service

Run `npm run build` first

Open 2 bash terminals

Terminal 1: copy build folder to ec2 instance. Use appropriate paths.
`scp -r -i rlp-website.pem /c/dev/rla-feature/build ec2-user@3.94.153.63:/home/ec2-user/test/rla-feature`

Terminal 2: login to Pooja's ec2 instance and start the server:
`ssh -i rlp-website.pem ec2-user@3.94.153.63`
`cd test/rla-feature/`
`npx serve -s -p 5000 build/` # run server on port 5000

Access via https://umass-rlp.dltdemo.io

# App info

- Uses [GraphQL](https://graphql.org/) to query and update the DB and to subscribe to real time updates for changes.
- [AppSync](https://aws.amazon.com/appsync/) = AWS GraphQl service
- [Cognito](https://aws.amazon.com/cognito/) = AWS IAM authentication and authorization service
- [DynamoDB](https://aws.amazon.com/dynamodb/) = AWS nosql database
- [Amplify](https://aws.amazon.com/amplify/) = AWS framework & tools to set up and configure everything on AWS

The DB schema, IAM and AppSync API are all configured using Amplify. To update the DB and API, edit schema.graphql and run `amplify push`.

Apparently, your aws account must have admin privs to run `amplify push`.

Amplify has a command-line tool to configure the entire app infrastructure, front and back ends, using all the services listed above. In the last step, you specify the data schema required for the app in the schema.graphql file [Here is ours](https://stash.verizon.com/projects/NPDIRP/repos/rla-feature/browse/amplify/backend/api/rlafeature/schema.graphql). It decribes the data requirements and their relationships. The DB and GraphQL API are all created/updated on the backend and code is generated for the front end.

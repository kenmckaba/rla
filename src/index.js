import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client'
import Amplify, { Auth } from 'aws-amplify'
import awsConfig from './aws-exports'
import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import { onError } from '@apollo/client/link/error'

Amplify.configure(awsConfig)

const url = awsConfig.aws_appsync_graphqlEndpoint
const region = awsConfig.aws_appsync_region
const type = awsConfig.aws_appsync_authenticationType

const auth = {
  type,
  credentials: () => Auth.currentCredentials(),
}

const errorLink = onError((errs) => {
  console.error('rla-log: errors', errs)
  const { graphQLErrors, networkError } = errs
  if (graphQLErrors) {
    graphQLErrors.map((err) => console.error('rla-log: [GraphQL error]:', err))
  }
  if (networkError) {
    console.error('rla-log: [Network error]', networkError)
  }
})

const link = ApolloLink.from([
  errorLink,
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }),
])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

window.LOG_LEVEL = 'DEBUG'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

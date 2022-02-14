/* Amplify Params - DO NOT EDIT
	API_RLAFEATURE_GRAPHQLAPIENDPOINTOUTPUT
	API_RLAFEATURE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
	API_RLAFEATURE_GRAPHQLAPIENDPOINTOUTPUT
	API_RLAFEATURE_GRAPHQLAPIIDOUTPUT
	API_RLAFEATURE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
	API_RLAAPI_APIID
	API_RLAAPI_APINAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const graphql = require('graphql')
const { print } = graphql
const gql = require('graphql-tag')
const urlParse = require('url').URL

const AWS = require('aws-sdk')
const rekognition = new AWS.Rekognition({ region: 'us-east-1' })
// var dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

// declare a new express app
var app = express()
app.use(bodyParser.json({ limit: '200mb' }))
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

const {
  API_RLAFEATURE_GRAPHQLAPIENDPOINTOUTPUT: url,
  API_RLAFEATURE_GRAPHQLAPIKEYOUTPUT: apiKey,
  AWS_REGION: region,
  API_RLAFEATURE_GRAPHQLAPIIDOUTPUT: graphqlApi,
  ENV: env,
} = process.env

// todo: following appears to update DB ok, but causes weird graphql problems on attendee page
// eslint-disable-next-line no-unused-vars
const updateAttendeeGraphQL = async (attendeeId, emotions, pose) => {
  const posePitch = Math.round(Math.abs(pose.Pitch))
  const poseYaw = Math.round(Math.abs(pose.Yaw))
  const poseRole = Math.round(Math.abs(pose.Roll))
  console.log('updateAttendeeGraphQL', attendeeId, emotions, posePitch, poseYaw, poseRole)

  // returned values appear to be required,
  // otherwise anyone subscribing to updateAttendee gets missing required value errors
  const updateAttendee = gql`
    mutation UpdateAttendee($input: UpdateAttendeeInput!, $condition: ModelAttendeeConditionInput) {
      updateAttendee(input: $input, condition: $condition) {
        id
        name
        createdAt
        updatedAt
        trainingId
        email
      }
    }
  `
  const data = {
    query: print(updateAttendee),
    variables: {
      input: {
        id: attendeeId,
        currentMood: emotions,
        posePitch,
        poseYaw,
        poseRole,
      },
    },
  }

  let req = new AWS.HttpRequest(url, region)
  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = new urlParse(url).hostname.toString()
  req.headers['x-api-key'] = apiKey
  req.headers['Content-Type'] = 'multipart/form-data'
  req.body = JSON.stringify(data)

  let signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  console.log('@ken req', req)
  const result = await axios({
    url,
    method: 'post',
    data: req.body,
    headers: req.headers,
  })
  if (result?.data?.errors) {
    console.log('ERROR!!', result.data.errors)
    return { success: false, errors: JSON.stringify(result.data.errors) }
  }
  console.log('graphQl result', result, result?.data, result?.data?.data, result?.data?.errors)
  return { success: true, result: result?.data?.data?.updateAttendee }
}

app.post('/image', async function (req, res) {
  const { image, attendeeId } = req.body
  const imageBuffer = Buffer.from(decodeURIComponent(image), 'base64')

  const params = {
    Attributes: ['ALL'],
    Image: { Bytes: imageBuffer },
  }
  console.log('attendeeId', attendeeId)
  // console.log('params', params)

  try {
    const result = await rekognition.detectFaces(params).promise()
    console.log('result', result)
    console.log('process.env', process.env)
    const { FaceDetails } = result
    if (!FaceDetails.length) {
      throw new Error('No face detected')
    }
    const { Pose, Emotions } = FaceDetails[0]
    console.log('facedetails', Pose, Emotions[0])

    // todo: following appears to update DB ok, but causes weird graphql problems on attendee page
    // await updateAttendeeGraphQL(attendeeId, Emotions[0].Type, Pose)
    console.log('SUCCESS', { Pose, Emotions })
    res.json({ success: true, Pose, Emotions: Emotions[0].Type })
  } catch (err) {
    console.log('ERROR', typeof err, err)
    res.json({ success: false, err })
  }
})

// this returns 403
// const getTrainingsGraphQL = async () => {
//   const listTrainingsX = /* GraphQL */ `
//     query ListTrainings($filter: ModelTrainingFilterInput, $limit: Int, $nextToken: String) {
//       listTrainings(filter: $filter, limit: $limit, nextToken: $nextToken) {
//         items {
//           id
//           title
//           description
//           trainerName
//           trainerEmail
//           registrationUrl
//           maxAttendees
//           meetingId
//           moderatorPasscode
//           participantPasscode
//           scheduledTime
//           startedAt
//           endedAt
//           whiteboardUrl
//           attendees {
//             items {
//               id
//               name
//               email
//             }
//           }
//           polls {
//             items {
//               id
//               question
//               type
//               answers
//               correctAnswerIndex
//               startedAt
//               stoppedAt
//             }
//           }
//           sharedDocs {
//             items {
//               id
//               title
//               type
//               url
//             }
//           }
//         }
//       }
//     }
//   `
//   const listTrainings = gql`
//     query MyQuery {
//       listTrainings {
//         items {
//           id
//           title
//         }
//       }
//     }
//   `

//   let req2 = new AWS.HttpRequest(url, region)
//   req2.method = 'POST'
//   req2.path = '/graphql'
//   req2.headers.host = new urlParse(url).hostname.toString()
//   req2.headers['x-api-key'] = apiKey
//   req2.headers['Content-Type'] = 'multipart/form-data'
//   req2.body = JSON.stringify({ query: print(listTrainings) })

//   let signer = new AWS.Signers.V4(req2, 'appsync', true)
//   signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

//   console.log('@ken req2', req2)

//   const result = await axios({
//     url,
//     path: req2.path,
//     data: req2.body,
//     headers: req2.headers,
//   })
//   console.log('graphQL result xxx', result, result?.data, result?.data?.errors)
//   const tables = await dynamodb.listTables({}).promise()
//   console.log('tables', tables)
// }

app.get('/trainings', async function (req, res) {
  console.log('/trainings req')
  console.log('env', process.env)
  console.log('queryParams', req.query)

  const TableName = `Training-${graphqlApi}-${env}`
  var params = { TableName }

  console.log('scan', params)
  console.log('keys', Object.keys(req.query))
  try {
    const result = await docClient.scan(params).promise()
    let trainings = result.Items

    if (req.query.id) {
      // ?id=xxx
      trainings = trainings.filter((tr) => tr.id === req.query.id)
    } else if (Object.keys(req.query).includes('next')) {
      // ?next
      trainings = trainings.reduce((acc, tr) => {
        const last = acc[0]
        console.log('reduce', tr.startedAt, tr.scheduledTime, acc)
        if (!tr.startedAt && (!last || tr.scheduledTime < last.scheduledTime)) {
          return [tr]
        }
        return acc
      }, [])
    } else if (Object.keys(req.query).includes('today')) {
      // ?today
      const today = new Date().toISOString().substr(0, 10)
      trainings = trainings.reduce((acc, tr) => {
        const scheduledDate = tr.scheduledTime.substr(0, 10)
        console.log('reduce', scheduledDate, today, acc)
        if (scheduledDate === today && !tr.endedAt) {
          acc.push(tr)
        }
        return acc
      }, [])
    }
    console.log('trainings', trainings)
    res.json({ success: true, params: req.query, trainings })
  } catch (err) {
    console.log('Unable to query. Error:', JSON.stringify(err, null, 2))
  }
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

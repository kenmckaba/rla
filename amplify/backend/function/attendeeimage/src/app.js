/* Amplify Params - DO NOT EDIT
	API_RLAFEATURE_GRAPHQLAPIENDPOINTOUTPUT
	API_RLAFEATURE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
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
// const dynamodb = new AWS.DynamoDB()
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

const updateAttendee2 = async (attendeeId, emotions, pose) => {
  const posePitch = Math.round(Math.abs(pose.Pitch))
  const poseYaw = Math.round(Math.abs(pose.Yaw))
  const poseRoll = Math.round(Math.abs(pose.Roll))
  console.log('updateAttendee2 2', attendeeId, emotions, posePitch, poseYaw)
  const {
    API_RLAFEATURE_GRAPHQLAPIENDPOINTOUTPUT: url,
    API_RLAFEATURE_GRAPHQLAPIKEYOUTPUT: apiKey,
    AWS_REGION: region,
  } = process.env

  // const updateAttendee = gql`
  //   mutation UpdateAttendee($attendeeId: ID!, $attendeeDetails: UserInput!) {
  //     updateAttendee(attendeeId: $attendeeId, attendeeDetails: $attendeeDetails) {
  //       attendeeId
  //       currentMood
  //       posePitch
  //       poseYaw
  //     }
  //   }
  // `
  const updateAttendee = gql`
    mutation UpdateAttendee($attendeeId: ID!, $attendeeDetails: UserInput!) {
      updateAttendee(attendeeId: $attendeeId, attendeeDetails: $attendeeDetails) {
        attendeeId
        currentMood
        posePitch
        poseYaw
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
        poseRoll,
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

  const result = await axios({
    url,
    method: 'post',
    data: req.body,
    headers: req.headers,
  })
  console.log('graphQl result', result?.data?.errors)
}

const updateAttendee0 = async (attendeeId, emotions, pose) => {
  // const promise1 = new Promise(async (resolve, reject) => {
  //   dynamodb.listTables({}, function(err, data) {
  //     if (err) {
  //       console.log('listTables error', err)
  //       resolve()
  //     } else {
  //       console.log(data)
  //       resolve()
  //     }
  //   })
  // })
  // await promise1

  const env = process.env.ENV
  const appId = process.env.API_RLAFEATURE_GRAPHQLAPIIDOUTPUT

  const pitch = Math.round(Math.abs(pose.Pitch))
  const yaw = Math.round(Math.abs(pose.Yaw))
  const roll = Math.round(Math.abs(pose.Roll))

  var params = {
    TableName: `Attendee-${appId}-${env}`,
    Key: { id: attendeeId },
    UpdateExpression: 'set currentMood=:e, posePitch=:p, poseYaw=:y, poseRoll=:r',
    ExpressionAttributeValues: {
      ':e': emotions,
      ':p': pitch,
      ':y': yaw,
      ':r': roll,
    },
    ReturnValues: 'UPDATED_NEW',
  }

  console.log('updateAttendee', attendeeId, emotions, pose, params)

  const promise = new Promise(async (resolve, reject) => {
    docClient.update(params, function (err, data) {
      if (err) {
        resolve({ succeded: false, err })
      } else {
        resolve({ succeded: true, data })
      }
    })
  })
  const result = await promise
  console.log('update result', result)
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
    const { Pose, Emotions } = FaceDetails[0]
    console.log('facedetails', Pose, Emotions[0])
    // await updateAttendee2(attendeeId, Emotions[0].Type, Pose)
    // console.log('SUCCESS')
    res.json({ success: true, Pose, Emotions: Emotions[0].Type })
  } catch (err) {
    console.log('ERROR', err)
    res.json({ success: false, err })
  }
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app

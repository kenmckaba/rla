/* eslint-disable indent */
import aws from 'aws-sdk'
import { timestampToPrettyTime } from './pretty-time'

// import { sesParams } from './ses-params'

// const ses = new aws.SES(sesParams)


export const sendJoinEmail = async (attendeeId, name, email, training) => {

  // Load the AWS SDK for Node.js
  const AWS = require('aws-sdk')
  // Set the region 
  AWS.config.update({region: 'us-east-1'}) // need to add region

  // Create sendEmail params 
// var params = {
//   Destinations: [template],
//   Message: { /* required */
//     Body: { /* required */
//       Html: {
//        Charset: 'UTF-8',
//        Data: 'HTML_FORMAT_BODY'
//       },
//       Text: {
//        Charset: 'UTF-8',
//        Data: 'TEXT_FORMAT_BODY'
//       }
//      },
//      Subject: {
//       Charset: 'UTF-8',
//       Data: 'Test email'
//      }
//     },
//   Source: 'ccer@umb.edu', /* required */
//   // ReplyToAddresses: [
//   //    'EMAIL_ADDRESS',
//   //   /* more items */
//   // ],
// }

  const template = {
    Destination: {
      ToAddresses: [email],
    },
    ReplacementTemplateData: JSON.stringify({
      name,
      trainingTitle: training.title,
      trainingDescription: training.description,
      trainingDateAndTime: timestampToPrettyTime(training.scheduledTime),
      trainerName: training.trainerName,
      trainerEmail: training.trainerEmail,
      registrationUpdateUrl: `${window.location.origin}/registration-update/${attendeeId}`,
      trainingJoinUrl: `${window.location.origin}/attendee/${attendeeId}`,
    }),
  }

  const DefaultTemplateData = JSON.stringify({
    name: 'unknown',
    trainingTitle: 'unknown',
    trainingDescription: 'unknown',
    trainingDateAndTime: 'unknown',
    trainerName: 'unknown',
    trainerEmail: 'unknown',
    registrationUpdateUrl: 'unknown',
    trainingJoinUrl: 'unknown',
  })

  const params = {
    Destinations: [template],
    Source: 'ccer@umb.edu',
    Template: 'RLAJoinTraining',
    DefaultTemplateData,
  }
  // console.log(JSON.stringify(params))
  try {
    // const result = await ses.sendBulkTemplatedEmail(params).promise()
    const result = await aws.SES({apiVersion: '2010-12-01'}).sendBulkTemplatedEmail(params).promise()
    console.log('send join email result', result)
  } catch (err) {
    console.error('send join email result', err)
  }



  // Create the promise and SES service object
  // const sendPromise = new aws.SES({apiVersion: '2010-12-01'}).sendBulkTemplatedEmail(params).promise()

  // Handle promise's fulfilled/rejected states
  // sendPromise.then(
  //   function(data) {
  //     console.log(data.MessageId)
  //   }).catch(
  //   function(err) {
  //     console.error(err, err.stack)
  //   })
}

import aws from 'aws-sdk'
import { timestampToPrettyTime } from './pretty-time'

const ses = new aws.SES({
  region: 'us-east-1',
  accessKeyId: 'AKIATZDAET4G5MQCWIH6',
  secretAccessKey: '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',
})

export const sendJoinEmail = async (attendeeId, name, email, training) => {
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
  console.log(JSON.stringify(params))
  try {
    const result = await ses.sendBulkTemplatedEmail(params).promise()
    console.log('send join email result', result)
  } catch (err) {
    console.error('send join email result', err)
  }
}

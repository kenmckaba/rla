import aws from 'aws-sdk'
import { timestampToPrettyTime } from './pretty-time'
import { sesParams } from './ses-params'

const ses = new aws.SES()

// if want to use smtp api:
// ses-smtp-user.20211101-165231
// SMTP Username: AKIATZDAET4GQLTHM3UY
// SMTP Password: BLGuy5LBJS28oN91AJ59jcU8F3OHFxyT0gJaPQRUDOld

const maxEmailsPerCall = 50 // aws ses limit

export const sendRegistrationEmails = async (training, allAttendees) => {
  let startIndex = 0

  while (startIndex < allAttendees.length) {
    const attendees = allAttendees.slice(startIndex, maxEmailsPerCall + startIndex)
    startIndex += maxEmailsPerCall

    const templates = attendees.map((att) => {
      return {
        Destination: {
          ToAddresses: [att.email],
        },
        ReplacementTemplateData: JSON.stringify({
          fname: att.firstName,
          lname: att.lastName,
          email: att.email,
          trainingTitle: training.title,
          trainingDescription: training.description,
          trainingDateAndTime: timestampToPrettyTime(training.scheduledTime),
          trainerName: training.trainerName,
          trainerEmail: training.trainerEmail,
          trainingRegistrationUrl: `${training.registrationUrl}/${att.invitationId}`,
        }),
      }
    })

    const DefaultTemplateData = JSON.stringify({
      fname: 'unknown',
      lname: 'unknown',
      email: 'unknown',
      trainingTitle: 'unknown',
      trainingDescription: 'unknown',
      trainingDateAndTime: 'unknown',
      trainerName: 'unknown',
      trainerEmail: 'unknown',
      trainingRegistrationUrl: 'unknown',
    })

    const params = {
      Destinations: templates,
      Source: 'ccer@umb.edu',
      Template: 'RLAInviteToRegister',
      DefaultTemplateData,
    }
    try {
      const result = await ses.sendBulkTemplatedEmail(params).promise()
      console.log('send email result', result)
    } catch (err) {
      console.error('send email result', err)
    }
  }
}

const AWS = require('aws-sdk')
const ses = new AWS.SES({ region: 'us-east-1' })

// didn't work...
// const operations = {
//   create: ses.createTemplate,
//   update: ses.updateTemplate,
// }

const mainFunction = async () => {
  const operation = process.argv[2]
  const fileName = process.argv[3]
  if (!fileName || ['create', 'update'].indexOf(operation) === -1) {
    throw new Error(
      'bad param: node emailTemplateUtil.js <"create" or "update"> <template file path & name>',
    )
  }
  console.log('processing', operation, fileName)
  const params = require(fileName)
  if (operation === 'update') {
    return await ses.updateTemplate(params).promise()
  } else if (operation === 'create') {
    return await ses.createTemplate(params).promise()
  }
}

mainFunction().then(
  () => {
    console.log('success.')
  },
  (ex) => {
    console.log('Error')
    console.dir(ex.message)
  },
)

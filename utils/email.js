const SibApiV3Sdk = require('sib-api-v3-sdk')
require('dotenv').config()
const defaultClient = SibApiV3Sdk.ApiClient.instance
var apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

const sendQueryEmail = async (
  email,
  message,
  firstname,
  lastname,
  phone,
  emailTo,
  res
) => {
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail = {
    sender: {
      name: 'Moorup',
      email: 'noreply@moorup.com',
    },
    to: [
      {
        email: emailTo,
        name: 'Admin',
      },
    ],
    subject: `New Query from ${firstname + ' ' + lastname}`,

    htmlContent: `<h3>Name : ${
      firstname + ' ' + lastname
    }</h3></br><h3>Email : ${email}</h3></br><h3>Message : ${message}</h3></br><h3>Phone : ${
      phone ? phone : 'Not Provided'
    }</h3>`,
  }

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return res
        .status(200)
        .json({ status: true, message: 'Email sent succesfully' })
    },
    function (error) {
      console.log(error)
      return res
        .status(400)
        .json({ status: false, error: 'Error in sending email t admin' })
    }
  )
}

module.exports = {
  sendQueryEmail: sendQueryEmail,
}

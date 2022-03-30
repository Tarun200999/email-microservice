require('dotenv').config()

const SibApiV3Sdk = require('sib-api-v3-sdk')

const defaultClient = SibApiV3Sdk.ApiClient.instance

var apiKey = defaultClient.authentications['api-key']

apiKey.apiKey = process.env.SENDINBLUE_API_KEY

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

const sendEmail = async (senderEmail, senderName, receiverEmail, receiverName, emailSubject, emailBody, res) => {
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
  sendSmtpEmail = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: receiverEmail,
        name: receiverName,
      },
    ],
    subject: emailSubject,
    htmlContent: emailBody,
  }

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return res.status(200).json({ status: true, message: 'Email sent succesfully' })
    },
    function (error) {
      console.log(error)
      return res.status(400).json({ status: false, error: 'Error ' + error })
    }
  )
}

module.exports = {
  sendEmail: sendEmail,
}

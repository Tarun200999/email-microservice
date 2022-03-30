const express = require('express')

const app = express()

const cors = require('cors')

const { sendEmail } = require('./utils/email')

const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Email Microservice is Working ' })
})

app.post('/api/send/email', async (req, res) => {
  const { senderEmail, senderName, receiverEmail, receiverName, emailSubject, emailBody } = req.body

  if (!senderEmail) return res.status(400).json({ error: 'senderEmail Required' })
  if (!senderName) return res.status(400).json({ error: 'senderName Required' })
  if (!receiverEmail) return res.status(400).json({ error: 'receiverEmail Required' })
  if (!receiverName) return res.status(400).json({ error: 'receiverName Required' })
  if (!emailSubject) return res.status(400).json({ error: 'emailSubject Required' })
  if (!emailBody) return res.status(400).json({ error: 'emailBody Required' })

  sendEmail(senderEmail, senderName, receiverEmail, receiverName, emailSubject, emailBody, res)
})

/* App listning */

app.listen(port, () => {
  console.log('Server is up on port on ' + port)
})

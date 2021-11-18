const express = require('express')
const app = express()

const cors = require('cors')

const { sendQueryEmail } = require('./utils/email')
//port
const port = process.env.PORT || 8000

//DB connection

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.json({ message: 'MOORUP BACKEND WORKING' })
})

app.post('/api/contact/email', async (req, res) => {
  const { email, message, firstname, lastname, phone, emailTo } = req.body

  if (!emailTo || !email || !message || !firstname || !lastname) {
    return res.status(400).json({ status: false, error: 'All fieds required' })
  }

  sendQueryEmail(email, message, firstname, lastname, phone, emailTo, res)
})

/* App listning */

app.listen(port, () => {
  console.log('Server is up on port on ' + port)
})

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
  const { email, message, name, companyName, emailTo } = req.body

  sendQueryEmail(email, message, companyName, name, emailTo, res)
})

/* App listning */

app.listen(port, () => {
  console.log('Server is up on port on ' + port)
})

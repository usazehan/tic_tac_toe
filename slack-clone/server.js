const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:d3045893-44e0-4c27-a74e-c9be52ece3f8',
  key: '5005bcd7-cfdf-4489-b3ea-f3fbbd0c8434:7PcF7Os+eBUWvPUzOqQNGs2Fqp1i/Sd1qSbob8ZiYXA='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const {username} = req.body
  chatkit
    .createUser({
      name: username,
      id: username,
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.statusCode).json(error)
      }
    })
})
app.post('/authenticate', (req, res) => {
  const{grant_type} = req.body
  res.json(chatkit.authenticate({grant_type, userId: req.query.user_id}))
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
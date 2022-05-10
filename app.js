'use strict'

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const express = require('express')

const { authMiddleware, checkApplicationStatus } = require('./middleware/middleware')
const router = require('./router/router')

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(cookieParser())
app.use(authMiddleware)
app.use(checkApplicationStatus)
app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

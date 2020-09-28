const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const entriesRouter = require('./controllers/entries')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const userEntriesRouter = require('./controllers/user-entries')
const companiesRouter = require('./controllers/companies')
const mongoose = require('mongoose')

const app = express()

mongoose.set('useCreateIndex', true)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/entries', entriesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/user-entries', userEntriesRouter)
app.use('/api/companies', companiesRouter)

app.use(middleware.errorHandler)

module.exports = app
const app = require('./app') // the actual Express application
const express = require('express')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

app.use(express.static('build'))


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
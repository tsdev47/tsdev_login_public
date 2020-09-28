const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userEntriesRouter = require('express').Router()
const User = require('../models/user')

userEntriesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
 
  //const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send(user.entries)
})

module.exports = userEntriesRouter
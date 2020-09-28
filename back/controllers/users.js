const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('entries')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/usernames/', async (req, res) => {
  const users = await User.find({}, {
    username: 1
  })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/emails/', async (req, res) => {
  const users = await User.find({}, {
    email: 1
  })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/companies/', async (req, res) => {
  const users = await User.find({}, {
    company: 1
  })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/tax-ids/', async (req, res) => {
  const users = await User.find({}, {
    companyNif: 1
  })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/nifs/', async (req, res) => {
  const users = await User.find({}, {
    nif: 1
  })
  res.json(users.map(u => u.toJSON()))
})


usersRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

usersRouter.get('/admin/:company', async (req, res) => {
  const users = await User
    .find({ company: req.params.company }).populate('entries')
    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    lastName: body.lastName,
    nif: body.nif,
    email: body.email,
    passwordHash,
    admin: body.admin,
    company: body.company,
    companyName: body.companyName,
    companyNif: body.companyNif
  })

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters' })
  } else {
    const savedUser = await user.save()
    response.json(savedUser)
  }
})

usersRouter.put('/:id', async (request, response) => {
  const entry = request.body

  const updatedEntry = await User.findByIdAndUpdate(request.params.id, entry, { new: true })
  response.json(updatedEntry.toJSON())
})

module.exports = usersRouter
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Entry = require('../models/entry')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const entries = await Entry
    .find({}).populate('user', { username: 1, name: 1, fichaje: 1, company: 1 })

  response.json(entries)
})

router.get('/admin/:company', async (req, res) => {
  const entries = await Entry
    .find({ company: req.params.company }).populate('user', { username: 1, name: 1, fichaje: 1, company: 1 })

  res.json(entries)
})

router.get('/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then(entry => {
      if (entry) {
        response.json(entry.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const entry = await Entry.findById(request.params.id)
  if (entry.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete entries' })
  }

  await entry.remove()
  user.entries = user.entries.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const entry = request.body

  const updatedEntry = await Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
  response.json(updatedEntry.toJSON())
})

router.post('/', async (request, response) => {
  const entry = new Entry(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid or expired token' })
  }

  const user = await User.findById(decodedToken.id)

  /*if (!entry.entry) {
    return response.status(400).send({ error: 'entry field is empty!' })
  }*/

  if (!entry.likes) {
    entry.likes = 0
  }

  entry.user = user
  const savedEntry = await entry.save()

  user.entries = user.entries.concat(savedEntry._id)
  await user.save()

  response.status(201).json(savedEntry)
})

module.exports = router
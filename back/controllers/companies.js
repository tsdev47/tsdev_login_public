const companiesRouter = require('express').Router()
const Company = require('../models/company')

companiesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = new Company({
    name: body.name,
    legalName: body.legalName,
    nif: body.nif,
    code: body.code,
  })

  const savedCompany = await user.save()
  response.json(savedCompany)
})

companiesRouter.get('/', async (req, res) => {
  const companies = await Company.find({}, {code: 0} )
  res.json(companies.map(u => u.toJSON()))
})

companiesRouter.get('/:nif', async (req, res) => {
  const companies = await Company.find({}, { nif: req.params.nif, name: 1, legalName: 1 } )
  res.json(companies.map(u => u.toJSON()))
})


module.exports = companiesRouter
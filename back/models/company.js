const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
    // minlength: 3
  },
  legalName: {
    type: String,
    unique: true,
    required: true
    // minlength: 3
  },
  nif: {
    type: String,
    unique: true,
    required: true
    // minlength: 3
  },
  code: {
    type: String,
    unique: false,
    required: true
    // minlength: 3
  }
})

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
companySchema.plugin(uniqueValidator)


module.exports = mongoose.model('Company', companySchema)
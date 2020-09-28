const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
var ObjectId = require('mongodb').ObjectID;


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  nif: {
    type: String
  },
  fichaje: {
    type: Boolean
  },
  passwordHash: String,
  admin: {
    type: Boolean
  },
  company: {
    type: String
  },
  companyName: {
    type: String
  },
  companyNif: {
    type: String
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
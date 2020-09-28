const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const entrySchema = new mongoose.Schema({
  entry: {
    type: String,
  },
  username: {
    type: String,
    unique: false,
    required: true
  },
  name: {
    type: String,
    unique: false,
    required: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true
  },
  nif: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: false,
    required: true
  },
  company: {
    type: String,
    unique: false,
    required: true
  },
  fichaje: {
    type: Boolean,
    unique: false,
    required: true
  },
  time: {
    type : Date,
    default: Date.now
  },
  gpsLat: {
    type: String,
    unique: false,
    required: false
  },
  gpsLon: {
    type: String,
    unique: false,
    required: false
  },
  geolocation: {
    type: Object,
    unique: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
entrySchema.plugin(uniqueValidator)


module.exports = mongoose.model('Entry', entrySchema)
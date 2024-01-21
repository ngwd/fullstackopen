const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const schema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    minLength:4,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: true
  },
  passwordHash: String,
})

schema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
    delete returnObj.passwordHash
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('User', schema)
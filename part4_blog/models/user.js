const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
  userName: {
    type:String,
    required:true,
    minLength:4,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
    delete returnObj.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('user', userSchema)
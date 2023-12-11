const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  userName:String,
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

module.exports = mongoose.model('user', userSchema)
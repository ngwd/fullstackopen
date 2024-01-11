const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
    minLength:4,
  },
  author: {
    type:String,
    required:true,
    minLength:2,
  },
  url: {
    type:String,
    required:true,
    minLength:2,
  },
  likes: {
    type:Number,
    // required:false,
    default:0,
  },
  comments: {
    type: [String],
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})
blogSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)
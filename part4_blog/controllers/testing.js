const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const bcrypt = require('bcrypt')

testingRouter.post('/reset', async (req, res, next) => {
  try{
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjs = helper.blogs.map(blog=>new Blog(blog))
    const promiseArray = blogObjs.map(blog=>blog.save())

    const passwordHash = await bcrypt.hash('s3kr3t', 10)
    const passwordHash1 = await bcrypt.hash(helper.newUser.password, 10)
    const user = new User({userName: 'root', passwordHash})
    const p = user.save()

    const promiseArray2 = helper.users.map(user=>{
      const u = new User(user)
      u.passwordHash = passwordHash1 
      return u.save()
    })
    promiseArray.push(p);
    promiseArray.push(...promiseArray2);

    await Promise.all(promiseArray)
    res.status(200).end()
  }
  catch(exception) {
    next(exception)
  }
})
module.exports = testingRouter
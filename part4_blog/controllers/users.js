const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const {userName, name, password} = req.body
  const saltRounds = 10
  if (password.length < 4) {
    res.status(400).json({errorMessage: 'password length less than 4' })
    return
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    userName, 
    name,
    passwordHash
  })
  try{
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }
  catch(exception) {
    next(exception)
  } 
})
userRouter.get('/', async(req, res, next)=>{
  const users = await User.find({}).populate('blogs', {})
  res.json(users)
})
userRouter.get('/:id', async (req, res, next) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (user) {
      res.status(200).json(user)
    }
    else {
      res.status(404).end()
    }
  }
  catch (exception) {
    next(exception)
  }
})
module.exports = userRouter
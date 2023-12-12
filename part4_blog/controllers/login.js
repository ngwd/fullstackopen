const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const {userName, password} = req.body

  const user = await User.findOne({userName})

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'invalid user name or password'
    })
  }

  const userForToken = {
    userName: user.userName,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  console.log("Bearer ", token)
  res
    .status(200)
    .send({token, userName: user.userName, name: user.name})
})

module.exports = loginRouter
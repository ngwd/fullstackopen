const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, req, res, next)=>{
  console.log(error.message)
  if (error.name==='ValidationError') {
    return res.status(400).json({error: error.message})
  }
  else if (error.name==='JsonWebTokenError') {
    return res.status(401).json({error: error.message})
  }
  next(error)
}
const userExtractor = async (req, res, next) => {
  const auth = req.get('Authorization')
  if (!auth) {
    next() 
    return
  }

  let token = ''
  if (auth.startsWith('Bearer ')) {
    token = auth.replace('Bearer ', '')
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({
      error: 'token invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const id = user.id.toString()
  req['user'] = id 
  next()
}
const requestLogger = (req, res, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('---')
  next()
}

module.exports={
  userExtractor,
  requestLogger,
  errorHandler
}
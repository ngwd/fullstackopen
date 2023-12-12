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
const tokenExtractor = (req, res, next) => {
  const auth = req.get('Authorization')

  let token = ''
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.replace('Bearer ', '')
  }
  else {
    token = null
  }
  req['token'] = token
  next()
}

module.exports={
  tokenExtractor,
  errorHandler
}
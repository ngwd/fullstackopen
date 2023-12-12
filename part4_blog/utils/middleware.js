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

module.exports={
  errorHandler
}